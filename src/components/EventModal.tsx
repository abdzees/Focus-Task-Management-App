
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { CalendarEvent } from '@/utils/localStorage';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id' | 'createdAt'>) => void;
  selectedDate?: string;
}

const EventModal = ({ isOpen, onClose, onSave, selectedDate }: EventModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'exam' | 'deadline' | 'task' | 'reminder'>('task');
  const [date, setDate] = useState(selectedDate || '');

  const handleSave = () => {
    if (!title.trim() || !date) return;

    const eventData: Omit<CalendarEvent, 'id' | 'createdAt'> = {
      title: title.trim(),
      date,
      type,
      description: description.trim() || undefined,
    };

    onSave(eventData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setType('task');
    setDate(selectedDate || '');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-[#fffbea] border border-[#e5e7eb]">
        <DialogHeader className="bg-transparent">
          <DialogTitle className="text-[#2e2e2e]">Create New Event</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 bg-transparent">
          <div className="bg-transparent">
            <Label htmlFor="title" className="text-[#2e2e2e]">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title..."
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
              <Label htmlFor="type" className="text-[#2e2e2e]">Type</Label>
              <Select value={type} onValueChange={(value: any) => setType(value)}>
                <SelectTrigger className="mt-1 bg-white border-[#e5e7eb]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-transparent">
              <Label htmlFor="date" className="text-[#2e2e2e]">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 bg-white border-[#e5e7eb] text-[#2e2e2e]"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="bg-transparent">
          <Button variant="outline" onClick={handleClose} className="border-[#e5e7eb] text-[#2e2e2e] hover:bg-[#f3f4f6]">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim() || !date} className="bg-[#f97316] hover:bg-[#ea580c] text-white">
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
