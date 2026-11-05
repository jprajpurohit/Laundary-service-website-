import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle, 
  MessageSquare, 
  ThumbsUp, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { REVIEWS_DATA } from '../data/laundryData';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [showAddReview, setShowAddReview] = useState(false);

  // New review form
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newService, setNewService] = useState('Daily Wash & Fold');

  const filtered = filter === 'all' 
    ? reviewsList 
    : reviewsList.filter(r => r.service.toLowerCase().includes(filter.toLowerCase()));

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: 'Local Resident',
      rating: 5,
      service: newService,
      comment: newComment,
      date: 'Just now',
      verified: true,
      turnaround: '24h Express'
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewAuthor('');
    setNewComment('');
    setShowAddReview(false);
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Verified Experiences
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Loved by 12,000+ Busy Households & Professionals
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Read real feedback from our community. Every order is inspected, hand-finished, and backed by our full care guarantee.
          </p>
        </div>

        {/* Rating KPI Banner */}
        <div className="mt-10 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="text-4xl font-black text-slate-900 tabular-nums">4.9</div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Based on 1,420+ verified doorstep pickups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddReview(!showAddReview)}
              className="px-4 py-2.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Write Review Form Drawer */}
        {showAddReview && (
          <form 
            onSubmit={handleAddReview}
            className="mt-6 max-w-xl mx-auto bg-white p-6 rounded-2xl border border-sky-200 shadow-md space-y-3"
          >
            <h4 className="font-bold text-slate-900 text-sm">Share Your Laundry Experience</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Patel"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Service Cleaned</label>
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="Daily Wash & Fold">Daily Wash & Fold</option>
                  <option value="Eco-Dry Cleaning">Eco-Dry Cleaning</option>
                  <option value="Steam Press & Ironing">Steam Press & Ironing</option>
                  <option value="Duvet & Bedding Spa">Duvet & Bedding Spa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Review</label>
              <textarea
                required
                rows={3}
                placeholder="How was the turnaround time, fabric feel, and courier service?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddReview(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg"
              >
                Post Review
              </button>
            </div>
          </form>
        )}

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center justify-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'dry cleaning', label: 'Dry Cleaning' },
            { id: 'wash & fold', label: 'Wash & Fold' },
            { id: 'steam press', label: 'Steam Press' },
            { id: 'bedding', label: 'Bedding Spa' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === btn.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
            >
              <div>
                {/* Stars & Service */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    {rev.turnaround}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{rev.author}</h5>
                  <p className="text-[11px] text-slate-400">{rev.location}</p>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
