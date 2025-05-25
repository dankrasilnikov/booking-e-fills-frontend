import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { authStore } from '@/stores/authStore.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for profile form validation
const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 chars or less'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  initialName: string;
  initialEmail: string;
  onUpdate: (name: string) => Promise<void>;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
                                                                  initialName,
                                                                  initialEmail,
                                                                  onUpdate,
                                                                }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: initialName },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await onUpdate(data.name);
      authStore.username = data.name; // update MobX store
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
    }
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                  id="name"
                  {...register('name')}
                  placeholder="Your name"
                  className={errors.name ? 'border-red-500' : ''}
                  required
              />
              {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  disabled
                  value={initialEmail}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
};
