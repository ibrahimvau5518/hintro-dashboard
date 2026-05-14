import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getUserId = () => localStorage.getItem('hintro_user_id') || 'u2';

api.interceptors.request.use((config) => {
  config.headers['x-user-id'] = getUserId();
  return config;
});

// Custom Axios Adapter to mock the backend completely offline according to the provided API documentation
api.defaults.adapter = async function (config) {
  return new Promise((resolve) => {
    const userId = config.headers['x-user-id'] || 'u2';
    
    setTimeout(() => {
      if (config.url === '/api/auth/profile') {
        resolve({ data: { id: userId, firstName: 'Alex', lastName: userId === 'u1' ? '(Empty)' : '(Data)' }, status: 200 });
      } else if (config.url === '/api/auth/dashboard') {
        if (userId === 'u1') resolve({ data: { subscription: null, usage: { kb_files: { percentage: 0 } } }, status: 200 });
        else resolve({ data: { subscription: { plan: 'professional' }, usage: { kb_files: { percentage: 34 } } }, status: 200 });
      } else if (config.url === '/api/call-sessions/stats') {
        if (userId === 'u1') resolve({ data: { totalSessions: 0, averageDuration: 0, totalAIInteractions: 0, lastSession: [] }, status: 200 });
        else resolve({ data: { totalSessions: 126, averageDuration: 2211, totalAIInteractions: 16, lastSession: ['2026-05-09T14:15:59.550Z', '2026-05-07T05:39:52.481Z'] }, status: 200 });
      } else if (config.url.startsWith('/api/call-sessions')) {
        if (userId === 'u1') resolve({ data: { callSessions: [], pagination: {} }, status: 200 });
        else resolve({ data: { callSessions: [
          { _id: 'cs1', client: 'Acme Corp', description: 'Product demo', started_at: '2026-04-29T03:38:35.444Z', total_duration_seconds: 3871 },
          { _id: 'cs2', client: 'TechStart', description: 'Discovery call', started_at: '2026-04-28T09:12:15.000Z', total_duration_seconds: 1420 },
          { _id: 'cs3', client: 'BigCorp', description: 'Weekly Sync', started_at: '2026-04-27T14:05:00.000Z', total_duration_seconds: 900 }
        ], pagination: {} }, status: 200 });
      }
    }, 800); // 800ms loading delay mimic
  });
};

export const dashboardService = {
  getProfile: () => api.get('/api/auth/profile'),
  getDashboard: () => api.get('/api/auth/dashboard'),
  getCallStats: () => api.get('/api/call-sessions/stats'),
  getRecentCalls: () => api.get('/api/call-sessions?limit=10'),
};

export default api;
