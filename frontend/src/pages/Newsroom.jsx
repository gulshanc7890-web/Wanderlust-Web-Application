import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsroom = () => {
  const [activeArticle, setActiveArticle] = useState(null);

  const renderArticleContent = () => {
    if (activeArticle === 'summer') {
      return (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold mb-2">Introducing the Summer 2026 Release</h2>
          <p className="text-gray-500 text-sm mb-6">Published on May 15, 2026</p>
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000" alt="Summer house" className="w-full h-64 object-cover rounded-2xl mb-6" />
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Today, we're introducing the Summer 2026 Release, featuring over 50 exciting new features and upgrades across our entire platform. We've completely redesigned the Host Dashboard, making it faster and more intuitive to manage your properties.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            For guests, we've implemented instant category filtering and a brand new AI-powered trip planner that helps you find the perfect itinerary in seconds. We believe these tools will fundamentally change how people experience travel.
          </p>
        </div>
      );
    } else if (activeArticle === 'sustainable') {
      return (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold mb-2">Our Commitment to Sustainable Travel</h2>
          <p className="text-gray-500 text-sm mb-6">Published on April 22, 2026</p>
          <img src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1000" alt="Nature" className="w-full h-64 object-cover rounded-2xl mb-6" />
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            At Wanderlust, we recognize our responsibility to protect the planet. That's why we are committing $100M over the next five years to help our hosts transition to renewable energy and sustainable practices.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Starting today, homes that meet our rigorous Eco-Friendly standards will receive a special badge, making it easier for environmentally conscious travelers to book responsibly.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-[70vh] relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Wanderlust Newsroom
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          Get the latest announcements, updates, and stories from our community.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div onClick={() => setActiveArticle('summer')} className="group cursor-pointer">
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl mb-4 overflow-hidden relative">
             <div className="absolute inset-0 bg-primary-600/20 group-hover:bg-primary-600/0 transition-colors z-10"></div>
             <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000" alt="Summer" className="w-full h-full object-cover" />
          </div>
          <span className="text-primary-600 font-bold text-sm mb-2 block">Press Release</span>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition">Introducing the Summer 2026 Release</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Discover over 50 new features designed to make hosting and traveling easier than ever before.</p>
          <span className="flex items-center gap-2 font-bold text-sm text-primary-600">Read full story <span className="group-hover:translate-x-2 transition-transform"><ArrowRight size={16} /></span></span>
        </div>

        <div onClick={() => setActiveArticle('sustainable')} className="group cursor-pointer">
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl mb-4 overflow-hidden relative">
             <div className="absolute inset-0 bg-primary-600/20 group-hover:bg-primary-600/0 transition-colors z-10"></div>
             <img src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1000" alt="Sustainable" className="w-full h-full object-cover" />
          </div>
          <span className="text-primary-600 font-bold text-sm mb-2 block">Company Update</span>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition">Our Commitment to Sustainable Travel</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">How we are working with hosts to reduce the carbon footprint of short-term rentals globally.</p>
          <span className="flex items-center gap-2 font-bold text-sm text-primary-600">Read full story <span className="group-hover:translate-x-2 transition-transform"><ArrowRight size={16} /></span></span>
        </div>
      </div>

      <AnimatePresence>
        {activeArticle && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 md:inset-x-auto top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-[700px] max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-950 rounded-3xl shadow-2xl z-50 p-8 border border-gray-100 dark:border-gray-800"
            >
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
              >
                <X size={20} />
              </button>
              <div className="mt-2">
                {renderArticleContent()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Newsroom;
