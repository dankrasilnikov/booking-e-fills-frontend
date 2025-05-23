import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { user } from '@/lib/api.ts'

interface SecuritySettingsProps {
  onPasswordUpdate: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>
}

export const SecuritySettings = ({
  onPasswordUpdate,
}: SecuritySettingsProps) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
        description: 'Your new password and confirmation do not match.',
      })
      return
    }

    setIsLoading(true)

    try {
      await user.changePassword(newPassword)
      toast({
        title: 'Password Updated',
        description: 'Your password has been changed successfully.',
      })
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description:
          'Failed to update password. Please check your current password and try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='newPassword' className='text-sm font-medium'>
              New Password
            </label>
            <Input
              id='newPassword'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='confirmPassword' className='text-sm font-medium'>
              Confirm New Password
            </label>
            <Input
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
