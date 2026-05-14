import React, { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-scale-up">
        {/* Close Button (Top right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-5 border border-red-100">
          <LogOut size={24} className="text-red-500" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">Leaving already?</h3>
        <p className="text-sm text-gray-500 mb-8">
          Are you sure you want to log out of your Hintro account? 
          You will need to sign back in to view your insights and manage your AI calls.
        </p>

        {/* Actions */}
        <div className="flex items-center space-x-3 w-full">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors focus:ring-2 focus:ring-gray-200 outline-none"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-gray-900 hover:bg-black text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 outline-none"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;