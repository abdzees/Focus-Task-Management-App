
import { useState } from 'react';
import { Target, Calendar as CalendarIcon, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Goal {
  id: string;
  title: string;
  description?: string;
  progress: number;
  targetDate?: string;
  type: 'short-term' | 'long-term';
  milestones?: string[];
}

interface GoalCardProps {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
}

const GoalCard = ({ goal, onEdit }: GoalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success-green';
    if (progress >= 50) return 'bg-coral-accent';
    return 'bg-gentle-gray';
  };

  return (
    <div
      className="glass-card rounded-lg p-6 transition-all duration-200 hover-lift cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEdit && onEdit(goal)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            goal.type === 'long-term' 
              ? 'bg-violet-100 text-violet-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {goal.type}
          </span>
        </div>
        {goal.targetDate && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-xs">{formatDate(goal.targetDate)}</span>
          </div>
        )}
      </div>

      <h3 className="font-semibold text-foreground mb-2 leading-relaxed">
        {goal.title}
      </h3>
      
      {goal.description && (
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {goal.description}
        </p>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-success-green" />
            <span className="text-sm font-semibold text-foreground">{goal.progress}%</span>
          </div>
        </div>
        
        <Progress 
          value={goal.progress} 
          className="h-2"
        />

        {goal.milestones && goal.milestones.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Recent Milestones</h4>
            <div className="space-y-1">
              {goal.milestones.slice(0, 2).map((milestone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-success-green"></div>
                  <span className="text-xs text-muted-foreground">{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCard;
