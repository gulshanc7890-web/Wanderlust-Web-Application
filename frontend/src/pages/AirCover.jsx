import { ShieldCheck, HeartPulse, PhoneCall, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AirCover = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          AirCover for Guests
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          The most comprehensive protection in travel. Included for free with every booking.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/50">
          <ShieldCheck className="w-12 h-12 text-rose-500 mb-6" />
          <h3 className="text-xl font-bold mb-3">Booking Protection Guarantee</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            In the unlikely event a Host needs to cancel your booking within 30 days of check-in, we'll find you a similar or better home, or we'll refund you.
          </p>
        </div>
        <div className="bg-primary-50 dark:bg-primary-900/10 p-8 rounded-3xl border border-primary-100 dark:border-primary-900/50">
          <HeartPulse className="w-12 h-12 text-primary-500 mb-6" />
          <h3 className="text-xl font-bold mb-3">Check-in Guarantee</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            If you can't check into your home and the Host cannot resolve the issue, we'll find you a similar or better home for the length of your original stay, or we'll refund you.
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-3xl border border-green-100 dark:border-green-900/50">
          <ShieldAlert className="w-12 h-12 text-green-500 mb-6" />
          <h3 className="text-xl font-bold mb-3">Get-What-You-Booked Guarantee</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            If at any time during your stay you find your listing isn't exactly as advertised, you'll have three days to report it. We'll find you a similar or better home, or we'll refund you.
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-3xl border border-amber-100 dark:border-amber-900/50">
          <PhoneCall className="w-12 h-12 text-amber-500 mb-6" />
          <h3 className="text-xl font-bold mb-3">24-hour Safety Line</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            If you ever feel unsafe, you'll get priority access to specially-trained safety agents, day or night.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AirCover;
