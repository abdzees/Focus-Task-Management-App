
import { useState } from 'react';
import { CheckSquare, Square, Calendar as CalendarIcon, Flag, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit?: (task: Task) => void;
}

const TaskCard = ({ task, onToggle, onEdit }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-amber-600',
    high: 'text-red-600',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div
      className={`glass-card rounded-lg p-4 transition-all duration-200 hover-lift cursor-pointer ${
        task.completed ? 'opacity-70' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEdit && onEdit(task)}
    >
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task.id);
          }}
          className={`p-1 rounded-md ${
            task.completed 
              ? 'text-success-green hover:text-success-green' 
              : 'text-gentle-gray hover:text-primary'
          }`}
        >
          {task.completed ? (
            <CheckSquare className="w-5 h-5" />
          ) : (
            <Square className="w-5 h-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 
              className={`font-medium text-sm leading-relaxed ${
                task.completed 
                  ? 'line-through text-muted-foreground' 
                  : 'text-foreground'
              }`}
            >
              {task.title}
            </h3>
            
            {isHovered && onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-1 ml-2 opacity-70 hover:opacity-100"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2">
            {task.priority !== 'low' && (
              <div className="flex items-center gap-1">
                <Flag className={`w-3 h-3 ${priorityColors[task.priority]}`} />
                <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
              </div>
            )}

            {task.dueDate && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <CalendarIcon className="w-3 h-3" />
                <span className="text-xs">{formatDate(task.dueDate)}</span>
              </div>
            )}

            {task.tags && task.tags.length > 0 && (
              <div className="flex gap-1">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
