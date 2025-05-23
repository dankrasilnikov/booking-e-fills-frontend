import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Reservation } from './Reservation';
import { useState } from 'react';

interface Booking {
  duration: string;
  seqNum: number;
  start: number;
  title: string;
  id: number;
}

interface BookingHistoryProps {
  bookings: Booking[];
  onRefresh: () => Promise<void>;
}

export const BookingHistory = ({ bookings, onRefresh }: BookingHistoryProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCancel = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking History</CardTitle>
        <CardDescription>
          View your past and upcoming charging station reservations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <div className='space-y-4'>
            {bookings.map((booking) => (
              <Reservation
                key={booking.seqNum}
                {...booking}
                onCancel={handleCancel}
              />
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>No booking history available.</p>
        )}
      </CardContent>
    </Card>
  );
};
