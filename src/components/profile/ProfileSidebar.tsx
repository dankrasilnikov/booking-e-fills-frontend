import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileSidebarProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

export const ProfileSidebar = ({ user, onLogout }: ProfileSidebarProps) => {
  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="" />
              <AvatarFallback className="bg-e-blue text-white text-2xl">
                Hello User
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{user?.name ? user?.name : 'Hello'}</h2>
            <p className="text-gray-500">{user.email}</p>
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={onLogout}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Member Since</span>
              <span>May 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Bookings</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Favorite Stations</span>
              <span>2</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 