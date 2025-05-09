import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/browse');
    } catch (err) {
      setError('Failed to create an account. Email may already be in use.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ 
      backgroundImage: 'url(https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1600)', 
      backgroundSize: 'cover' 
    }}>
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Signup Form */}
      <div className="relative z-10 bg-black/80 p-8 md:p-12 rounded-md w-full max-w-md mx-4">
        <div className="mb-8">
          <Link to="/" className="text-netflix-red font-bold text-3xl">
            NETFLIX
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-white">Sign Up</h1>
        
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
          
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-netflix-gray/30 text-white rounded p-4 focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full netflix-btn py-3 text-lg font-medium"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-8 text-netflix-gray">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </p>
          
          <p className="mt-4 text-sm text-netflix-gray">
            By signing up, you agree to our Terms of Use and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;