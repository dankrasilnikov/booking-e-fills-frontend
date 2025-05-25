import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Menu, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { authStore } from '@/stores/authStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    authStore.logout();
    navigate('/');
    setIsDropdownOpen(false);
  }, [navigate]);

  return (
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
                src="/logo.png"
                alt="Zephyra Logo"
                width={32}
                height={32}
                loading="eager"
                className="w-8 h-8 object-cover"
            />
            <span className="text-xl font-bold">Zephyra</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-e-blue transition-colors">
              Home
            </Link>
            <Link to="/map" className="text-gray-600 hover:text-e-blue transition-colors">
              Find Stations
            </Link>

            {authStore.isAuthenticated ? (
                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-full">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-e-blue text-white">
                          {authStore.username?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
            <div className="md:hidden mt-2 space-y-2">
              {['/', '/map'].map((path) => (
                  <Link
                      key={path}
                      to={path}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    {path === '/' ? 'Home' : 'Find Stations'}
                  </Link>
              ))}
              {authStore.isAuthenticated ? (
                  <>
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </button>
                  </>
              ) : (
                  ['login', 'register'].map((route) => (
                      <Link
                          key={route}
                          to={`/${route}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {route.charAt(0).toUpperCase() + route.slice(1)}
                      </Link>
                  ))
              )}
            </div>
        )}
      </nav>
  );
};

export default observer(Navbar);
