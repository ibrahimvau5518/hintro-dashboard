import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useDashboardData } from '../hooks/useDashboardData';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, dashboard, stats, recentCalls, isLoading, error } = useDashboardData();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content Area */}
      <div className="md:ml-[240px] flex flex-col min-h-screen transition-all duration-300">
        
        {/* Top Navigation Bar */}
        <Topbar 
          toggleSidebar={() => setSidebarOpen(true)} 
          userName={isLoading ? '...' : profile?.name || 'Alex'} 
        />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet context={{ dashboard, stats, recentCalls, isLoading, error }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;