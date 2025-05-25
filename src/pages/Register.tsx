import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/lib/api';

const registerSchema = z.object({
  username: z.string().min(1, 'Name is required').max(50, 'Name must be 50 chars or less'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    control,
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await auth.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast({
        title: 'Account Created',
        description: 'Your account has been created successfully.',
      });
      navigate('/');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'Unable to create account. Please try again.',
      });
    }
  };

  return (
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your Zephyra account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Name</label>
                <Input
                    id="username"
                    {...formRegister('username')}
                    placeholder="User"
                    className={errors.username ? 'border-red-500' : ''}
                    required
                />
                {errors.username && (
                    <p className="text-xs text-red-500">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                    id="email"
                    type="email"
                    {...formRegister('email')}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                    required
                />
                {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                    id="password"
                    type="password"
                    {...formRegister('password')}
                    className={errors.password ? 'border-red-500' : ''}
                    required
                />
                {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                <Input
                    id="confirmPassword"
                    type="password"
                    {...formRegister('confirmPassword')}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                    required
                />
                {errors.confirmPassword && (
                    <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                    control={control}
                    name="agreeToTerms"
                    render={({ field }) => (
                        <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={errors.agreeToTerms ? 'border-red-500' : ''}
                        />
                    )}
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I agree to the{' '}
                  <Link to="#" className="text-e-blue hover:underline">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="#" className="text-e-blue hover:underline">Privacy Policy</Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                  <p className="text-xs text-red-500">{errors.agreeToTerms.message}</p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-e-blue hover:underline">Sign in</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
  );
};

export default Register;
