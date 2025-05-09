import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, ChevronDown, Menu, X, Film } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  transparent: boolean;
}

const Navbar = ({ transparent }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        transparent ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-netflix-black'
      }`}
    >
      <div className="container-fluid py-4">
        <div className="flex items-center justify-between">
          {/* Custom Logo */}
          <Link to="/" className="logo-shine flex items-center space-x-2 text-netflix-red font-bold text-3xl">
            <Film className="w-8 h-8" />
            <span className="tracking-wider">STREAMIX</span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/browse" className="text-netflix-light hover:text-white transition">Home</Link>
            <Link to="/browse?genre=28" className="text-netflix-light hover:text-white transition">Action</Link>
            <Link to="/browse?genre=35" className="text-netflix-light hover:text-white transition">Comedy</Link>
            <Link to="/browse?genre=27" className="text-netflix-light hover:text-white transition">Horror</Link>
            <Link to="/browse?genre=10749" className="text-netflix-light hover:text-white transition">Romance</Link>
          </nav>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Titles, people, genres"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/60 text-white border border-netflix-gray rounded py-1 px-3 w-56 focus:outline-none focus:border-white"
                    autoFocus
                  />
                  <button 
                    type="button" 
                    className="ml-2 text-netflix-light" 
                    onClick={() => setShowSearch(false)}
                  >
                    <X size={20} />
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setShowSearch(true)} 
                  className="text-netflix-light hover:text-white"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center space-x-1 text-netflix-light hover:text-white">
                  <User size={20} />
                  <ChevronDown size={16} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-netflix-black border border-netflix-gray rounded shadow-lg py-2 hidden group-hover:block">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-netflix-light hover:bg-netflix-hover"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-netflix-light hover:bg-netflix-hover"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block netflix-btn">
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-netflix-light" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-netflix-black mt-4 py-4 rounded animate-fade-in">
            <div className="flex items-center mx-4 mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-netflix-dark text-white border border-netflix-gray rounded py-1 px-3 w-full focus:outline-none focus:border-white"
              />
              <button onClick={handleSearch} className="ml-2 text-netflix-light">
                <Search size={20} />
              </button>
            </div>
            <nav className="flex flex-col space-y-4 px-4">
              <Link 
                to="/browse" 
                className="text-netflix-light hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/browse?genre=28" 
                className="text-netflix-light hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Action
              </Link>
              <Link 
                to="/browse?genre=35" 
                className="text-netflix-light hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Comedy
              </Link>
              <Link 
                to="/browse?genre=27" 
                className="text-netflix-light hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Horror
              </Link>
              <Link 
                to="/browse?genre=10749" 
                className="text-netflix-light hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Romance
              </Link>
              {currentUser ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-netflix-light hover:text-white transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-netflix-light hover:text-white transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="netflix-btn inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;