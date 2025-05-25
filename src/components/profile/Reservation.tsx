import { useState } from 'react';
import { QrCode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { QRModal } from './QRModal';

interface ReservationProps {
  duration: string;
  seqNum: number;
  start: number;
  title: string;
  uuid: string;
  onCancel: (uuid: string) => void;
}

export const Reservation: React.FC<ReservationProps> = ({
  duration,
  seqNum,
  start,
  title,
  uuid,
  onCancel,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const formatDuration = (isoDuration: string) => {
    // Parse ISO 8601 duration, capturing hours and minutes
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = match && match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match && match[2] ? parseInt(match[2], 10) : 0;

    const parts: string[] = [];
    if (hours > 0) {
      parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    }

    return parts.length > 0 ? parts.join(' ') : '0 minutes';
  };

  return (
    <>
      <div className='border rounded-md p-4'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='font-semibold'>{title}</h3>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100'
              onClick={() => onCancel(uuid)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <div className='text-sm text-gray-500 space-y-1'>
          <div>Start Time: {formatDate(start)}</div>
          <div>Duration: {formatDuration(duration)}</div>
        </div>

        {/* Actions */}
        <div className='flex gap-2 mt-4'>
          <Button
            variant='outline'
            className='flex items-center gap-2'
            onClick={() => setOpen(true)}
          >
            <QrCode className='h-4 w-4' />
            Show QR
          </Button>
        </div>
      </div>

      <QRModal uuid={uuid} open={open} setOpen={setOpen} />
    </>
  );
};
