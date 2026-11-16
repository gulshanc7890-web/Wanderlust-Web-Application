import { Scale, HeartHandshake, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ResponsibleHosting = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Hosting Responsibly
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          Being a host comes with responsibilities to your guests, your neighbors, and your local government. Here is what you need to know.
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="flex gap-6 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
          <Scale className="w-8 h-8 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Know Your Local Laws</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Many cities have rules regarding short-term rentals. This may include obtaining a permit, license, or registering your listing. Please consult your local government website to ensure you comply with zoning and tax regulations.
            </p>
          </div>
        </div>
        <div className="flex gap-6 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
          <AlertCircle className="w-8 h-8 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Safety Standards</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your property must be safe for guests. Ensure you have working smoke and carbon monoxide detectors, a visible fire extinguisher, and clearly marked emergency exit routes.
            </p>
          </div>
        </div>
        <div className="flex gap-6 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
          <HeartHandshake className="w-8 h-8 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Neighborhood Etiquette</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Establish clear house rules regarding noise, parking, and parties to respect your neighbors. Encourage guests to be mindful of the local community during their stay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResponsibleHosting;
