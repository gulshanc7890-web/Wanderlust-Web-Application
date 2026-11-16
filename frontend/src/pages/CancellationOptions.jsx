import { CalendarX, RefreshCcw, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CancellationOptions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Cancellation Options
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          We understand that plans change. Here is a guide to our flexible cancellation policies and how refunds are processed.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
          <CalendarX className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">How to Cancel</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Go to your Dashboard, navigate to "Your Bookings", select the reservation you want to cancel, and click the cancel link. You will see your exact refund amount before you confirm.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
          <RefreshCcw className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Refund Timelines</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Most refunds arrive within 5-7 business days, though some can take up to 15 days depending on your payment method and region.
          </p>
        </div>
      </div>
      
      <div className="bg-primary-50 dark:bg-gray-900/50 border border-primary-100 dark:border-gray-800 p-8 rounded-3xl flex items-start gap-4">
        <HelpCircle className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-bold mb-2">Extenuating Circumstances</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you need to cancel due to an unexpected emergency or major disruptive event (like a natural disaster), you may be eligible for a full refund under our Extenuating Circumstances Policy. Contact Support to initiate a claim.
          </p>
        </div>
      </div>
    </div>
  );
};
export default CancellationOptions;
