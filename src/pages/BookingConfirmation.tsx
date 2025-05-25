import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { QrCode, Calendar, MapPin, Check } from 'lucide-react';
import { QRModal } from '@/components/profile/QRModal';

// State types for clarity
type Reservation = {
  title: string;
  seqNum: number;
  start: number;         // Unix timestamp in seconds
  duration: string;      // ISO 8601 duration, e.g. "PT30M"
  uuid: string;
};

type Station = {
  title: string;
  type: string;
  connectors: string[];
};

interface LocationState {
  station: Station;
  reservation: Reservation;
}

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [qrUploaded, setQrUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Pull station and reservation out of navigation state
  const { station, reservation } = (location.state as LocationState) || {};

  // If required data is missing, send the user back
  if (!station || !reservation) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No Booking Information Found</h1>
        <p className="mb-6">It seems you arrived here without making a reservation.</p>
        <Button onClick={() => navigate('/map')}>Find Charging Stations</Button>
      </div>
    );
  }

  // Convert Unix timestamp to human-readable date and time
  const startDate = new Date(reservation.start * 1000);
  const dateStr = startDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = startDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Format ISO duration (PT30M) -> "30m"
  const durationStr = reservation.duration.replace(/^PT/, '').toLowerCase();

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);
      setTimeout(() => {
        setQrUploaded(true);
        setIsLoading(false);
        toast({
          title: 'QR Code Uploaded',
          description: 'Your QR code has been successfully uploaded and verified.',
        });
      }, 1500);
    }
  };

  const handleComplete = () => {
    toast({
      title: 'Booking Completed',
      description: 'Your charging station is ready for use. Thank you for using Zephyra!',
      variant: 'default',
    });
    navigate('/profile');
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-12">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-e-light-green rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <Check className="text-e-green" size={32} />
          </div>
          <CardTitle className="text-2xl font-bold">Booking Confirmed!</CardTitle>
          <CardDescription>Your charging station has been successfully reserved</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-500">Booking ID</div>
            <div className="text-xl font-bold">{reservation.uuid}</div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-3">Reservation Details</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="text-e-blue mr-2 mt-0.5" size={18} />
                <div>
                  <div className="font-medium">{station.title}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="text-e-blue mr-2" size={18} />
                <div>
                  <span className="font-medium">{dateStr}</span> at{' '}
                  <span className="font-medium">{timeStr}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                Duration: <span className="font-medium">{durationStr}</span>
              </div>

              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="font-medium mb-2">Station Information</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>Connectors:</div>
                  <div>{reservation.seqNum}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-3">Scan QR Code</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please scan your personal QR code for authentication at the charging station.
            </p>

            {qrUploaded ? (
              <div className="bg-e-light-green text-e-green rounded-md p-4 flex items-center">
                <Check size={20} className="mr-2" />
                <span>QR Code successfully uploaded and verified</span>
              </div>
            ) : (
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleQrUpload}
                />
                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() => setOpen(true)}
                  disabled={isLoading}
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  {isLoading ? 'Processing...' : 'Show QR Code'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={handleComplete} className="w-full">
            Complete Booking
          </Button>
        </CardFooter>
      </Card>

      <QRModal uuid={reservation.uuid} open={open} setOpen={setOpen}/>
    </div>
  );
};

export default BookingConfirmation;