import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Map, MapPin, Check, User, QrCode } from 'lucide-react';

const Index = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section */}
      <section className='hero-section py-16 md:py-24'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2 mb-10 md:mb-0'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in'>
                Charging your EV{' '}
                <span className='text-e-blue'>has never been easier</span>
              </h1>
              <p
                className='text-lg md:text-xl text-gray-600 mb-8 animate-fade-in'
                style={{ animationDelay: '0.2s' }}
              >
                Find, reserve, and use electric vehicle charging stations across
                the Netherlands with just a few taps.
              </p>
              <div
                className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in'
                style={{ animationDelay: '0.4s' }}
              >
                <Link to='/map'>
                  <Button size='lg' className='w-full sm:w-auto'>
                    Find Charging Station
                  </Button>
                </Link>
                <Link to='/register'>
                  <Button
                    size='lg'
                    variant='outline'
                    className='w-full sm:w-auto'
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className='md:w-1/2'>
              <div className='relative'>
                <img
                  src='/marketing1.png'
                  alt='Electric Vehicle Charging'
                  className='rounded-lg shadow-lg w-full animate-fade-in'
                  style={{ animationDelay: '0.3s' }}
                />
                <div
                  className='absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg animate-fade-in'
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className='flex items-center space-x-2'>
                    <div className='w-10 h-10 rounded-full bg-e-light-green flex items-center justify-center'>
                      <Check className='text-e-green' size={20} />
                    </div>
                    <div>
                      <p className='font-semibold'>Fast & Reliable</p>
                      <p className='text-sm text-gray-500'>
                        500+ stations across NL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-white'>
        <div className='container px-4 mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              How Zephyra Works
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Our platform makes finding and using EV charging stations simple
              and convenient.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='feature-card'>
              <div className='w-14 h-14 mb-6 rounded-full bg-e-light-blue flex items-center justify-center'>
                <MapPin className='text-e-blue' size={24} />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Locate Stations</h3>
              <p className='text-gray-600'>
                Find charging stations near you or along your planned route
                using our interactive map.
              </p>
            </div>

            <div className='feature-card'>
              <div className='w-14 h-14 mb-6 rounded-full bg-e-light-green flex items-center justify-center'>
                <Calendar className='text-e-green' size={24} />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Reserve in Advance</h3>
              <p className='text-gray-600'>
                Book charging slots ahead of time to ensure availability when
                you need it.
              </p>
            </div>

            <div className='feature-card'>
              <div className='w-14 h-14 mb-6 rounded-full bg-e-light-blue flex items-center justify-center'>
                <QrCode className='text-e-blue' size={24} />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Scan & Charge</h3>
              <p className='text-gray-600'>
                Use our QR code system for easy authentication and seamless
                charging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className='py-16 bg-e-gray'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2 mb-8 md:mb-0 md:pr-12'>
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                Find Charging Stations Anywhere in the Netherlands
              </h2>
              <p className='text-lg text-gray-600 mb-6'>
                Our interactive map shows all available charging stations across
                the country. Filter by charging speed, availability, and
                connector type.
              </p>
              <Link to='/map'>
                <Button size='lg' className='w-full sm:w-auto'>
                  <Map className='mr-2 h-4 w-4' /> Explore Map
                </Button>
              </Link>
            </div>
            <div className='md:w-1/2'>
              <div className='bg-white p-2 rounded-lg shadow-lg'>
                <img
                  src='/marketing2.png'
                  alt='Zephyra Map Interface'
                  className='w-full h-80 md:h-96 rounded-md object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 bg-white'>
        <div className='container px-4 mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              What Our Users Say
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Join thousands of satisfied EV owners across the Netherlands.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 rounded-full bg-e-blue flex items-center justify-center text-white mr-3'>
                  M
                </div>
                <div>
                  <p className='font-semibold'>Martijn van der Berg</p>
                  <p className='text-sm text-gray-500'>Tesla Model 3 Owner</p>
                </div>
              </div>
              <p className='text-gray-600'>
                "Zephyra has completely changed how I plan my trips. Being able
                to reserve stations in advance gives me peace of mind when
                traveling across the country."
              </p>
            </div>

            <div className='bg-gray-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 rounded-full bg-e-green flex items-center justify-center text-white mr-3'>
                  L
                </div>
                <div>
                  <p className='font-semibold'>Lisa de Vries</p>
                  <p className='text-sm text-gray-500'>Polestar 2 Owner</p>
                </div>
              </div>
              <p className='text-gray-600'>
                "The QR code system makes authentication so easy! No more
                fumbling with multiple apps or cards. Zephyra is my go-to
                charging solution."
              </p>
            </div>

            <div className='bg-gray-50 p-6 rounded-lg'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 rounded-full bg-e-blue flex items-center justify-center text-white mr-3'>
                  J
                </div>
                <div>
                  <p className='font-semibold'>Jan Bakker</p>
                  <p className='text-sm text-gray-500'>VW ID.4 Owner</p>
                </div>
              </div>
              <p className='text-gray-600'>
                "The real-time availability feature is a game-changer. I always
                know which stations are free before I arrive, saving me time and
                hassle."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gradient-to-r from-e-blue to-e-green py-16 text-white'>
        <div className='container px-4 mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Ready to Simplify Your EV Charging?
          </h2>
          <p className='text-lg mb-8 max-w-2xl mx-auto'>
            Join thousands of EV owners across the Netherlands who have made the
            switch to Zephyra.
          </p>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
            <Link to='/register'>
              <Button
                size='lg'
                variant='secondary'
                className='w-full sm:w-auto'
              >
                <User className='mr-2 h-4 w-4' /> Create Free Account
              </Button>
            </Link>
            <Link to='/map'>
              <Button
                size='lg'
                variant='outline'
                className='bg-transparent border-white text-white hover:bg-white hover:text-e-blue w-full sm:w-auto'
              >
                <Map className='mr-2 h-4 w-4' /> Find Charging Stations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
