import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Map, MapPin, Check, QrCode } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delayClass: string;
}
interface Testimonial {
  initials: string;
  name: string;
  role: string;
  quote: string;
  bgColor: string;
  delayClass: string;
}

// Static data
const FEATURES: Feature[] = [
  {
    icon: <MapPin className='text-e-blue' size={24} />, title: 'Locate Stations', desc:
        'Find charging stations near you or along your planned route using our interactive map.', delayClass: 'delay-0'
  },
  {
    icon: <Calendar className='text-e-green' size={24} />, title: 'Reserve in Advance', desc:
        'Book charging slots ahead of time to ensure availability when you need it.', delayClass: 'delay-200'
  },
  {
    icon: <QrCode className='text-e-blue' size={24} />, title: 'Scan & Charge', desc:
        'Use our QR code system for easy authentication and seamless charging.', delayClass: 'delay-400'
  },
];
const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'M', name: 'Martijn van der Berg', role: 'Tesla Model 3 Owner', quote:
        '“Zephyra has completely changed how I plan my trips. Being able to reserve stations in advance gives me peace of mind when traveling across the country.”',
    bgColor: 'bg-e-blue', delayClass: 'delay-0'
  },
  {
    initials: 'L', name: 'Lisa de Vries', role: 'Polestar 2 Owner', quote:
        '“The QR code system makes authentication so easy! No more fumbling with multiple apps or cards. Zephyra is my go-to charging solution.”',
    bgColor: 'bg-e-green', delayClass: 'delay-200'
  },
  {
    initials: 'J', name: 'Jan Bakker', role: 'VW ID.4 Owner', quote:
        '“The real-time availability feature is a game-changer. I always know which stations are free before I arrive, saving me time and hassle.”',
    bgColor: 'bg-e-blue', delayClass: 'delay-400'
  },
];

const Index: React.FC = React.memo(() => (
    <div className='flex flex-col min-h-screen'>
      <section className='hero-section py-16 md:py-24 overflow-hidden'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2 mb-10 md:mb-0'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in'>
                Charging your EV <span className='text-e-blue'>has never been easier</span>
              </h1>
              <p className='text-lg md:text-xl text-gray-600 mb-8 animate-fade-in delay-200'>
                Find, reserve, and use electric vehicle charging stations across the Netherlands with just a few taps.
              </p>
              <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in delay-400'>
                <Link to='/map'><Button size='lg' className='w-full sm:w-auto'>Find Charging Station</Button></Link>
                <Link to='/register'><Button size='lg' variant='outline' className='w-full sm:w-auto'>Create Account</Button></Link>
              </div>
            </div>
            <div className='md:w-1/2 relative overflow-visible'>
              <img
                  src='/marketing1.png'
                  alt='Electric Vehicle Charging'
                  width={600}
                  height={400}
                  className='rounded-lg shadow-lg w-full animate-fade-in delay-300'
              />
              <div className='absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg animate-cloud delay-500'>
                <div className='flex items-center space-x-2'>
                  <div className='w-10 h-10 rounded-full bg-e-light-green flex items-center justify-center'>
                    <Check className='text-e-green' size={20} />
                  </div>
                  <div>
                    <p className='font-semibold'>Fast & Reliable</p>
                    <p className='text-sm text-gray-500'>500+ stations across NL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white overflow-hidden'>
        <div className='container px-4 mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4 animate-fade-in'>How Zephyra Works</h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in delay-200'>Our platform makes finding and using EV charging stations simple and convenient.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {FEATURES.map(({ icon, title, desc, delayClass }) => (
                <div key={title} className={`bg-gray-50 p-6 rounded-lg text-center animate-fade-in ${delayClass} hover:shadow-xl hover:-translate-y-1 hover:scale-105`}>
                  <div className='w-14 h-14 mb-6 mx-auto rounded-full bg-e-light-blue flex items-center justify-center transition-transform transform-gpu hover:scale-110'>
                    {icon}
                  </div>
                  <h3 className='text-xl font-semibold mb-3'>{title}</h3>
                  <p className='text-gray-600'>{desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-e-gray overflow-hidden'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2 mb-8 md:mb-0 md:pr-12 animate-fade-in'>
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>Find Charging Stations Anywhere in the Netherlands</h2>
              <p className='text-lg text-gray-600 mb-6'>Our interactive map shows all available charging stations across the country. Filter by charging speed, availability, and connector type.</p>
              <Link to='/map'><Button size='lg' className='w-full sm:w-auto'><Map className='mr-2 h-4 w-4' /> Explore Map</Button></Link>
            </div>
            <div className='md:w-1/2 animate-fade-in delay-200'>
              <img
                  src='/marketing2.png'
                  alt='Zephyra Map Interface'
                  loading='lazy'
                  width={600}
                  height={400}
                  className='bg-white p-2 rounded-lg shadow-lg w-full h-80 md:h-96 object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white overflow-hidden'>
        <div className='container px-4 mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4 animate-fade-in'>What Our Users Say</h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in delay-200'>Join thousands of satisfied EV owners across the Netherlands.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {TESTIMONIALS.map(({ initials, name, role, quote, bgColor, delayClass }) => (
                <div key={name} className={`bg-gray-50 p-6 rounded-lg animate-fade-in ${delayClass}`}>
                  <div className='flex items-center mb-4'>
                    <div className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white mr-3`}>{initials}</div>
                    <div>
                      <p className='font-semibold'>{name}</p>
                      <p className='text-sm text-gray-500'>{role}</p>
                    </div>
                  </div>
                  <p className='text-gray-600'>{quote}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-gradient-to-r from-e-blue to-e-green py-16 text-white overflow-hidden'>
        <div className='container px-4 mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6 animate-fade-in'>Ready to Simplify Your EV Charging?</h2>
          <p className='text-lg mb-8 max-w-2xl mx-auto animate-fade-in delay-200'>Join thousands of EV owners across the Netherlands who have made the switch to Zephyra.</p>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in delay-400'>
            <Link to='/register'><Button size='lg' variant='secondary' className='w-full sm:w-auto'>Create Free Account</Button></Link>
            <Link to='/map'><Button size='lg' variant='outline' className='bg-transparent border-white text-white hover:bg-white hover:text-e-blue w-full sm:w-auto'>Find Charging Stations</Button></Link>
          </div>
        </div>
      </section>
    </div>
));

export default Index;
