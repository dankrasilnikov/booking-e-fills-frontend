import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Booking {
  id: string
  stationName: string
  date: string
  time: string
  status: 'Completed' | 'Cancelled'
}

interface BookingHistoryProps {
  bookings: Booking[]
}

export const BookingHistory = ({ bookings }: BookingHistoryProps) => {
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
              <div key={booking.id} className='border rounded-md p-4'>
                <div className='flex justify-between items-center mb-2'>
                  <h3 className='font-semibold'>{booking.stationName}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className='text-sm text-gray-500'>
                  <div>Booking ID: {booking.id}</div>
                  <div>
                    Date: {booking.date} at {booking.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>No booking history available.</p>
        )}
      </CardContent>
    </Card>
  )
}
