import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-netflix-black py-12 mt-12">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Social Media Links */}
          <div className="mb-6 md:mb-0 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-netflix-gray hover:text-netflix-light">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-netflix-gray hover:text-netflix-light">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-netflix-gray hover:text-netflix-light">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-netflix-gray hover:text-netflix-light">
                <Youtube size={24} />
              </a>
            </div>
            <div className="flex items-center text-netflix-gray text-sm">
              <Globe size={18} className="mr-2" />
              <span>English</span>
            </div>
            <p className="text-netflix-gray text-sm mt-6">© 2025 Netflix Clone</p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-netflix-light font-medium mb-4">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-netflix-gray hover:text-netflix-light">Home</Link></li>
              <li><Link to="/browse" className="text-netflix-gray hover:text-netflix-light">Browse</Link></li>
              <li><Link to="/browse?genre=28" className="text-netflix-gray hover:text-netflix-light">Action</Link></li>
              <li><Link to="/browse?genre=35" className="text-netflix-gray hover:text-netflix-light">Comedy</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-netflix-light font-medium mb-4">Account</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/profile" className="text-netflix-gray hover:text-netflix-light">Profile</Link></li>
              <li><Link to="/login" className="text-netflix-gray hover:text-netflix-light">Sign In</Link></li>
              <li><Link to="/signup" className="text-netflix-gray hover:text-netflix-light">Sign Up</Link></li>
              <li><a href="#" className="text-netflix-gray hover:text-netflix-light">Help Center</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="text-netflix-light font-medium mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-netflix-gray hover:text-netflix-light">Privacy Policy</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-netflix-light">Terms of Service</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-netflix-light">Cookie Preferences</a></li>
              <li><a href="#" className="text-netflix-gray hover:text-netflix-light">Corporate Information</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;