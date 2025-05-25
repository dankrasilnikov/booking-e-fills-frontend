import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Reservation } from './Reservation';
import { useToast } from '@/components/ui/use-toast';
import { user } from '@/lib/api.ts';

interface Booking {
    duration: string;
    seqNum: number;
    start: number;
    title: string;
    uuid: string;
}

interface BookingHistoryProps {
    bookings: Booking[];
    setBookings: (bookings: Booking[]) => void;
}

export const BookingHistory = ({
                                   bookings,
                                   setBookings,
                               }: BookingHistoryProps) => {
    const { toast } = useToast();

    const handleCancelReservation = async (uuid: string) => {
        try {
            await user.cancelReservation(uuid);

            const updated = bookings.filter((b) => b.uuid !== uuid);
            setBookings(updated);
            toast({
                title: 'Reservation cancelled',
                description: 'Your reservation has been successfully cancelled.',
                variant: 'default',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to cancel reservation. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bookings</CardTitle>
                <CardDescription>
                    View your upcoming charging station reservations
                </CardDescription>
            </CardHeader>
            <CardContent>
                {bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <Reservation
                                onCancel={handleCancelReservation}
                                key={booking.uuid}
                                {...booking}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No booking history available.</p>
                )}
            </CardContent>
        </Card>
    );
};
