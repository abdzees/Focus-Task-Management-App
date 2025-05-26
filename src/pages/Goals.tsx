
import { useState } from 'react';
import Layout from '@/components/Layout';
import GoalCard from '@/components/GoalCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Target, TrendingUp } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description?: string;
  progress: number;
  targetDate?: string;
  type: 'short-term' | 'long-term';
  milestones?: string[];
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Data Science Course',
      description: 'Finish all modules and final project by summer',
      progress: 65,
      targetDate: '2025-07-15',
      type: 'long-term',
      milestones: ['Completed Python module', 'Finished statistics section', 'Started machine learning basics']
    },
    {
      id: '2',
      title: 'Read 12 books this year',
      description: 'One book per month to expand knowledge and perspectives',
      progress: 33,
      targetDate: '2025-12-31',
      type: 'long-term',
      milestones: ['Finished "Atomic Habits"', 'Started "Deep Work"', 'Completed "The 7 Habits"', 'Reading "Thinking, Fast and Slow"']
    },
    {
      id: '3',
      title: 'Learn Spanish basics',
      description: 'Be able to hold basic conversations',
      progress: 80,
      targetDate: '2025-08-01',
      type: 'short-term',
      milestones: ['Completed basic vocabulary', 'Learned present tense', 'Started conversation practice']
    },
    {
      id: '4',
      title: 'Run a 10K race',
      description: 'Train consistently and participate in local 10K event',
      progress: 45,
      targetDate: '2025-09-15',
      type: 'short-term',
      milestones: ['Started running routine', 'Can run 5K without stopping', 'Building endurance']
    },
    {
      id: '5',
      title: 'Save $10,000 for emergency fund',
      description: 'Build financial security with emergency savings',
      progress: 72,
      targetDate: '2025-12-31',
      type: 'long-term',
      milestones: ['Saved first $1,000', 'Reached $5,000 milestone', 'Currently at $7,200']
    },
    {
      id: '6',
      title: 'Master cooking 10 new recipes',
      description: 'Expand culinary skills with diverse cuisines',
      progress: 90,
      targetDate: '2025-06-30',
      type: 'short-term',
      milestones: ['Mastered pasta dishes', 'Learned Thai cooking', 'Perfected bread baking', 'Almost finished with Indian cuisine']
    }
  ]);

  const shortTermGoals = goals.filter(goal => goal.type === 'short-term');
  const longTermGoals = goals.filter(goal => goal.type === 'long-term');

  const getOverallProgress = (goalsList: Goal[]) => {
    if (goalsList.length === 0) return 0;
    const totalProgress = goalsList.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / goalsList.length);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Goals</h1>
            <p className="text-muted-foreground">Track your progress and achieve your aspirations</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Goal
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-lg p-6 text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{goals.length}</div>
            <div className="text-sm text-muted-foreground">Total Goals</div>
          </div>
          
          <div className="glass-card rounded-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 text-success-green mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{getOverallProgress(goals)}%</div>
            <div className="text-sm text-muted-foreground">Average Progress</div>
          </div>
          
          <div className="glass-card rounded-lg p-6 text-center">
            <div className="w-8 h-8 bg-coral-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-coral-accent font-bold">🎯</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {goals.filter(goal => goal.progress >= 80).length}
            </div>
            <div className="text-sm text-muted-foreground">Nearly Complete</div>
          </div>
        </div>

        {/* Goals Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="all">All Goals</TabsTrigger>
            <TabsTrigger value="short-term">Short-term</TabsTrigger>
            <TabsTrigger value="long-term">Long-term</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {goals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No goals yet</h3>
                <p className="text-muted-foreground mb-4">
                  Set your first goal to start tracking your progress
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Goal
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="short-term" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Short-term Goals ({shortTermGoals.length})
              </h2>
              <div className="text-sm text-muted-foreground">
                Average Progress: {getOverallProgress(shortTermGoals)}%
              </div>
            </div>
            
            {shortTermGoals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortTermGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No short-term goals yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="long-term" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Long-term Goals ({longTermGoals.length})
              </h2>
              <div className="text-sm text-muted-foreground">
                Average Progress: {getOverallProgress(longTermGoals)}%
              </div>
            </div>
            
            {longTermGoals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {longTermGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No long-term goals yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Goals;
