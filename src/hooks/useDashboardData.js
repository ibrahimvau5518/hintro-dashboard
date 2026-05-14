import { useState, useEffect } from 'react';
import { dashboardService } from '../services/api';

export const useDashboardData = () => {
  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentCalls, setRecentCalls] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [profileRes, dashboardRes, statsRes, callsRes] = await Promise.all([
        dashboardService.getProfile(),
        dashboardService.getDashboard(),
        dashboardService.getCallStats(),
        dashboardService.getRecentCalls()
      ]);

      setProfile(profileRes.data);
      setDashboard(dashboardRes.data);
      setStats(statsRes.data);
      setRecentCalls(callsRes.data?.callSessions || []);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching dashboard data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return { profile, dashboard, stats, recentCalls, isLoading, error, refetch: fetchAllData };
};
