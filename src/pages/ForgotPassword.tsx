import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth, user } from '@/lib/api'
import { authStore } from '@/stores/authStore'
import { toast } from 'sonner'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        const handleToken = () => {
            const hash = window.location.hash.substring(1)
            const params = new URLSearchParams(hash)
            
            const accessToken = params.get('access_token')
            const refreshToken = params.get('refresh_token')
            
            if (accessToken && refreshToken) {
                localStorage.setItem('refresh_token', refreshToken)
                
                authStore.setAccessToken(accessToken);
            } else {
                toast.error('Invalid or missing tokens')
                navigate('/login')
            }
        }

        handleToken()
    }, [navigate])

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setIsLoading(true)

        try {
            await user.changePassword(newPassword)
            toast.success('Password updated successfully')
            authStore.logout()
            navigate('/login')
        } catch (error) {
            toast.error('Failed to update password')
            console.error('Password update error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Reset Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordReset} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="newPassword" className="text-sm font-medium">
                                    New Password
                                </label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium">
                                    Confirm Password
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update Password'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ForgotPassword
