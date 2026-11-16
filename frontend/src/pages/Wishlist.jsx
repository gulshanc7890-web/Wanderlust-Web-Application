import { useState, useEffect } from 'react';
import API from '../api/axios';
import ListingCard from '../components/ListingCard';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await API.get('/wishlist');
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <Heart className="text-primary-600 fill-primary-600" />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl aspect-square"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <ListingCard key={item.id} listing={item.listing} />
          ))}
        </div>
      )}

      {!loading && wishlist.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">No saved places yet</h2>
          <p className="text-gray-500 mb-8">As you search, click the heart icon to save your favorite places.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            onClick={() => window.location.href = '/listings'}
          >
            Start exploring
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
