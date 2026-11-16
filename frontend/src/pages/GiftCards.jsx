import { useState } from 'react';
import { Gift, CreditCard, Mail, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const GiftCards = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100);

  const handlePurchase = () => {
    toast.success(`Successfully purchased a $${selectedAmount} Gift Card!`);
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[70vh] relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <Gift className="w-16 h-16 text-rose-500 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Wanderlust Gift Cards
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Give the gift of travel. Our gift cards never expire and can be used to book stays and experiences worldwide.
        </p>
        <button onClick={() => setShowModal(true)} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition">
          Buy a Gift Card
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 flex items-start gap-4">
          <Mail className="w-8 h-8 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg mb-2">Digital Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Send a gift card instantly via email, or schedule it to arrive on a special date. Choose from dozens of custom designs.</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 flex items-start gap-4">
          <CreditCard className="w-8 h-8 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg mb-2">Physical Cards</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Available at major retailers nationwide. The perfect addition to any physical greeting card or gift basket.</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 md:inset-x-auto top-[15%] md:left-1/2 md:-translate-x-1/2 md:w-[500px] bg-white dark:bg-gray-950 rounded-3xl shadow-2xl z-50 p-8 border border-gray-100 dark:border-gray-800 text-center"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition">
                <X size={20} />
              </button>
              
              <Gift className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Select Amount</h2>
              <p className="text-gray-500 mb-8">Choose the value of your digital gift card.</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[50, 100, 200, 500, 1000, "Custom"].map((amt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => typeof amt === 'number' && setSelectedAmount(amt)}
                    className={`py-3 rounded-xl font-bold border-2 transition ${
                      selectedAmount === amt 
                        ? 'border-primary-600 bg-primary-50 text-primary-600' 
                        : 'border-gray-200 dark:border-gray-800 hover:border-primary-300'
                    }`}
                  >
                    {typeof amt === 'number' ? `$${amt}` : amt}
                  </button>
                ))}
              </div>
              
              <button onClick={handlePurchase} className="w-full btn-primary py-4 rounded-xl font-bold flex justify-center items-center gap-2 text-lg">
                <CheckCircle size={20} /> Checkout • ${selectedAmount}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default GiftCards;
