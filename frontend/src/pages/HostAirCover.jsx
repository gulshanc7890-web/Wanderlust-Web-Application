import { Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HostAirCover = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <Shield className="w-16 h-16 text-rose-500 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          AirCover for Hosts
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Top-to-bottom protection. Free for every Host. Only on Wanderlust.
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-8">What's Included?</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg mb-1">$3M USD Damage Protection</h4>
              <p className="text-gray-600 dark:text-gray-400">If guests damage your home or belongings and don't pay for it, we'll reimburse you.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg mb-1">$1M USD Liability Insurance</h4>
              <p className="text-gray-600 dark:text-gray-400">Protection in the rare event a guest gets hurt or their belongings are damaged or stolen.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg mb-1">Guest Identity Verification</h4>
              <p className="text-gray-600 dark:text-gray-400">Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg mb-1">Reservation Screening</h4>
              <p className="text-gray-600 dark:text-gray-400">Our proprietary technology analyzes hundreds of factors in every reservation and blocks certain bookings that show a high risk for disruptive parties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HostAirCover;
