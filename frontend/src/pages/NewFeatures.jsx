import { Sparkles, LayoutDashboard, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NewFeatures = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <Sparkles className="w-16 h-16 text-amber-500 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          What's New on Wanderlust
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're constantly improving to give you the best experience. Here's a look at our latest updates.
        </p>
      </motion.div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm items-center">
          <div className="w-full md:w-1/3 flex justify-center">
             <LayoutDashboard className="w-32 h-32 text-primary-500" />
          </div>
          <div className="w-full md:w-2/3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4 inline-block">For Hosts</span>
            <h3 className="text-2xl font-bold mb-4">The All-New Host Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Manage your listings, track your earnings, and update your profile from a single, beautifully redesigned interface. Now with built-in Cloudinary image uploads for your avatar.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-8 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm items-center">
          <div className="w-full md:w-1/3 flex justify-center">
             <Search className="w-32 h-32 text-rose-500" />
          </div>
          <div className="w-full md:w-2/3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-4 inline-block">For Guests</span>
            <h3 className="text-2xl font-bold mb-4">Instant Category Filtering</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Find exactly what you're looking for without refreshing the page. Click on any category like Beach, Nature, or Luxe to instantly see matching properties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewFeatures;
