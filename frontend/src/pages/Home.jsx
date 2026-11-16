import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search, Flame, Building2, Umbrella, TreePine, Gem, Landmark, Compass, SunDim, Snowflake, Leaf, Palette, Wine, PenTool } from 'lucide-react';

const categoryIcons = {
  'Trending': Flame,
  'Iconic Cities': Building2,
  'Beach': Umbrella,
  'Nature': TreePine,
  'Luxe': Gem,
  'History': Landmark,
  'Adventure': Compass,
  'Spirituality': SunDim,
  'Skiing': Snowflake,
  'Eco': Leaf,
  'Culture': Palette,
  'Vineyards': Wine,
  'Design': PenTool
};
import { Link } from 'react-router-dom';
import API from '../api/axios';
import ListingCard from '../components/ListingCard';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState('');

  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.append('search', searchLocation);
    if (checkIn) params.append('checkIn', checkIn);
    if (guests) params.append('guests', guests);
    return `/listings?${params.toString()}`;
  };

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        setLoading(true);
        const url = activeCategory ? `/listings?category=${encodeURIComponent(activeCategory)}` : '/listings';
        const { data } = await API.get(url);
        setListings(data.slice(0, 16)); // Show more featured listings
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedListings();
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Find your next <span className="text-primary-400">adventure</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-2xl mb-10 opacity-90 font-medium"
          >
            Discover unique stays and unforgettable experiences around the world.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-full shadow-2xl p-2 flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-6 py-3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
              <MapPin className="text-primary-600" />
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</p>
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  className="bg-transparent border-none focus:ring-0 p-0 text-sm font-semibold text-gray-900 dark:text-gray-100 w-full placeholder:text-gray-400"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 px-6 py-3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
              <Calendar className="text-primary-600" />
              <div className="text-left w-full">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Check In</p>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 p-0 text-sm font-semibold text-gray-900 dark:text-gray-100 w-full cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 px-6 py-3">
              <Users className="text-primary-600" />
              <div className="text-left w-full">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Guests</p>
                <input 
                  type="number" 
                  min="1"
                  placeholder="Add guests" 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 p-0 text-sm font-semibold text-gray-900 dark:text-gray-100 w-full placeholder:text-gray-400"
                />
              </div>
            </div>
            <Link to={buildSearchUrl()} className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-8 py-4 flex items-center justify-center gap-2 font-bold transition-all shadow-lg active:scale-95">
              <Search size={20} />
              Search
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="flex items-center justify-between gap-6 overflow-x-auto pb-4 scrollbar-hide border-b border-gray-100 dark:border-gray-900">
          {['Trending', 'Iconic Cities', 'Beach', 'Nature', 'Luxe', 'History', 'Adventure', 'Spirituality', 'Skiing', 'Eco', 'Culture', 'Vineyards', 'Design'].map((cat) => {
            const isActive = activeCategory === cat;
            const Icon = categoryIcons[cat] || Search;
            return (
              <div 
                key={cat} 
                onClick={() => setActiveCategory(isActive ? '' : cat)}
                className={`flex flex-col items-center gap-2 min-w-max cursor-pointer border-b-2 pb-2 transition-all group ${isActive ? 'border-primary-600 opacity-100' : 'border-transparent hover:border-gray-500 opacity-60 hover:opacity-100'}`}
              >
                <Icon size={24} className={`${isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors'}`} />
                <span className={`text-xs font-bold ${isActive ? 'text-primary-600' : 'group-hover:text-gray-900 dark:group-hover:text-white transition-colors'}`}>{cat}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Destinations</h2>
            <p className="text-gray-500">Hand-picked stays for your next getaway</p>
          </div>
          <Link to="/listings" className="text-primary-600 font-bold hover:underline">View all</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800/50 rounded-2xl aspect-square"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
