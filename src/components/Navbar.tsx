import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User } from 'lucide-react';
import { authStore } from '@/stores/authStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = authStore;

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          <Link to='/' className='flex items-center space-x-2'>
            <img
              src='/logo.png'
              alt='Zephyra Logo'
              className='w-full object-cover w-8 h-8'
            />
            <span className='text-xl font-bold'>Zephyra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-6'>
            <Link
              to='/'
              className='text-gray-600 hover:text-e-blue transition-colors'
            >
              Home
            </Link>
            <Link
              to='/map'
              className='text-gray-600 hover:text-e-blue transition-colors'
            >
              Find Stations
            </Link>

            {auth.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='relative h-10 w-10 rounded-full'
                  >
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-e-blue text-white'>
                        {auth?.username?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>
                    <Link to='/profile' className='flex w-full'>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => authStore.logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='flex items-center space-x-2'>
                <Link to='/login'>
                  <Button variant='ghost'>Login</Button>
                </Link>
                <Link to='/register'>
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 py-2 space-y-4'>
            <Link
              to='/'
              className='block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to='/map'
              className='block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
              onClick={() => setIsMenuOpen(false)}
            >
              Find Stations
            </Link>

            {auth.isAuthenticated ? (
              <>
                <Link
                  to='/profile'
                  className='block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    auth.logout();
                    setIsMenuOpen(false);
                  }}
                  className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
                >
                  Logout
                </button>
              </>
            ) : (
              <div className='space-y-2'>
                <Link
                  to='/login'
                  className='block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='block px-4 py-2 text-e-blue hover:bg-gray-100 rounded-md'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
