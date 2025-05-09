import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-netflix-red text-7xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-netflix-gray max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="netflix-btn flex items-center space-x-2"
      >
        <Home size={18} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;