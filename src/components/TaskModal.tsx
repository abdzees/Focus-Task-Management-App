
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Task } from '@/utils/localStorage';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  task?: Task;
}

const TaskModal = ({ isOpen, onClose, onSave, task }: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [tags, setTags] = useState(task?.tags?.join(', ') || '');

  const handleSave = () => {
    if (!title.trim()) return;

    const taskData: Omit<Task, 'id' | 'createdAt'> = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed: task?.completed || false,
      priority,
      dueDate: dueDate || undefined,
      tags: tags.trim() ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : undefined,
    };

    onSave(taskData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTags('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-[#fffbea] border border-[#e5e7eb]">
        <DialogHeader className="bg-transparent">
          <DialogTitle className="text-[#2e2e2e]">{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 bg-transparent">
          <div className="bg-transparent">
            <Label htmlFor="title" className="text-[#2e2e2e]">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="mt-1 bg-white border-[#e5e7eb] text-[#2e2e2e]"
            />
          </div>

          <div className="bg-transparent">
            <Label htmlFor="description" className="text-[#2e2e2e]">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              className="mt-1 bg-white border-[#e5e7eb] text-[#2e2e2e]"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 bg-transparent">
            <div className="bg-transparent">
              <Label htmlFor="priority" className="text-[#2e2e2e]">Priority</Label>
              <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                <SelectTrigger className="mt-1 bg-white border-[#e5e7eb]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-transparent">
              <Label htmlFor="dueDate" className="text-[#2e2e2e]">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 bg-white border-[#e5e7eb] text-[#2e2e2e]"
              />
            </div>
          </div>

          <div className="bg-transparent">
            <Label htmlFor="tags" className="text-[#2e2e2e]">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="work, study, personal (comma separated)"
              className="mt-1 bg-white border-[#e5e7eb] text-[#2e2e2e]"
            />
          </div>
        </div>

        <DialogFooter className="bg-transparent">
          <Button variant="outline" onClick={handleClose} className="border-[#e5e7eb] text-[#2e2e2e] hover:bg-[#f3f4f6]">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()} className="bg-[#f97316] hover:bg-[#ea580c] text-white">
            {task ? 'Update' : 'Create'} Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
