import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import EventModal from '@/components/EventModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { CalendarEvent, loadEvents, saveEvents, loadSettings } from '@/utils/localStorage';
import { toast } from '@/hooks/use-toast';
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);
  const [weekStart, setWeekStart] = useState<'sunday' | 'monday'>('monday');
  useEffect(() => {
    const savedEvents = loadEvents();
    setEvents(savedEvents);
    const settings = loadSettings();
    setWeekStart(settings.weekStart);
  }, []);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = weekStart === 'sunday' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDayOfWeek = firstDay.getDay();

    // Adjust for Monday start
    if (weekStart === 'monday') {
      startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    }
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };
  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-error/20 text-red-700 border-red-200';
      case 'deadline':
        return 'bg-orange-500/20 text-orange-700 border-orange-200';
      case 'task':
        return 'bg-accent/20 text-blue-700 border-blue-200';
      case 'reminder':
        return 'bg-purple-500/20 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-200';
    }
  };
  const handleCreateEvent = () => {
    setSelectedDate('');
    setIsEventModalOpen(true);
  };
  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id' | 'createdAt'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    toast({
      title: "Event created",
      description: "Your event has been added to the calendar"
    });
  };
  const handleDeleteEvent = (event: CalendarEvent) => {
    const updatedEvents = events.filter(e => e.id !== event.id);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setEventToDelete(null);
    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar"
    });
  };
  const days = getDaysInMonth(currentDate);
  return <Layout>
      <div className="space-y-6 animate-fade-in bg-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
          <div className="bg-white">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Calendar</h1>
            <p className=" text-[#6b7280]">Manage your schedule and important dates</p>
          </div>
          <Button onClick={handleCreateEvent} className="gap-2">
            <Plus className="w-4 h-4" />
            New Event
          </Button>
        </div>

        {/* Calendar Navigation */}
        <div className="card-bg rounded-lg p-6">
          <div className="flex items-center justify-between mb-6 bg-transparent">
            <h2 className="text-xl font-semibold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2 bg-transparent">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')} className="p-2 border-transparent">
                <ChevronLeft className="w-4 h-4 icon-primary" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} className="bg-[#fa812e] text-white border-[ebe8d9]">
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')} className="p-2 border-transparent">
                <ChevronRight className="w-4 h-4 icon-primary" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 bg-transparent">
            {/* Day Headers */}
            {dayNames.map(day => <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground bg-transparent">
                {day}
              </div>)}

            {/* Calendar Days */}
            {days.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentDay = isToday(date);
            return <div key={index} className={`min-h-[100px] p-2 border rounded-lg transition-all duration-200 hover:shadow-md ${date ? isCurrentDay ? 'today-highlight border-primary/30' : 'card-bg border-border hover:opacity-80' : 'bg-transparent'}`}>
                  {date && <div className="bg-transparent">
                      <div className={`text-sm font-medium mb-1 ${isCurrentDay ? 'text-white' : 'text-foreground'}`}>
                        {date.getDate()}
                      </div>
                      
                      <div className="space-y-1 bg-transparent">
                        {dayEvents.slice(0, 2).map(event => <div key={event.id} className={`text-xs p-1 rounded text-center truncate border cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)}`} title={`${event.title} - Click to delete`} onClick={() => setEventToDelete(event)}>
                            {event.title}
                          </div>)}
                        
                        {dayEvents.length > 2 && <div className="text-xs text-muted-foreground text-center bg-transparent">
                            +{dayEvents.length - 2} more
                          </div>}
                      </div>
                    </div>}
                </div>;
          })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white">
          <div className="space-y-4 bg-white">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
            <div className="card-bg rounded-lg p-4 space-y-3">
              {events.filter(event => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5).map(event => <div key={event.id} className="flex items-center justify-between p-3 rounded-md hover:bg-card/10 transition-colors bg-transparent">
                    <div className="flex items-center gap-3 bg-transparent">
                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      <div className="bg-transparent">
                        <div className="text-sm font-medium text-foreground">{event.title}</div>
                        {event.description && <div className="text-xs text-muted-foreground">{event.description}</div>}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground bg-transparent">
                      {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
                    </div>
                  </div>)}
            </div>
          </div>

          <div className="space-y-4 bg-white">
            <h2 className="text-lg font-semibold text-foreground">Event Types</h2>
            <div className="card-bg rounded-lg p-4 space-y-3">
              {[{
              type: 'exam',
              label: 'Exams',
              description: 'Tests and examinations'
            }, {
              type: 'deadline',
              label: 'Deadlines',
              description: 'Project and assignment due dates'
            }, {
              type: 'task',
              label: 'Tasks',
              description: 'Meetings and work tasks'
            }, {
              type: 'reminder',
              label: 'Reminders',
              description: 'Personal appointments and notes'
            }].map(item => <div key={item.type} className="flex items-center gap-3 p-2 rounded-md bg-transparent">
                  <div className={`w-4 h-4 rounded border ${getEventTypeColor(item.type)}`}></div>
                  <div className="bg-transparent">
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-xs  text-[#6b7280]">{item.description}</div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} onSave={handleSaveEvent} selectedDate={selectedDate} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!eventToDelete} onOpenChange={() => setEventToDelete(null)}>
        <DialogContent className="card-bg">
          <DialogHeader className="bg-transparent">
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-transparent">
            <Button variant="outline" onClick={() => setEventToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => eventToDelete && handleDeleteEvent(eventToDelete)} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>;
};
export default Calendar;