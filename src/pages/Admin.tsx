import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { admin, auth } from '@/lib/api';
import { authStore } from '@/stores/authStore';
import { toast } from 'sonner';

const Admin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [stationData, setStationData] = useState({
    title: '',
    connectorCount: 0,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!authStore.isAuthenticated) {
          console.log(authStore.isAuthenticated);
          navigate('/login', { state: { from: '/admin' } });
          return;
        }
        if (authStore.userrole?.toLowerCase() !== 'admin') {
          navigate('/profile', { state: { from: '/admin' } });
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login', { state: { from: '/admin' } });
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // Show loading state while checking auth
  if (isCheckingAuth) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='text-center'>Loading...</div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStationData((prev) => ({
      ...prev,
      [name]: name === 'title' ? value : Number(value),
    }));
  };

  const handleAddStation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await admin.addStation(stationData);
      toast.success('Station added successfully');
      setStationData({
        title: '',
        connectorCount: 0,
        latitude: 0,
        longitude: 0,
      });
    } catch (error) {
      toast.error('Failed to add station');
      console.error('Add station error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStation = async (name: string) => {
    if (!confirm('Are you sure you want to delete this station?')) return;

    setIsLoading(true);
    try {
      await admin.deleteStation(name);
      toast.success('Station deleted successfully');
    } catch (error) {
      toast.error('Failed to delete station');
      console.error('Delete station error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Add New Station</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStation} className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='title' className='text-sm font-medium'>
                  Station Title
                </label>
                <Input
                  id='title'
                  name='title'
                  value={stationData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='connectorCount' className='text-sm font-medium'>
                  Number of Connectors
                </label>
                <Input
                  id='connectorCount'
                  name='connectorCount'
                  type='number'
                  value={stationData.connectorCount}
                  onChange={handleInputChange}
                  required
                  min='1'
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='latitude' className='text-sm font-medium'>
                  Latitude
                </label>
                <Input
                  id='latitude'
                  name='latitude'
                  type='number'
                  step='any'
                  value={stationData.latitude}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='longitude' className='text-sm font-medium'>
                  Longitude
                </label>
                <Input
                  id='longitude'
                  name='longitude'
                  type='number'
                  step='any'
                  value={stationData.longitude}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Station'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Delete Station Section */}
        <Card>
          <CardHeader>
            <CardTitle>Delete Station</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <p className='text-sm text-gray-500'>
                Enter the station Name to delete it from the system.
              </p>
              <div className='space-y-2'>
                <label htmlFor='stationId' className='text-sm font-medium'>
                  Station Name
                </label>
                <Input
                  id='stationId'
                  type='text'
                  placeholder='Enter station name'
                />
              </div>
              <Button
                className='w-full'
                variant='destructive'
                disabled={isLoading}
                onClick={() => {
                  const name = (
                    document.getElementById('stationId') as HTMLInputElement
                  ).value;
                  if (name) handleDeleteStation(name);
                }}
              >
                {isLoading ? 'Deleting...' : 'Delete Station'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
