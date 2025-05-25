import { useState, useMemo } from 'react';
import { X, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import QRCode from 'react-qr-code';
import { user } from '@/lib/api';
import { QRModal } from './QRModal';

interface ReservationProps {
  duration: string;
  seqNum: number;
  start: number;
  title: string;
  uuid: string;
  onCancel: () => void;
}

export const Reservation = ({
  duration,
  seqNum,
  start,
  title,
  uuid,
  onCancel,
}: ReservationProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  /**
   * Very lightweight "cipher" – base‑64‑encode the UUID so it's not plain text.
   * Swap with real crypto (e.g. AES) if you need true confidentiality.
   */

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
      await user.cancelReservation(uuid);
      toast({
        title: 'Reservation cancelled',
        description: 'Your reservation has been successfully cancelled.',
        variant: 'default',
      });
      onCancel();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel reservation. Please try again.',
        variant: 'destructive',
      });
    }
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
              onClick={cancelReservation}
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
