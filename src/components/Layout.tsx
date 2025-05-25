import React, { ReactNode, memo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = memo(({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-1'>{children}</main>
            <Footer />
        </div>
    );
});

export default Layout;
