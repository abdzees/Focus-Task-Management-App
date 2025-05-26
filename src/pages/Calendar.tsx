
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'deadline' | 'task' | 'reminder';
  description?: string;
  time?: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Economics Final Exam', date: '2025-06-02', type: 'exam', time: '10:00 AM' },
    { id: '2', title: 'Project Deadline', date: '2025-06-05', type: 'deadline', time: '11:59 PM' },
    { id: '3', title: 'Team Meeting', date: '2025-05-29', type: 'task', time: '2:00 PM' },
    { id: '4', title: 'Doctor Appointment', date: '2025-05-30', type: 'reminder', time: '3:30 PM' },
    { id: '5', title: 'Study Group', date: '2025-06-01', type: 'task', time: '7:00 PM' },
    { id: '6', title: 'Math Quiz', date: '2025-05-28', type: 'exam', time: '9:00 AM' },
    { id: '7', title: 'Book Club Meeting', date: '2025-06-03', type: 'reminder', time: '6:00 PM' }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

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
      case 'exam': return 'bg-red-500/20 text-red-700 border-red-200';
      case 'deadline': return 'bg-coral-accent/20 text-orange-700 border-orange-200';
      case 'task': return 'bg-blue-500/20 text-blue-700 border-blue-200';
      case 'reminder': return 'bg-purple-500/20 text-purple-700 border-purple-200';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-200';
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and important dates</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Event
          </Button>
        </div>

        {/* Calendar Navigation */}
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="p-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="p-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {days.map((date, index) => {
              const dayEvents = getEventsForDate(date);
              const isCurrentDay = isToday(date);
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-lg transition-all duration-200 hover:shadow-md ${
                    date 
                      ? isCurrentDay 
                        ? 'bg-primary/10 border-primary/30' 
                        : 'bg-white/50 border-gray-200 hover:bg-white/70'
                      : 'bg-transparent'
                  }`}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        isCurrentDay ? 'text-primary' : 'text-foreground'
                      }`}>
                        {date.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-center truncate border ${getEventTypeColor(event.type)}`}
                            title={`${event.title} ${event.time ? `at ${event.time}` : ''}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
            <div className="glass-card rounded-lg p-4 space-y-3">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-md hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      <div>
                        <div className="text-sm font-medium text-foreground">{event.title}</div>
                        {event.time && (
                          <div className="text-xs text-muted-foreground">{event.time}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Event Types Legend */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Event Types</h2>
            <div className="glass-card rounded-lg p-4 space-y-3">
              {[
                { type: 'exam', label: 'Exams', description: 'Tests and examinations' },
                { type: 'deadline', label: 'Deadlines', description: 'Project and assignment due dates' },
                { type: 'task', label: 'Tasks', description: 'Meetings and work tasks' },
                { type: 'reminder', label: 'Reminders', description: 'Personal appointments and notes' }
              ].map(item => (
                <div key={item.type} className="flex items-center gap-3 p-2 rounded-md">
                  <div className={`w-4 h-4 rounded border ${getEventTypeColor(item.type)}`}></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
