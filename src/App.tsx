    import React, { ReactNode, useEffect } from 'react';
    import { Toaster } from '@/components/ui/toaster';
    import { Toaster as Sonner } from '@/components/ui/sonner';
    import { TooltipProvider } from '@/components/ui/tooltip';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
    import { observer } from 'mobx-react-lite';
    import Layout from './components/Layout';
    import Index from './pages/Index';
    import Map from './pages/Map';
    import Login from './pages/Login';
    import Register from './pages/Register';
    import BookingConfirmation from './pages/BookingConfirmation';
    import UserProfile from './pages/UserProfile';
    import NotFound from './pages/NotFound';
    import Admin from './pages/Admin';
    import ForgotPassword from './pages/ForgotPassword';
    import { initializeAuth } from '@/lib/api';
    import { authStore } from '@/stores/authStore';
    import { Analytics } from '@vercel/analytics/react';

    initializeAuth();

    const queryClient = new QueryClient();

    // Protected Route wrapper for authenticated users
    const RequireAuth: React.FC<{ children: ReactNode }> = observer(({ children }) => {
        const location = useLocation();

        if (authStore.isLoading) return <>Loading...</>;

        if (!authStore.isAuthenticated) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }

        return <>{children}</>;
    });

    // Additional wrapper for admin-only routes
    const RequireAdmin: React.FC<{ children: ReactNode }> = observer(({ children }) => {
        const location = useLocation();

        if (authStore.isLoading) return <>Loading...</>;

        if (!authStore.isAuthenticated || authStore.userrole?.toLowerCase() !== 'admin') {
            return <Navigate to="/" state={{ from: location }} replace />;
        }
        return <>{children}</>;
    });

    const App = () => (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Analytics />
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Layout><Index /></Layout>} />
                        <Route path="/map" element={<Layout><Map /></Layout>} />
                        <Route path="/login" element={<Layout><Login /></Layout>} />
                        <Route path="/register" element={<Layout><Register /></Layout>} />
                        <Route path="/forgotpass" element={<Layout><ForgotPassword /></Layout>} />
                        <Route
                            path="/booking-confirmation"
                            element={
                                <RequireAuth>
                                    <Layout><BookingConfirmation /></Layout>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <RequireAuth>
                                    <Layout><UserProfile /></Layout>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <RequireAuth>
                                    <RequireAdmin>
                                        <Layout><Admin /></Layout>
                                    </RequireAdmin>
                                </RequireAuth>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );

    export default App;
