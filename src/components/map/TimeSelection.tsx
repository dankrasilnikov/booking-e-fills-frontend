import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TimeSelectionProps {
  onTimeSelect: (time: string, duration: number) => void;
}

export const TimeSelection = ({ onTimeSelect }: TimeSelectionProps) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('60'); // Default 1 hour

  const handleSubmit = () => {
    if (selectedTime) {
      onTimeSelect(selectedTime, parseInt(selectedDuration));
    }
  };

  return (
    <div className='space-y-4 p-4 bg-white rounded-lg shadow'>
      <h2 className='text-xl font-semibold'>Select Charging Time</h2>

      <div className='space-y-2'>
        <Label htmlFor='time'>Time</Label>
        <Input
          id='time'
          type='datetime-local'
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='duration'>Duration (minutes)</Label>
        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
          <SelectTrigger>
            <SelectValue placeholder='Select duration' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='30'>30 minutes</SelectItem>
            <SelectItem value='60'>1 hour</SelectItem>
            <SelectItem value='90'>1.5 hours</SelectItem>
            <SelectItem value='120'>2 hours</SelectItem>
            <SelectItem value='180'>3 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className='w-full'
        onClick={handleSubmit}
        disabled={!selectedTime}
      >
        Find Available Stations
      </Button>
    </div>
  );
};
