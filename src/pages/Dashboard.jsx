import { useOutletContext } from 'react-router-dom';
import StatCard from '../components/StatCard';
import RecentCalls from '../components/RecentCalls';
import { Activity, Clock, Zap, Calendar } from 'lucide-react';
import { formatSecondsToTime } from '../utils/formatters';

const DashboardSkeleton = () => (
  <div className='max-w-6xl mx-auto animate-pulse'>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4'>
          <div className='w-12 h-12 bg-gray-200 rounded-xl shrink-0'></div>
          <div className='flex-1'>
            <div className='h-4 bg-gray-200 rounded w-24 mb-3'></div>
            <div className='h-8 bg-gray-200 rounded w-16'></div>
          </div>
        </div>
      ))}
    </div>
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-80'>
      <div className='px-6 py-5 border-b border-gray-200 flex justify-between items-center'>
        <div className='h-6 bg-gray-200 rounded w-32'></div>
        <div className='h-4 bg-gray-200 rounded w-16'></div>
      </div>
      <div className='p-6 space-y-6'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='flex items-center space-x-4'>
            <div className='w-10 h-10 bg-gray-200 rounded-full shrink-0'></div>
            <div className='flex-1'>
              <div className='h-4 bg-gray-200 rounded w-48 mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-24'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { dashboard, stats, recentCalls, isLoading, error } = useOutletContext();

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <div className='p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100'>Failed to load dashboard data: {error}</div>;

  const totalSessions = stats?.totalSessions || '0';
  const avgDuration = formatSecondsToTime(stats?.averageDuration || 0);
  const aiUsed = dashboard?.usage?.kb_files?.percentage ? `${dashboard.usage.kb_files.percentage}%` : '0%';
  const lastSession = stats?.lastSession && stats.lastSession.length > 0 
    ? new Date(stats.lastSession[0]).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) 
    : 'N/A';

  // Format real API calls array
  const formattedCalls = Array.isArray(recentCalls) && recentCalls.length > 0 
    ? recentCalls.map(c => {
        const dateObj = new Date(c.started_at);
        return {
          id: c._id || Date.now(),
          title: c.description || 'Unknown Call',
          time: dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          date: dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
          avatar: c.client ? c.client.charAt(0).toUpperCase() : 'K',
          duration: formatSecondsToTime(c.total_duration_seconds)
        };
      })
    : [];

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
        <StatCard 
          title='Total Sessions' 
          value={totalSessions} 
          icon={<Activity size={24} />} 
          color='pink' 
        />
        <StatCard 
          title='Average Duration' 
          value={avgDuration} 
          icon={<Clock size={24} />} 
          color='blue' 
        />
        <StatCard 
          title='AI Used' 
          value={aiUsed} 
          icon={<Zap size={24} />} 
          color='green' 
        />
        <StatCard 
          title='Last Session' 
          value={lastSession} 
          icon={<Calendar size={24} />} 
          color='purple' 
        />
      </div>
      
      <RecentCalls calls={formattedCalls} />
    </div>
  );
};

export default Dashboard;
