import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { BookingHistory } from '@/components/profile/BookingHistory';
import { ProfileSettings } from '@/components/profile/ProfileSettings';
import { SecuritySettings } from '@/components/profile/SecuritySettings';
import { gasStations, user } from '../lib/api';
import { useState, useEffect } from 'react';
import { authStore } from '@/stores/authStore';
import { StationSlot } from '@/types/api';
import { toast } from 'sonner';

const UserProfile = () => {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const reservations = await user.getReservations();
        console.log(reservations);
        setBookingHistory(reservations);
      } catch (error) {
        console.error('Error fetching booking history:', error);
        toast.error('Failed to load booking history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  // Redirect if not authenticated
  if (!authStore.isAuthenticated || !authStore.userData) {
    navigate('/login', { state: { from: '/profile' } });
    return null;
  }

  const handleProfileUpdate = async (name: string, email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // TODO: Implement actual API call
  };

  const handlePasswordUpdate = async (
    currentPassword: string,
    newPassword: string
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // TODO: Implement actual API call
  };

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-6'>My Profile</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left sidebar */}
        <ProfileSidebar onLogout={() => authStore.logout()} />

        {/* Main content */}
        <div className='lg:col-span-2'>
          <Tabs defaultValue='bookings'>
            <TabsList className='grid w-full grid-cols-4 mb-6'>
              <TabsTrigger value='bookings'>Bookings</TabsTrigger>
              <TabsTrigger value='favorites'>Favorites</TabsTrigger>
              <TabsTrigger value='profile'>Profile</TabsTrigger>
              <TabsTrigger value='security'>Security</TabsTrigger>
            </TabsList>

            <TabsContent value='bookings' className='mt-0'>
              <BookingHistory bookings={bookingHistory} />
            </TabsContent>

            <TabsContent value='favorites' className='mt-0'>
              {/* TODO: Implement favorites component */}
              <div className='text-center py-8 text-gray-500'>
                Favorites feature coming soon...
              </div>
            </TabsContent>

            <TabsContent value='profile' className='mt-0'>
              <ProfileSettings
                initialName={authStore.username}
                initialEmail={authStore.user.email}
                onUpdate={handleProfileUpdate}
              />
            </TabsContent>

            <TabsContent value='security' className='mt-0'>
              <SecuritySettings onPasswordUpdate={handlePasswordUpdate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
