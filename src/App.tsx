import React, { ReactNode, Suspense, lazy, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Layout from './components/Layout';
import './App.css';
import { initializeAuth } from '@/lib/api';
import { authStore } from '@/stores/authStore';

const Index = lazy(() => import('./pages/Index'));
const MapPage = lazy(() => import('./pages/Map'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Admin = lazy(() => import('./pages/Admin'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));

initializeAuth();
const queryClient = new QueryClient();

const RequireAuth: React.FC<{ children: ReactNode }> = observer(({ children }) => {
    const location = useLocation();
    if (authStore.isLoading) {
        return null;
    }
    if (!authStore.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
});

// Admin-only wrapper
const RequireAdmin: React.FC<{ children: ReactNode }> = observer(({ children }) => {
    const location = useLocation();
    if (authStore.isLoading) {
        return null;
    }
    if (!authStore.isAuthenticated || authStore.userrole?.toLowerCase() !== 'admin') {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return <>{children}</>;
});

const App: React.FC = () => {
    useEffect(() => {
        import('@vercel/analytics').then(({ Analytics }) => {
            Analytics();
        });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Suspense fallback={<div />}>
                        <Routes>
                            <Route path="/" element={<Layout><Index /></Layout>} />
                            <Route path="/map" element={<Layout><MapPage /></Layout>} />
                            <Route path="/login" element={<Layout><Login /></Layout>} />
                            <Route path="/register" element={<Layout><Register /></Layout>} />
                            <Route path="/forgotpass" element={<Layout><ForgotPassword /></Layout>} />

                            <Route path="/booking-confirmation" element={
                                <RequireAuth><Layout><BookingConfirmation /></Layout></RequireAuth>
                            } />
                            <Route path="/profile" element={
                                <RequireAuth><Layout><UserProfile /></Layout></RequireAuth>
                            } />
                            <Route path="/admin" element={
                                <RequireAuth><RequireAdmin><Layout><Admin /></Layout></RequireAdmin></RequireAuth>
                            } />

                            <Route path="*" element={<Layout><NotFound /></Layout>} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;
