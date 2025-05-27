import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { Button } from '@/components/ui/button';
import { Plus, Calendar as CalendarIcon, CheckCircle, Clock } from 'lucide-react';
import { loadTasks, saveTasks, loadEvents, Task, CalendarEvent } from '@/utils/localStorage';
import { toast } from '@/hooks/use-toast';
const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  useEffect(() => {
    setTasks(loadTasks());
    setEvents(loadEvents());
  }, []);
  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => task.id === id ? {
      ...task,
      completed: !task.completed
    } : task);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    const task = updatedTasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task completed!" : "Task reopened",
        description: task.title
      });
    }
  };
  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast({
      title: "Task created!",
      description: newTask.title
    });
  };
  const completedToday = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed);
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  return <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}!
          </h1>
          <p className="text-muted-foreground">
            Let's make today productive and meaningful
          </p>
        </div>

        {/* Enhanced Stats Overview with improved spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12 py-6">
          <div className="dashboard-card text-center">
            <CheckCircle className="w-10 h-10 text-coral-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-foreground mb-2">{completedToday}/{totalTasks}</div>
            <div className="text-sm text-muted-foreground">Tasks completed today</div>
          </div>
          
          <div className="dashboard-card text-center">
            <Clock className="w-10 h-10 text-coral-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-foreground mb-2">{activeTasks.length}</div>
            <div className="text-sm text-muted-foreground">Active tasks</div>
          </div>
          
          <div className="dashboard-card text-center">
            <CalendarIcon className="w-10 h-10 text-coral-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-foreground mb-2">{upcomingEvents.length}</div>
            <div className="text-sm text-muted-foreground">Upcoming events</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Today's Tasks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Today's Focus</h2>
              <Button size="sm" className="gap-2" onClick={() => setIsTaskModalOpen(true)}>
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </div>
            
            <div className="space-y-3">
              {activeTasks.slice(0, 4).map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} />)}
              
              {activeTasks.length === 0 && <div className="glass-card rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No tasks for today. Add one to get started!</p>
                  <Button onClick={() => setIsTaskModalOpen(true)} className="mt-4 bg-[#fc812a] text-white border border-transparent hover:bg-transparent hover:border-[#ebe8d9] transition-colors duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Task
                  </Button>
                </div>}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-4">
            <div className="flex items-center justify-between ">
              <h2 className="text-xl font-semibold text-foreground">Upcoming Events</h2>
              <Button size="sm" onClick={() => {
              handleCreateEvent;
            }} className="gap-2 hidden">
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            </div>
            <div className="glass-card rounded-lg p-4 space-y-3">
              {upcomingEvents.length > 0 ? upcomingEvents.map(event => <div key={event.id} className="flex items-center justify-between p-3 rounded-mdS">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${event.type === 'exam' ? 'bg-red-500' : event.type === 'deadline' ? 'bg-coral-accent' : 'bg-blue-500'}`}></div>
                      <span className="text-sm font-medium text-foreground">{event.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatEventDate(event.date)}</span>
                  </div>) : <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming events</p>
                </div>}
            </div>
          </div>
        </div>
      </div>

      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onSave={handleCreateTask} />
    </Layout>;
};
export default Dashboard;