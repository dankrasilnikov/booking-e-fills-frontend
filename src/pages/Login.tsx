import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { auth, user as userApi } from '@/lib/api';
import { authStore } from '@/stores/authStore';
import { toast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const resp = await auth.login({ email: data.email, password: data.password });
      authStore.setAuth(resp.access_token, resp.user);
      authStore.setRefreshToken(resp.refresh_token);
      const profile = await userApi.getProfile(resp.user.id);
      authStore.username = profile.username;
      authStore.userrole = profile.role;
      navigate(from, { replace: true });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: err.message || 'Unable to login. Please try again.',
      });
    }
  };

  const handleForgotPassword = async () => {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    try {
      if (!email || errors.email) {
        toast({
          variant: 'destructive',
          title: 'Invalid Email',
          description: 'Please enter a valid email address to reset password.',
        });
        return;
      }
      await auth.resetPassword(email);
      toast({
        title: 'Reset Email Sent',
        description: 'Check your inbox for password reset instructions.',
      });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message || 'Failed to send reset email.',
      });
    }
  };

  return (
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-e-blue hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-e-blue hover:underline">Sign up</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
  );
};

export default Login;
