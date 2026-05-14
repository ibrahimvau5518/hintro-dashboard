import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  BookOpen,
  MessageSquare,
  Settings,
  History,
  MessageCircle,
  Zap,
  X
} from 'lucide-react';
import FeedbackModal from './FeedbackModal';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Call Insights', icon: <LineChart size={20} />, path: '/insights' },
    { name: 'Knowledge Base', icon: <BookOpen size={20} />, path: '/knowledge' },
    { name: 'Prompts', icon: <MessageSquare size={20} />, path: '/prompts' },
    { name: 'Boxy Controls', icon: <Settings size={20} />, path: '/controls' },
  ];

  const handleActionItemClick = (e, path) => {
    if (path === '/feedback') {
      e.preventDefault();
      setFeedbackOpen(true);
    }
  };

  const sidebarClass = `fixed inset-y-0 left-0 z-50 w-[240px] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <>
      <div className={sidebarClass}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 h-16 shrink-0">
            <span className="text-2xl font-bold text-indigo-600">Hintro</span>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <div className="mr-3">{item.icon}</div>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="p-3 border-t border-gray-100 space-y-1 shrink-0">
            <NavLink
              to="/feedback-history"
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <div className="mr-3"><History size={20} /></div>
              Feedback History
            </NavLink>

            <button
              onClick={(e) => handleActionItemClick(e, '/feedback')}
              className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <div className="mr-3"><MessageCircle size={20} /></div>
              Feedback
            </button>
            
            <div className="pt-2">
              <button className="flex items-center w-full px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                <Zap size={20} className="mr-3" />
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Feedback Modal */}
      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
};

export default Sidebar;