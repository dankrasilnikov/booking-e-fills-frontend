import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { QrCode } from 'lucide-react';
import { useMemo } from 'react';
import QRCode from 'react-qr-code';

interface IQRProps {
  uuid: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const QRModal = ({ uuid, open, setOpen }: IQRProps) => {
  const encodedUUID = useMemo(() => btoa(uuid), [uuid]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <QrCode className='h-5 w-5' /> Reservation QR
          </DialogTitle>
          <DialogDescription>
            Present this code at the kiosk to verify your booking.
          </DialogDescription>
        </DialogHeader>

        <Card className='shadow-none border-none'>
          <CardContent className='flex justify-center'>
            <QRCode
              value={encodedUUID}
              size={180}
              className='bg-white p-2 rounded-lg shadow-md'
            />
          </CardContent>
          <CardFooter className='flex justify-end pt-0'>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
