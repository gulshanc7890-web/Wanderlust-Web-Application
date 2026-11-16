import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const faqs = [
  { question: 'How do I cancel my booking?', answer: 'To cancel your booking, go to your Dashboard, navigate to "Your Bookings", and click on the "Cancel Booking" link next to the property.' },
  { question: 'When will I be charged?', answer: 'You are charged immediately upon confirming your reservation. We use a secure payment gateway for all transactions.' },
  { question: 'How can I contact the host?', answer: 'Once your booking is confirmed, you will receive the host\'s contact details via email. You can also message them directly through your dashboard.' },
  { question: 'What is the refund policy?', answer: 'Refunds depend on the host\'s cancellation policy. If cancelled within the free cancellation period, you will receive a full refund within 5-7 business days.' },
  { question: 'How do I become a host?', answer: 'Click on the "List your home" button in the dashboard or footer to start setting up your first listing and earning extra income.' },
  { question: 'Are pets allowed?', answer: 'Pet policies vary by property. Always check the property\'s description or contact the host before booking to confirm if pets are welcome.' },
  { question: 'How do I reset my password?', answer: 'You can change your password by navigating to the "Account Settings" tab in your Dashboard and entering a new secure password.' },
];

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">Hi, how can we help?</h1>
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for answers, booking help, or topics..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 dark:border-gray-800 shadow-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none dark:bg-gray-900 transition text-lg"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        {filteredFaqs.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-900/50 p-12 rounded-3xl text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
            <Search className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No results found for "{search}".</p>
            <p className="text-sm mt-2 text-gray-400">Try searching for keywords like "booking" or "cancel".</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 transition-all hover:shadow-md">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold text-lg focus:outline-none"
              >
                {faq.question}
                <div className={`p-2 rounded-full transition-colors ${openFaq === index ? 'bg-primary-50 text-primary-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-500'}`}>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-5">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        )}
      </motion.div>
      
      <div className="mt-16 bg-primary-50 dark:bg-gray-900 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-primary-100 dark:border-gray-800">
        <div>
          <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Our support team is available 24/7 to assist you.</p>
          <div className="flex flex-col gap-2 font-bold text-gray-800 dark:text-gray-200">
            <p>📞 Toll-free: <a href="tel:+18005550199" className="hover:text-primary-600 hover:underline">+1 (800) 555-0199</a></p>
            <p>✉️ Email: <a href="mailto:support@wanderlust.com" className="hover:text-primary-600 hover:underline">support@wanderlust.com</a></p>
          </div>
        </div>
        <a href="tel:+18005550199" className="btn-primary py-3 px-8 rounded-xl font-bold shadow-lg whitespace-nowrap text-center">Call Support</a>
      </div>
    </div>
  );
};

export default HelpCenter;
