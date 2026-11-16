import { FileBarChart, Presentation, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Investors = () => {
  const handleDownload = (type) => {
    toast.success(`Starting secure download for ${type}...`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Investor Relations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Financial information, reports, and corporate governance.
          </p>
        </div>
        <div className="bg-primary-50 dark:bg-primary-900/20 px-6 py-4 rounded-2xl text-center border border-primary-100 dark:border-primary-900/50">
          <span className="block text-sm font-bold text-primary-600 mb-1">NASDAQ: WNDR</span>
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">$142.50</span>
          <span className="text-green-500 text-sm font-bold ml-2">+2.4%</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div onClick={() => handleDownload('Q1 2026 Earnings Report')} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition group cursor-pointer">
          <FileBarChart className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition">Q1 2026 Earnings Report</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Download our latest quarterly financial results, press release, and shareholder letter.</p>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 dark:bg-gray-800 px-4 py-2 rounded-lg">
            <Download size={16} /> Download PDF
          </span>
        </div>
        <div onClick={() => handleDownload('Investor Presentation Slides')} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition group cursor-pointer">
          <Presentation className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition">Investor Presentation</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">View our corporate overview and long-term strategic vision presented at our annual summit.</p>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 dark:bg-gray-800 px-4 py-2 rounded-lg">
            <Download size={16} /> View Slides
          </span>
        </div>
      </div>
    </div>
  );
};
export default Investors;
