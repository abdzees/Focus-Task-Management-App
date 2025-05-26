
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TaskCard from '@/components/TaskCard';
import GoalCard from '@/components/GoalCard';
import { Button } from '@/components/ui/button';
import { Plus, Calendar as CalendarIcon, CheckCircle, Target } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
}

interface Goal {
  id: string;
  title: string;
  description?: string;
  progress: number;
  targetDate?: string;
  type: 'short-term' | 'long-term';
  milestones?: string[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'deadline' | 'task' | 'reminder';
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review chapter 5 for Economics exam',
      description: 'Focus on supply and demand curves',
      completed: false,
      priority: 'high',
      dueDate: '2025-05-28',
      tags: ['study', 'economics']
    },
    {
      id: '2',
      title: 'Submit project proposal',
      completed: false,
      priority: 'medium',
      dueDate: '2025-05-30',
      tags: ['work']
    },
    {
      id: '3',
      title: 'Morning workout',
      completed: true,
      priority: 'low',
      tags: ['health']
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Data Science Course',
      description: 'Finish all modules and final project',
      progress: 65,
      targetDate: '2025-07-15',
      type: 'long-term',
      milestones: ['Completed Python module', 'Finished statistics section']
    },
    {
      id: '2',
      title: 'Read 12 books this year',
      progress: 33,
      targetDate: '2025-12-31',
      type: 'long-term',
      milestones: ['Finished "Atomic Habits"', 'Started "Deep Work"']
    }
  ]);

  const [upcomingEvents] = useState<Event[]>([
    { id: '1', title: 'Economics Final Exam', date: '2025-06-02', type: 'exam' },
    { id: '2', title: 'Project Deadline', date: '2025-06-05', type: 'deadline' },
    { id: '3', title: 'Team Meeting', date: '2025-05-29', type: 'task' }
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedToday = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

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

  return (
    <Layout>
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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-lg p-6 text-center">
            <CheckCircle className="w-8 h-8 text-success-green mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{completedToday}/{totalTasks}</div>
            <div className="text-sm text-muted-foreground">Tasks completed today</div>
          </div>
          
          <div className="glass-card rounded-lg p-6 text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{goals.length}</div>
            <div className="text-sm text-muted-foreground">Active goals</div>
          </div>
          
          <div className="glass-card rounded-lg p-6 text-center">
            <CalendarIcon className="w-8 h-8 text-coral-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{upcomingEvents.length}</div>
            <div className="text-sm text-muted-foreground">Upcoming events</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Tasks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Today's Focus</h2>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </div>
            
            <div className="space-y-3">
              {tasks.slice(0, 4).map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleTask} 
                />
              ))}
              
              {tasks.length === 0 && (
                <div className="glass-card rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No tasks for today. Add one to get started!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Active Goals */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Active Goals</h2>
              <div className="space-y-3">
                {goals.slice(0, 2).map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Upcoming Events</h2>
              <div className="glass-card rounded-lg p-4 space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-md hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        event.type === 'exam' ? 'bg-red-500' :
                        event.type === 'deadline' ? 'bg-coral-accent' :
                        'bg-blue-500'
                      }`}></div>
                      <span className="text-sm font-medium text-foreground">{event.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatEventDate(event.date)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
