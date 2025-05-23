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

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [qrUploaded, setQrUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get booking details from location state
  const { station, date, time } = location.state || {
    station: null,
    date: '',
    time: '',
  };

  // Generate a random booking ID
  const bookingId = `EF-${Math.floor(100000 + Math.random() * 900000)}`;

  if (!station) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h1 className='text-2xl font-bold mb-4'>
          No Booking Information Found
        </h1>
        <p className='mb-6'>
          It seems you arrived here without making a reservation.
        </p>
        <Button onClick={() => navigate('/map')}>Find Charging Stations</Button>
      </div>
    );
  }

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);

      // Simulate processing delay
      setTimeout(() => {
        setQrUploaded(true);
        setIsLoading(false);
        toast({
          title: 'QR Code Uploaded',
          description:
            'Your QR code has been successfully uploaded and verified.',
        });
      }, 1500);
    }
  };

  const handleComplete = () => {
    toast({
      title: 'Booking Completed',
      description:
        'Your charging station is ready for use. Thank you for using Zephyra!',
      variant: 'default',
    });
    navigate('/');
  };

  return (
    <div className='container mx-auto max-w-lg px-4 py-12'>
      <Card className='shadow-lg'>
        <CardHeader className='text-center'>
          <div className='mx-auto bg-e-light-green rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4'>
            <Check className='text-e-green' size={32} />
          </div>
          <CardTitle className='text-2xl font-bold'>
            Booking Confirmed!
          </CardTitle>
          <CardDescription>
            Your charging station has been successfully reserved
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='text-center'>
            <div className='text-sm text-gray-500'>Booking ID</div>
            <div className='text-xl font-bold'>{bookingId}</div>
          </div>

          <div className='border-t border-gray-200 pt-4'>
            <h3 className='font-semibold mb-3'>Reservation Details</h3>
            <div className='space-y-3'>
              <div className='flex items-start'>
                <MapPin className='text-e-blue mr-2 mt-0.5' size={18} />
                <div>
                  <div className='font-medium'>{station.name}</div>
                  <div className='text-sm text-gray-600'>{station.address}</div>
                </div>
              </div>

              <div className='flex items-center'>
                <Calendar className='text-e-blue mr-2' size={18} />
                <div>
                  <span className='font-medium'>{date}</span> at{' '}
                  <span className='font-medium'>{time}</span>
                </div>
              </div>

              <div className='bg-gray-50 rounded-md p-4'>
                <h4 className='font-medium mb-2'>Station Information</h4>
                <div className='grid grid-cols-2 gap-y-2 text-sm'>
                  <div>Charger Type:</div>
                  <div>{station.type}</div>
                  <div>Price:</div>
                  <div>{station.pricePerKwh} per kWh</div>
                  <div>Connectors:</div>
                  <div>{station.connectors.join(', ')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-200 pt-4'>
            <h3 className='font-semibold mb-3'>Upload QR Code</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Please upload your personal QR code for authentication at the
              charging station.
            </p>

            {qrUploaded ? (
              <div className='bg-e-light-green text-e-green rounded-md p-4 flex items-center'>
                <Check size={20} className='mr-2' />
                <span>QR Code successfully uploaded and verified</span>
              </div>
            ) : (
              <div className='text-center'>
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  ref={fileInputRef}
                  onChange={handleQrUpload}
                />
                <Button
                  variant='outline'
                  className='w-full mb-2'
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <QrCode className='mr-2 h-4 w-4' />
                  {isLoading ? 'Processing...' : 'Upload QR Code'}
                </Button>
                <div className='text-xs text-gray-500'>
                  Supported formats: JPG, PNG
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleComplete}
            className='w-full'
            disabled={!qrUploaded}
          >
            Complete Booking
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
