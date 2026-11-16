import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, FileText, Shield, Info } from 'lucide-react';

const genericFaqs = [
  { question: "What is this page about?", answer: "This section provides detailed information about our policies, features, and guidelines. We are constantly updating this page to give you the most accurate details." },
  { question: "How can I get more help?", answer: "If you cannot find what you are looking for here, please visit our Help Center or contact our 24/7 customer support team via the dashboard." },
  { question: "Are these policies globally applicable?", answer: "Yes, our platform standards apply to all users globally unless specified otherwise by local laws and regulations." }
];

const PlaceholderPage = ({ title, description }) => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 border-b border-gray-200 dark:border-gray-800 pb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          {description || "Discover more about our services, policies, and what makes Wanderlust the perfect companion for your journey."}
        </p>
      </motion.div>

      {/* Two Column Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Main Content Area */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="md:col-span-2 space-y-10"
        >
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Info className="text-primary-600" /> Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              At Wanderlust, we believe in transparency, safety, and providing the best possible experience for our community of hosts and guests. This page is dedicated to ensuring you have all the necessary information at your fingertips.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Please review the following sections carefully. If you have any further questions regarding the <strong>{title}</strong>, do not hesitate to reach out to our dedicated support channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="text-primary-600" /> Key Guidelines
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                  <span>Always maintain respectful and clear communication within the community.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                  <span>Adhere to our standard safety and inclusion protocols at all times.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                  <span>Ensure your account details are up-to-date for seamless processing.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="text-primary-600" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {genericFaqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-950">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold focus:outline-none"
                  >
                    {faq.question}
                    {openFaq === index ? <ChevronUp size={20} className="text-primary-600" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </motion.div>

        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.3 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="bg-primary-50 dark:bg-gray-900 rounded-3xl p-6 border border-primary-100 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-2">Need immediate assistance?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Our global support team is available 24/7 to help you resolve any issues.</p>
            <button onClick={() => window.location.href='/help'} className="w-full btn-primary py-3 rounded-xl font-bold shadow-md">
              Visit Help Center
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-950 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold mb-4">Related Topics</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:underline">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:underline">Privacy Policy</a></li>
              <li><a href="/anti-discrimination" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:underline">Anti-discrimination Policy</a></li>
              <li><a href="/aircover" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:underline">AirCover Protection</a></li>
            </ul>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PlaceholderPage;
