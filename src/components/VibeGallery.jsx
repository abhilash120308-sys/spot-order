import React from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { GALLERY_IMAGES } from '../data/galleryData';

export const VibeGallery = () => {
  return (
    <section className="py-20 bg-charcoal-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-fiery/10 border border-fiery/30 text-fiery text-xs font-bold tracking-wider uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>The Raja's Foods Vibe</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              Aesthetic Moments & Sizzling Flames
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              Immerse yourself in our moody obsidian-charcoal ambiance, live open-flame kitchens, and masterfully plated delicacies.
            </p>
          </div>

          <a
            href="https://www.instagram.com/_arun_471"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-charcoal-800 hover:bg-charcoal-700 text-gold hover:text-white border border-gold/30 hover:border-gold text-xs font-bold transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @_arun_471</span>
          </a>
        </div>

        {/* Dynamic Image Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {GALLERY_IMAGES.map((item, index) => (
            <div
              key={item.id}
              className={`relative rounded-3xl overflow-hidden group glass-card border border-white/10 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] font-bold text-gold uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold font-display mt-0.5">
                    {item.title}
                  </h4>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
