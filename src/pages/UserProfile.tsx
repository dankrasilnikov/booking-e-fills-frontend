import {useNavigate} from 'react-router-dom';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import {BookingHistory} from '@/components/profile/BookingHistory';
import {ProfileSettings} from '@/components/profile/ProfileSettings';
import {SecuritySettings} from '@/components/profile/SecuritySettings';
import {user} from '../lib/api';
import {useEffect, useState} from 'react';
import {authStore} from '@/stores/authStore';
import {toast} from 'sonner';

const UserProfile = () => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [totalBookings, setTotalBookings] = useState(0);

    useEffect(() => {
        setTotalBookings(bookingHistory.length)
    }, [bookingHistory]);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const reservations = await user.getReservations();
                setBookingHistory(reservations);
            } catch (error) {
                console.error('Error fetching booking history:', error);
                toast.error('Failed to load booking history');
            }
        };

        fetchBookingHistory();
    }, []);

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
                <ProfileSidebar onLogout={() => authStore.logout()} totalBookings={totalBookings}/>

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
                            <BookingHistory bookings={bookingHistory} setBookings={setBookingHistory}/>
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
                            <SecuritySettings onPasswordUpdate={handlePasswordUpdate}/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
