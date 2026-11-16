import { Briefcase, Globe, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Careers = () => {
  const handleScrollToRoles = () => {
    document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary-600 to-rose-600 bg-clip-text text-transparent">
          Work from anywhere.
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Join our mission to create a world where anyone can belong anywhere. Discover career opportunities at Wanderlust.
        </p>
        <button onClick={handleScrollToRoles} className="btn-primary py-4 px-10 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition">View Open Roles</button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <Globe className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Live and Work Anywhere</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Our employees have the flexibility to live and work from anywhere in their home country.</p>
        </div>
        <div className="text-center p-6">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Comprehensive Health</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">We provide top-tier medical, dental, and vision coverage for you and your dependents.</p>
        </div>
        <div className="text-center p-6">
          <Zap className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Quarterly Travel Credit</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Receive a generous travel stipend every quarter to explore the world using Wanderlust.</p>
        </div>
      </div>
      
      <div id="open-roles" className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-200 dark:border-gray-800">
        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No open roles currently</h2>
        <p className="text-gray-500">We are not actively hiring right now, but check back soon or follow us on LinkedIn for updates.</p>
      </div>
    </div>
  );
};
export default Careers;
