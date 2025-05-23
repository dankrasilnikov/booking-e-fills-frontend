import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { user } from '@/lib/api';

interface ReservationProps {
  duration: string;
  seqNum: number;
  start: number;
  title: string;
  id: number;
  onCancel: () => void;
}

export const Reservation = ({
  duration,
  seqNum,
  start,
  title,
  id,
  onCancel,
}: ReservationProps) => {
  const { toast } = useToast();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const formatDuration = (duration: string) => {
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    return `${hours} hour${hours !== '1' ? 's' : ''}`;
  };

  const cancelReservation = async () => {
    try {
      await user.cancelReservation(id);
      toast({
        title: "Reservation cancelled",
        description: "Your reservation has been successfully cancelled.",
        variant: "default",
      });
      onCancel();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel reservation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className='border rounded-md p-4'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold'>{title}</h3>
        <div className='flex items-center gap-2'>
          <span className='text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800'>
            Booking #{id}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
            onClick={cancelReservation}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className='text-sm text-gray-500'>
        <div>Start Time: {formatDate(start)}</div>
        <div>Duration: {formatDuration(duration)}</div>
      </div>
    </div>
  );
}; 