import { Accessibility, Settings, HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';

const DisabilitySupport = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <Accessibility className="w-16 h-16 text-primary-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Disability Support
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We are committed to making travel accessible for everyone. Discover resources and features tailored to your needs.
        </p>
      </motion.div>

      <div className="space-y-8">
        <div className="flex gap-6 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm">
          <Settings className="w-10 h-10 text-primary-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Accessibility Features & Filters</h3>
            <p className="text-gray-600 dark:text-gray-400">
              When searching for a place to stay, you can use our accessibility filters to find homes that meet your specific needs, such as step-free access, wide doorways, or accessible bathrooms.
            </p>
          </div>
        </div>
        <div className="flex gap-6 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm">
          <HandHeart className="w-10 h-10 text-primary-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Service Animals</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hosts on our platform are required to accept service animals, regardless of whether their listing generally allows pets. Exceptions only apply if the host has an approved health or safety exemption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DisabilitySupport;
