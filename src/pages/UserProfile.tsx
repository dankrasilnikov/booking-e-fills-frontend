import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { BookingHistory } from "@/components/profile/BookingHistory";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { gasStations } from '../lib/api';
import { useState, useEffect } from 'react';
import { authStore } from "@/stores/authStore";
import { StationSlot } from "@/types/api";

// Dummy data for booking history
const bookingHistory = [
  {
    id: "EF-834729",
    stationName: "Amsterdam Central Station",
    date: "2025-05-10",
    time: "14:30",
    status: "Completed"
  },
  {
    id: "EF-729183",
    stationName: "Utrecht Science Park",
    date: "2025-05-03",
    time: "10:15",
    status: "Completed"
  },
  {
    id: "EF-612895",
    stationName: "Rotterdam Business Center",
    date: "2025-04-27",
    time: "16:45",
    status: "Cancelled"
  }
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState<StationSlot[]>([]);

  // Redirect if not authenticated
  if (!authStore.isAuthenticated || !authStore.userData) {
    navigate("/login", { state: { from: "/profile" } });
    return null;
  }

  const handleProfileUpdate = async (name: string, email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // TODO: Implement actual API call
  };

  const handlePasswordUpdate = async (currentPassword: string, newPassword: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // TODO: Implement actual API call
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar */}
        <ProfileSidebar onLogout={() => authStore.logout()} />

        {/* Main content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="bookings">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings" className="mt-0">
              <BookingHistory bookings={bookingHistory} />
            </TabsContent>

            <TabsContent value="favorites" className="mt-0">
              {/* TODO: Implement favorites component */}
              <div className="text-center py-8 text-gray-500">
                Favorites feature coming soon...
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <ProfileSettings
                initialName={authStore.username}
                initialEmail={authStore.user.email}
                onUpdate={handleProfileUpdate}
              />
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <SecuritySettings onPasswordUpdate={handlePasswordUpdate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
