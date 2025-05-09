import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Edit, Save, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.email?.split('@')[0] || 'User');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const navigate = useNavigate();

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    setNotification({
      type: 'success',
      message: 'Profile updated successfully!'
    });
    setEditMode(false);
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
      setNotification({
        type: 'error',
        message: 'Failed to log out. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-fluid max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Account</h1>
        
        {notification && (
          <div className={`mb-6 p-4 rounded-md flex items-start ${
            notification.type === 'success' ? 'bg-green-900/60' : 'bg-red-900/60'
          }`}>
            <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={20} />
            <p>{notification.message}</p>
          </div>
        )}
        
        <div className="bg-netflix-dark rounded-lg overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-netflix-red p-6">
            <div className="flex items-center">
              <div className="bg-netflix-gray/50 p-4 rounded-full mr-4">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{displayName}</h2>
                <p className="text-netflix-light/80">{currentUser?.email}</p>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">Profile Details</h3>
                <button 
                  onClick={() => editMode ? handleSaveProfile() : setEditMode(true)} 
                  className="flex items-center text-netflix-light hover:text-white"
                >
                  {editMode ? (
                    <>
                      <Save size={18} className="mr-1" />
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <Edit size={18} className="mr-1" />
                      <span>Edit</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-netflix-gray text-sm mb-2">
                    Display Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-netflix-black text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                    />
                  ) : (
                    <p className="text-netflix-light">{displayName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-netflix-gray text-sm mb-2">
                    Email
                  </label>
                  <p className="text-netflix-light">{currentUser?.email}</p>
                </div>
              </div>
            </div>
            
            {/* Subscription Info (dummy data) */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Subscription</h3>
              <div className="bg-netflix-black p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-netflix-light">Premium Plan</p>
                  <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-netflix-gray text-sm">
                  Your next billing date is June 15, 2025
                </p>
              </div>
            </div>
            
            {/* Viewing History */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Viewing Activity</h3>
              <p className="text-netflix-gray mb-4">
                Recent titles you've watched
              </p>
              <ul className="space-y-2 text-netflix-light">
                <li className="border-b border-netflix-gray/20 pb-2">Stranger Things</li>
                <li className="border-b border-netflix-gray/20 pb-2">The Witcher</li>
                <li className="border-b border-netflix-gray/20 pb-2">Squid Game</li>
                <li className="border-b border-netflix-gray/20 pb-2">Money Heist</li>
              </ul>
            </div>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center netflix-btn-secondary py-2 px-4"
            >
              <LogOut size={18} className="mr-2" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;