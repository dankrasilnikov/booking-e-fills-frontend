import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { BookingHistory } from '@/components/profile/BookingHistory';
import { ProfileSettings } from '@/components/profile/ProfileSettings';
import { SecuritySettings } from '@/components/profile/SecuritySettings';
import { user } from '../lib/api';
import { authStore } from '@/stores/authStore';
import { toast } from 'sonner';

const UserProfile: React.FC = () => {
    const [bookingHistory, setBookingHistory] = useState<any[]>([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTotalBookings(bookingHistory.length);
    }, [bookingHistory]);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const reservations = await user.getReservations();
                setBookingHistory(reservations);
            } catch (error) {
                console.error('Error fetching booking history:', error);
                toast.error('Failed to load booking history');
            } finally {
                setIsLoaded(true);
            }
        };

        fetchBookingHistory();
    }, []);

    const handleProfileUpdate = async (name: string, email: string) => {
        await new Promise((r) => setTimeout(r, 1000));
        // TODO: Implement actual API call
    };

    const handlePasswordUpdate = async (
        currentPassword: string,
        newPassword: string
    ) => {
        await new Promise((r) => setTimeout(r, 1000));
        // TODO: Implement actual API call
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1
                className={
                    `text-3xl font-bold mb-6 text-e-blue transition-opacity duration-700 ease-out ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`
                }
            >
                My Profile
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar slides in from left with opacity */}
                <div
                    className={
                        `transition-all duration-700 ease-out transform ${
                            isLoaded
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-4'
                        }`
                    }
                >
                    <ProfileSidebar
                        onLogout={() => authStore.logout()}
                        totalBookings={totalBookings}
                    />
                </div>

                <div
                    className={
                        `lg:col-span-2 space-y-6 transition-all duration-700 ease-out transform ${
                            isLoaded
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4'
                        }`
                    }
                >
                    <Tabs defaultValue="bookings">
                        <TabsList className="grid w-full grid-cols-4 mb-6 border-b">
                            {['bookings', 'favorites', 'profile', 'security'].map((tab) => (
                                <TabsTrigger value={tab} key={tab} className="uppercase">
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent
                            value="bookings"
                            className={
                                `mt-0 transition-opacity duration-500 ease-out ${
                                    isLoaded ? 'opacity-100' : 'opacity-0'
                                }`
                            }
                        >
                            <BookingHistory
                                bookings={bookingHistory}
                                setBookings={setBookingHistory}
                            />
                        </TabsContent>

                        <TabsContent
                            value="favorites"
                            className={
                                `mt-0 transition-opacity duration-500 ease-out delay-100 ${
                                    isLoaded ? 'opacity-100' : 'opacity-0'
                                }`
                            }
                        >
                            <div className="text-center py-8 text-gray-500">
                                Favorites feature coming soon...
                            </div>
                        </TabsContent>

                        <TabsContent
                            value="profile"
                            className={
                                `mt-0 transition-opacity duration-500 ease-out delay-200 ${
                                    isLoaded ? 'opacity-100' : 'opacity-0'
                                }`
                            }
                        >
                            <ProfileSettings
                                initialName={authStore.username}
                                initialEmail={authStore.user.email}
                                onUpdate={handleProfileUpdate}
                            />
                        </TabsContent>

                        <TabsContent
                            value="security"
                            className={
                                `mt-0 transition-opacity duration-500 ease-out delay-300 ${
                                    isLoaded ? 'opacity-100' : 'opacity-0'
                                }`
                            }
                        >
                            <SecuritySettings onPasswordUpdate={handlePasswordUpdate} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
