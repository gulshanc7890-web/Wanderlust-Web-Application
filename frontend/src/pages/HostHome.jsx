import { Key, DollarSign, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const HostHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartHosting = () => {
    if (user) {
      toast.success("Welcome to your dashboard! Let's set up your listing.");
      navigate('/dashboard');
    } else {
      toast.error("Please login or create an account to start hosting.");
      navigate('/login');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-primary-600 to-rose-600 rounded-3xl p-12 text-white text-center shadow-2xl mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Open your door to hosting</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
          Turn your extra space into extra income. It's easy, secure, and you are in full control of your availability, prices, and rules.
        </p>
        <button onClick={handleStartHosting} className="bg-white text-primary-600 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform">
          Start Hosting Today
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <DollarSign className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Earn Money</h3>
          <p className="text-gray-600 dark:text-gray-400">Pay off your mortgage, fund your next trip, or save for the future by hosting guests from around the world.</p>
        </div>
        <div className="text-center p-6">
          <Key className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Full Control</h3>
          <p className="text-gray-600 dark:text-gray-400">You decide when to host, how much to charge, and who can stay. Our tools make managing your calendar simple.</p>
        </div>
        <div className="text-center p-6">
          <Home className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Host with Confidence</h3>
          <p className="text-gray-600 dark:text-gray-400">With AirCover for Hosts, you're protected with $3M in damage protection and $1M in liability insurance, always free.</p>
        </div>
      </div>
    </div>
  );
};
export default HostHome;
