import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/map', label: 'Find Stations' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
];
const SUPPORT_LINKS = [
  { href: '#', label: 'Help Center' },
  { href: '#', label: 'Contact Us' },
  { href: '#', label: 'FAQs' },
];
const LEGAL_LINKS = [
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Cookie Policy' },
];

const Footer: React.FC = React.memo(() => {
  // Compute current year once
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
      <footer className='bg-gray-50 border-t border-gray-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <Link to='/' className='flex items-center space-x-2 mb-4'>
                <img
                    src='/logo.png'
                    alt='Zephyra Logo'
                    width={32}
                    height={32}
                    loading='lazy'
                    className='w-8 h-8 object-cover'
                />
                <span className='text-xl font-bold'>Zephyra</span>
              </Link>
              <p className='text-gray-600 text-sm'>
                Finding and booking electric vehicle charging stations across the
                Netherlands has never been easier.
              </p>
            </div>

            <div>
              <h3 className='font-medium text-gray-900 mb-4'>Quick Links</h3>
              <ul className='space-y-2'>
                {QUICK_LINKS.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                          to={to}
                          className='text-gray-600 hover:text-e-blue text-sm'
                      >
                        {label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='font-medium text-gray-900 mb-4'>Support</h3>
              <ul className='space-y-2'>
                {SUPPORT_LINKS.map(({ href, label }) => (
                    <li key={label}>
                      <a
                          href={href}
                          className='text-gray-600 hover:text-e-blue text-sm'
                      >
                        {label}
                      </a>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='font-medium text-gray-900 mb-4'>Legal</h3>
              <ul className='space-y-2'>
                {LEGAL_LINKS.map(({ href, label }) => (
                    <li key={label}>
                      <a
                          href={href}
                          className='text-gray-600 hover:text-e-blue text-sm'
                      >
                        {label}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='border-t border-gray-200 mt-8 pt-6'>
            <p className='text-gray-500 text-sm text-center'>
              &copy; {currentYear} Zephyra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
});

export default Footer;
