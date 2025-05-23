import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-50 border-t border-gray-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <Link to='/' className='flex items-center space-x-2 mb-4'>
              <img
                src='/logo.png'
                alt='Zephyra Logo'
                className='object-cover w-8 h-8 flex items-center justify-center'
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
              <li>
                <Link
                  to='/'
                  className='text-gray-600 hover:text-e-blue text-sm'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/map'
                  className='text-gray-600 hover:text-e-blue text-sm'
                >
                  Find Stations
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  className='text-gray-600 hover:text-e-blue text-sm'
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to='/register'
                  className='text-gray-600 hover:text-e-blue text-sm'
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-medium text-gray-900 mb-4'>Support</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-gray-600 hover:text-e-blue text-sm'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-600 hover:text-e-blue text-sm'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-600 hover:text-e-blue text-sm'>
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-medium text-gray-900 mb-4'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-gray-600 hover:text-e-blue text-sm'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-600 hover:text-e-blue text-sm'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-600 hover:text-e-blue text-sm'>
                  Cookie Policy
                </a>
              </li>
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
  )
}

export default Footer
