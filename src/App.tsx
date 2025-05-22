import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingConfirmation from "./pages/BookingConfirmation";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import { initializeApp } from "./lib/init";
import Admin from "./pages/Admin";

// Initialize the app
initializeApp();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/map" element={<Layout><Map /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/booking-confirmation" element={<Layout><BookingConfirmation /></Layout>} />
          <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
