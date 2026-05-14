import { useState } from 'react';
import { PlayCircle, LogOut, ChevronDown, User, Menu } from 'lucide-react';
import LogoutModal from './LogoutModal';

const Topbar = ({ userName = 'Alex', toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    console.log('User logged out');
    setLogoutModalOpen(false);
  };

  const handleSwitchUser = (userId) => {
    localStorage.setItem('hintro_user_id', userId);
    window.location.reload();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center w-full md:w-1/4">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-1 -ml-1 text-gray-600 hover:bg-gray-100 rounded-md md:hidden"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 hidden sm:block">Dashboard</h1>
      </div>

      {/* Center: Greeting (Hidden on smaller screens) */}
      <div className="hidden lg:flex flex-col items-center w-2/4">
        <h2 className="text-base font-semibold text-gray-900 flex items-center">
          Hi, {userName} <span className="text-lg mx-1">👋</span> Welcome to Hintro
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">Ready to make your next call smarter?</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end space-x-3 md:space-x-4 w-full md:w-1/4">
        <button className="hidden sm:flex items-center text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 md:px-4 py-2 rounded-lg transition-colors">
          <PlayCircle size={18} className="mr-2" />
          Watch Tutorial
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none p-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
              <User size={18} className="text-indigo-600" />
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-100 text-sm">
                <p className="text-gray-500 text-xs">Signed in as</p>
                <p className="font-semibold text-gray-900 truncate">{userName}</p>
              </div>
              <div className="p-1 border-b border-gray-100">
                <button 
                  onClick={() => handleSwitchUser('u1')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Switch to User 1 (Empty)
                </button>
                <button 
                  onClick={() => handleSwitchUser('u2')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Switch to User 2 (Data)
                </button>
              </div>
              <div className="p-1">
                <button 
                  onClick={handleLogoutClick}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={logoutModalOpen} 
        onClose={() => setLogoutModalOpen(false)} 
        onConfirm={handleConfirmLogout} 
      />
    </div>
  );
};

export default Topbar;