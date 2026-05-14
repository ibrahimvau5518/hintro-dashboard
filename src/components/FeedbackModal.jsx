import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to local storage
    const newFeedback = {
      id: Date.now(),
      rating,
      comment: feedback,
      date: new Date().toLocaleDateString(),
      timestamp: new Date().getTime()
    };
    
    const existingHistory = JSON.parse(localStorage.getItem('hintro_feedback_history') || '[]');
    localStorage.setItem('hintro_feedback_history', JSON.stringify([newFeedback, ...existingHistory]));
    
    setSubmitted(true);
    
    // Auto close after 2 seconds
    setTimeout(() => {
      onClose();
      // Reset state for next time
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setFeedback('');
      }, 300);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-scale-up z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-500">Your feedback has been received and saved.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Share your thoughts</h3>
            <p className="text-sm text-gray-500 mb-6">How is your experience with Hintro so far?</p>

            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      size={32} 
                      className={`${
                        (hoverRating || rating) >= star 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'fill-transparent text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>

              {/* Text Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional feedback
                </label>
                <textarea
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you love or what could be improved..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-28 transition-all"
                ></textarea>
              </div>

              {/* Actions */}
              <button 
                type="submit"
                disabled={rating === 0 || !feedback.trim()}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Submit Feedback</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;