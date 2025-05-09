import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/browse');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ 
      backgroundImage: 'url(https://images.pexels.com/photos/6899778/pexels-photo-6899778.jpeg?auto=compress&cs=tinysrgb&w=1600)', 
      backgroundSize: 'cover' 
    }}>
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Login Form */}
      <div className="relative z-10 bg-black/80 p-8 md:p-12 rounded-md w-full max-w-md mx-4">
        <div className="mb-8">
          <Link to="/" className="text-netflix-red font-bold text-3xl">
            NETFLIX
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-white">Sign In</h1>
        
        {error && (
          <div className="bg-red-900/60 text-white p-3 rounded mb-6 flex items-start">
            <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-netflix-gray/30 text-white rounded p-4 focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-netflix-gray/30 text-white rounded p-4 focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full netflix-btn py-3 text-lg font-medium"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-netflix-gray">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 accent-netflix-red"
              />
              <label htmlFor="remember" className="text-sm">Remember me</label>
            </div>
            <a href="#" className="text-sm hover:underline">Need help?</a>
          </div>
          
          <p className="mt-6">
            New to Netflix?{' '}
            <Link to="/signup" className="text-white hover:underline">
              Sign up now
            </Link>
          </p>
          
          <p className="mt-4 text-sm text-netflix-gray">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;