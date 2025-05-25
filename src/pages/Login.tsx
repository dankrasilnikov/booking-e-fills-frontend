import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth, user } from '@/lib/api';
import { authStore } from '@/stores/authStore';
import { toast } from '@/hooks/use-toast.ts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await auth.login({ email, password });

      authStore.setAuth(data.access_token, data.user);
      authStore.setRefreshToken(data.refresh_token);
      const { username, role } = await user.getProfile(authStore.user.id);
      authStore.username = username;
      authStore.userrole = role;

      navigate(from);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleForgotPassword = async (e) => {
    try {
      e.preventDefault();
      if (!email || !validateEmail(email)) {
        toast({
          variant: 'destructive',
          title: 'Please fill the email field',
          description: 'Your email is invalid or missing.',
        });
      }

      await auth.resetPassword(email);

      toast({
        title: 'Success',
        description: 'Please check your email and follow the instructions.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
    }
  };

  return (
    <div className='container max-w-md mx-auto px-4 py-12'>
      <Card className='shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            Welcome Back
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium'>
                Email
              </label>
              <Input
                id='email'
                type='email'
                placeholder='your.email@example.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='text-sm font-medium'>
                  Password
                </label>
                <Link
                  onClick={(e) => handleForgotPassword(e)}
                  to='#'
                  className='text-sm text-e-blue hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-center text-sm'>
            Don't have an account?{' '}
            <Link to='/register' className='text-e-blue hover:underline'>
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
