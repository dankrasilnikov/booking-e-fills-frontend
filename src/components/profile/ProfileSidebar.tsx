import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authStore } from '@/stores/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface ProfileSidebarProps {
  totalBookings: number;
  onLogout: () => void;
}

const ProfileSidebar = ({ totalBookings, onLogout }: ProfileSidebarProps) => {
  const navigate = useNavigate();

  const formatMonthYear = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    });
  };

  const onAdminOpen = () => {
    if (
      !authStore.isAuthenticated &&
      authStore.userrole.toLowerCase() !== 'admin'
    )
      return;

    navigate('/admin');
  };

  return (
    <div>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col items-center text-center'>
            <Avatar className='h-24 w-24 mb-4'>
              <AvatarImage src='' />
              <AvatarFallback className='bg-e-blue text-white text-2xl'>
                {authStore?.username
                  ? authStore?.username.charAt(0).toUpperCase()
                  : 'U'}
              </AvatarFallback>
            </Avatar>
            <h2 className='text-xl font-bold'>
              {authStore?.username ? authStore?.username : 'User'}
            </h2>
            <p className='text-gray-500'>{authStore.user.email}</p>
            <Button
              variant='outline'
              className='mt-4 w-full'
              onClick={onLogout}
            >
              Sign Out
            </Button>
            {authStore.userrole?.toLowerCase() === 'admin' && (
              <Link to='/admin' className='flex w-full mt-4'>
                <Button
                  variant='secondary'
                  className='w-full'
                  onClick={onAdminOpen}
                >
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className='mt-6'>
        <CardHeader>
          <CardTitle className='text-lg'>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Member Since</span>
              <span>{formatMonthYear(authStore.user?.created_at)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Total Bookings</span>
              <span>{totalBookings}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default observer(ProfileSidebar);
