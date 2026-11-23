import React from 'react';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';
import { REVIEWS } from '../data/reviewsData';

export const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20 bg-charcoal-900 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-wider uppercase mb-3">
            <Heart className="w-3.5 h-3.5 fill-gold" />
            <span>Foodie Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            Loved by 10,000+ Cravings
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Hear what our regulars and verified food lovers have to say about dining and ordering from Raja's Foods.
          </p>
        </div>

        {/* 3 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 hover:border-fiery/40 transition-all duration-300 flex flex-col justify-between hover:shadow-card-hover group relative"
            >
              {/* Top Quote Icon */}
              <div className="absolute top-6 right-6 text-white/10 group-hover:text-fiery/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                  <span className="text-xs font-bold text-gray-400 ml-2">5.0</span>
                </div>

                {/* Testimonial Text */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  "{review.comment}"
                </p>

                {/* Dish Tried Badge */}
                <div className="mt-4 inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-charcoal-950 text-gold text-[11px] font-semibold border border-white/5">
                  <span>Favorite Dish:</span>
                  <span className="text-white font-bold">{review.dishTried}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center space-x-3.5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-fiery/40 shrink-0"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-sm font-bold text-white font-display">{review.name}</h4>
                    {review.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-gray-400">{review.role} • {review.date}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
