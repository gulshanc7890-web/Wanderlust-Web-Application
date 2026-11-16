import { motion } from 'framer-motion';
import { Shield, Heart, Users, CheckCircle, AlertTriangle } from 'lucide-react';

const AntiDiscrimination = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Anti-Discrimination Policy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Our commitment to creating a community built on inclusion, respect, and zero tolerance for discrimination.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="space-y-12"
      >
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Users className="text-primary-600" /> Our Core Principle
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
            At Wanderlust, we believe that travel should be accessible to everyone. We are building a global community where anyone can belong anywhere. To achieve this, we expect all hosts and guests to treat one another with respect and without prejudice.
          </p>
          <div className="bg-primary-50 dark:bg-gray-950 rounded-2xl p-6 border-l-4 border-primary-600">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              "We prohibit discrimination based on race, color, ethnicity, national origin, religion, sexual orientation, gender identity, or marital status."
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="text-green-500" /> What We Expect
            </h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span>Welcome all guests regardless of their background or identity.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span>Provide equal accommodations and services to all users.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span>Make reasonable accommodations for guests with disabilities.</span>
              </li>
            </ul>
          </section>

          <section className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="text-rose-500" /> Unacceptable Behavior
            </h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                <span>Declining a booking based on the guest's race, religion, or gender.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                <span>Imposing different terms or conditions based on protected characteristics.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                <span>Posting listings or making statements that discourage specific groups.</span>
              </li>
            </ul>
          </section>
        </div>

        <section className="text-center bg-primary-600 text-white rounded-3xl p-10 shadow-lg">
          <Shield className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Report Discrimination</h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            If you experience or witness any behavior that violates this policy, please report it immediately. Our specialized safety team will investigate and take strict action, including account suspension.
          </p>
          <a 
            href="mailto:safety@wanderlust.com?subject=Reporting%20Discrimination%20Incident" 
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
          >
            Contact Safety Team
          </a>
        </section>

      </motion.div>
    </div>
  );
};

export default AntiDiscrimination;
