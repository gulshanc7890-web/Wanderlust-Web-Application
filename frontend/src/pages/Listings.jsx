import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import ListingCard from '../components/ListingCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    country: searchParams.get('country') || '',
    checkIn: searchParams.get('checkIn') || '',
    guests: searchParams.get('guests') || ''
  });
  
  const [showFilters, setShowFilters] = useState(false);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.country) params.append('country', filters.country);
      if (filters.checkIn) params.append('checkIn', filters.checkIn);
      if (filters.guests) params.append('guests', filters.guests);
      
      const { data } = await API.get(`/listings?${params.toString()}`);
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentParams = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      country: searchParams.get('country') || '',
      checkIn: searchParams.get('checkIn') || '',
      guests: searchParams.get('guests') || ''
    };

    let hasDiff = false;
    for (const key in currentParams) {
      if (currentParams[key] !== filters[key]) {
        hasDiff = true;
        break;
      }
    }
    
    if (hasDiff) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilters(currentParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    // We want a slight debounce before updating URL params and fetching when typing
    const timeoutId = setTimeout(() => {
      fetchListings();
      
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      setSearchParams(params);
    }, 500);
    
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      country: '',
      checkIn: '',
      guests: ''
    });
  };

  const categories = ['Trending', 'Iconic Cities', 'Beach', 'Nature', 'Luxe', 'History', 'Adventure', 'Spirituality', 'Skiing', 'Eco', 'Culture', 'Vineyards', 'Design'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <h1 className="text-3xl font-bold">Explore Listings</h1>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <input 
              type="text" 
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search destinations..." 
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 border rounded-full transition ${showFilters ? 'bg-primary-50 border-primary-500 text-primary-600 dark:bg-primary-900/30' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <Filter size={20} />
          </button>
        </div>
      </motion.div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">More Filters</h3>
                <button onClick={clearFilters} className="text-sm text-primary-600 font-semibold hover:underline">Clear all</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select 
                    name="category" 
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="">Any Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                  <input 
                    type="text" 
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                    placeholder="E.g. India"
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range (₹)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <span className="text-gray-400">-</span>
                    <input 
                      type="number" 
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check In</label>
                  <input 
                    type="date" 
                    name="checkIn"
                    value={filters.checkIn}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guests</label>
                  <input 
                    type="number" 
                    name="guests"
                    min="1"
                    value={filters.guests}
                    onChange={handleFilterChange}
                    placeholder="E.g. 2"
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl aspect-square"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {!loading && listings.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 mt-4">
          <p className="text-gray-500 text-lg mb-4">No listings found matching your criteria.</p>
          <button 
            onClick={clearFilters}
            className="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;

