import React from 'react';
import { MoreVertical, Phone } from 'lucide-react';

const RecentCalls = ({ calls = [] }) => {
  if (!calls || calls.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center h-80 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
          <Phone className="text-gray-400" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent calls</h3>
        <p className="text-gray-500 mb-6 max-w-sm">Get started by making your first AI-assisted call. They will appear here once finished.</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm">
          Start a Call
        </button>
      </div>
    );
  }

  // Create a grouped dictionary from the flat array of calls
  const groupedCalls = calls.reduce((acc, call) => {
    if (!acc[call.date]) acc[call.date] = [];
    acc[call.date].push(call);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Recent Calls</h2>
        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
      </div>
      <div className="p-0">
        {Object.entries(groupedCalls).map(([date, dateCalls]) => (
          <div key={date}>
            <div className="px-6 py-2.5 bg-gray-50/80 border-y border-gray-100 first:border-t-0 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {date}
            </div>
            <div className="divide-y divide-gray-100">
              {dateCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg shrink-0">
                      {call.avatar || 'K'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{call.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{call.time}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100">
                    <MoreVertical size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCalls;