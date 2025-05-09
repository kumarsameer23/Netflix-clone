import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useState, useEffect } from 'react';

const Layout = () => {
  const location = useLocation();
  const [transparent, setTransparent] = useState(true);
  const isHomePage = location.pathname === '/';
  const isLoginOrSignup = ['/login', '/signup'].includes(location.pathname);

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginOrSignup && (
        <Navbar transparent={transparent && isHomePage} />
      )}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isLoginOrSignup && <Footer />}
    </div>
  );
};

export default Layout;