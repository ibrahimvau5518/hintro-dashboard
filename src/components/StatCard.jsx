import React from 'react';

const colorMap = {
  pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
};

const StatCard = ({ title, value, icon, color = 'blue' }) => {
  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4 transition-all hover:shadow-md">
      <div className={`p-3 rounded-xl ${theme.bg} ${theme.text} shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
