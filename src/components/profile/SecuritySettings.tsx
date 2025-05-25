import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const securitySchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SecurityFormData = z.infer<typeof securitySchema>;

interface SecuritySettingsProps {
  onPasswordUpdate: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  onPasswordUpdate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: SecurityFormData) => {
    try {
      await onPasswordUpdate(data.newPassword, data.newPassword);
      toast({
        title: 'Password Updated',
        description: 'Your password has been changed successfully.',
      });
      reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description:
          'Failed to update password. Please check your current password and try again.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='newPassword' className='text-sm font-medium'>
              New Password
            </label>
            <Input
              id='newPassword'
              type='password'
              {...register('newPassword')}
              placeholder='••••••••'
              className={errors.newPassword ? 'border-red-500' : ''}
              required
            />
            {errors.newPassword && (
              <p className='text-xs text-red-500'>
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label htmlFor='confirmPassword' className='text-sm font-medium'>
              Confirm New Password
            </label>
            <Input
              id='confirmPassword'
              type='password'
              {...register('confirmPassword')}
              placeholder='••••••••'
              className={errors.confirmPassword ? 'border-red-500' : ''}
              required
            />
            {errors.confirmPassword && (
              <p className='text-xs text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
