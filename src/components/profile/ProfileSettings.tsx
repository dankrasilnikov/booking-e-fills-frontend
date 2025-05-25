import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { user } from '@/lib/api.ts';
import { authStore } from '@/stores/authStore.ts';

interface ProfileSettingsProps {
  initialName: string;
  initialEmail: string;
  onUpdate: (name: string, email: string) => Promise<void>;
}

export const ProfileSettings = ({
  initialName,
  initialEmail,
  onUpdate,
}: ProfileSettingsProps) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await user.changeUsername(name);
      authStore.username = name;
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been updated successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Failed to update profile information. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='name' className='text-sm font-medium'>
              Name
            </label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Your name'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='email' className='text-sm font-medium'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              value={email}
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your.email@example.com'
              required
            />
          </div>

          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
