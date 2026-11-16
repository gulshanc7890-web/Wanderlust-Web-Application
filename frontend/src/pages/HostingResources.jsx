import { useState } from 'react';
import { BookOpen, Video, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HostingResources = () => {
  const [activeModal, setActiveModal] = useState(null);

  const renderModalContent = () => {
    switch (activeModal) {
      case 'getting-started':
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Getting Started Guide</h2>
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" alt="Home interior" className="w-full h-64 object-cover rounded-2xl mb-6" />
            <h3 className="text-xl font-bold">1. Take Great Photos</h3>
            <p className="text-gray-600 dark:text-gray-400">High-quality photos are the most important part of your listing. Ensure your space is clean and well-lit. Natural light works best. Try to capture wide angles to give guests a sense of the space.</p>
            
            <h3 className="text-xl font-bold pt-4">2. Write a Catchy Title</h3>
            <p className="text-gray-600 dark:text-gray-400">Your title should highlight what makes your space unique. Include key amenities like "Pool", "Beachfront", or "City Center".</p>
            
            <h3 className="text-xl font-bold pt-4">3. Set a Competitive Price</h3>
            <p className="text-gray-600 dark:text-gray-400">Research similar listings in your area. When starting out, it's often helpful to set your price slightly lower than the average to get your first few reviews quickly.</p>
          </div>
        );
      case 'communication':
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Mastering Communication</h2>
            <div className="w-full mb-6 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-black">
              <video 
                controls 
                autoPlay
                className="w-full aspect-video"
                poster="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1000"
              >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h3 className="text-xl font-bold">Fast Responses Matter</h3>
            <p className="text-gray-600 dark:text-gray-400">Aim to respond to all inquiries within 1 hour. Fast response times not only secure bookings but also improve your ranking in search results.</p>
            
            <h3 className="text-xl font-bold pt-4">Be Proactive</h3>
            <p className="text-gray-600 dark:text-gray-400">Send a welcome message immediately after a booking is confirmed, and a check-in guide 24 hours before they arrive. Check in on them on their second day to ensure everything is perfect.</p>
          </div>
        );
      case 'guidebooks':
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Creating Local Guidebooks</h2>
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" alt="Map on table" className="w-full h-64 object-cover rounded-2xl mb-6" />
            <h3 className="text-xl font-bold">Why create a guidebook?</h3>
            <p className="text-gray-600 dark:text-gray-400">Guests love local recommendations. A curated list of your favorite restaurants, cafes, and hidden gems makes their stay memorable and increases your chances of a 5-star review.</p>
            
            <h3 className="text-xl font-bold pt-4">What to include</h3>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Your absolute favorite coffee shop.</li>
              <li>The best dinner spot for a special occasion.</li>
              <li>Local parks, hikes, or attractions that aren't in standard tourist guides.</li>
              <li>Essential services like the nearest grocery store, pharmacy, and hospital.</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-[70vh] relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Hosting Resources
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          Guides, tips, and best practices to help you succeed as a host and provide unforgettable experiences.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div onClick={() => setActiveModal('getting-started')} className="card p-6 border border-gray-200 dark:border-gray-800 rounded-3xl hover:shadow-xl transition cursor-pointer group bg-white dark:bg-gray-900">
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition">
            <BookOpen size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition">Getting Started Guide</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Learn the basics of creating a listing, taking great photos, and setting your price.</p>
          <span className="text-primary-600 font-bold text-sm flex items-center gap-2">Read Article <span className="group-hover:translate-x-2 transition-transform">&rarr;</span></span>
        </div>
        
        <div onClick={() => setActiveModal('communication')} className="card p-6 border border-gray-200 dark:border-gray-800 rounded-3xl hover:shadow-xl transition cursor-pointer group bg-white dark:bg-gray-900">
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition">
            <Video size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition">Mastering Communication</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Watch video tutorials on how to effectively communicate with guests from booking to checkout.</p>
          <span className="text-primary-600 font-bold text-sm flex items-center gap-2">Watch Video <span className="group-hover:translate-x-2 transition-transform">&rarr;</span></span>
        </div>

        <div onClick={() => setActiveModal('guidebooks')} className="card p-6 border border-gray-200 dark:border-gray-800 rounded-3xl hover:shadow-xl transition cursor-pointer group bg-white dark:bg-gray-900">
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition">
            <MapPin size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition">Local Guidebooks</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">How to create a digital guidebook to share your favorite local spots with your guests.</p>
          <span className="text-primary-600 font-bold text-sm flex items-center gap-2">Read Article <span className="group-hover:translate-x-2 transition-transform">&rarr;</span></span>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 md:inset-x-auto top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-[600px] max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-950 rounded-3xl shadow-2xl z-50 p-8 border border-gray-100 dark:border-gray-800"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
              >
                <X size={20} />
              </button>
              
              <div className="mt-2">
                {renderModalContent()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default HostingResources;
