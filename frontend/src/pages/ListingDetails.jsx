import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { motion } from 'framer-motion';
import { MapPin, Share, Heart, Shield, Award, Star } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const ListingDetails = () => {
  const { toggleWishlist, isSaved } = useAuth();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await API.get(`/listings/${id}`);
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-6"></div>
      <div className="h-[500px] bg-gray-200 dark:bg-gray-800 rounded-2xl mb-8"></div>
    </div>
  );

  if (!listing) return <div className="text-center py-20 text-2xl font-bold">Listing not found</div>;

  const getImages = (imgStr) => {
    if (!imgStr) return ['https://via.placeholder.com/400'];
    try {
      const parsed = JSON.parse(imgStr);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch { /* ignore error */ }
    const splitted = imgStr.split(',').map(s => s.trim()).filter(Boolean);
    return splitted.length > 0 ? splitted : ['https://via.placeholder.com/400'];
  };

  const images = getImages(listing.image);
  const saved = listing ? isSaved(listing.id) : false;

  const handleSave = async () => {
    try {
      const currentlySaved = await toggleWishlist(listing.id);
      if (currentlySaved) toast.success('Added to wishlist');
      else toast.success('Removed from wishlist');
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: listing.title,
      text: `Check out ${listing.title} on Wanderlust!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-12"
    >
      {/* Title and Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-black dark:fill-white" />
              <span>4.9 · 12 reviews</span>
            </div>
            <div 
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.location + ', ' + listing.country)}`, '_blank')}
              className="flex items-center gap-1 underline cursor-pointer hover:text-primary-600 transition"
            >
              <MapPin size={16} />
              <span>{listing.location}, {listing.country}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleShare} className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition underline font-semibold text-sm">
              <Share size={16} /> Share
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition underline font-semibold text-sm">
              <Heart size={16} className={saved ? 'fill-primary-500 text-primary-500' : ''} /> {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
        <div className="md:col-span-2 h-full">
          <img src={images[0]} alt={listing.title} className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
        </div>
        <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-2">
          <img src={images[1] || images[0]} className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
          <img src={images[2] || images[0]} className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
        </div>
        <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-2">
          <img src={images[3] || images[0]} className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
          <img src={images[4] || images[0]} className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center pb-8 border-b border-gray-200 dark:border-gray-800 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Hosted by {listing.owner?.name}</h2>
              <p className="text-gray-500">4 guests · 2 bedrooms · 2 beds · 1 bath</p>
            </div>
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
              <img src={listing.owner?.avatar || 'https://via.placeholder.com/100'} alt={listing.owner?.name} />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6 pb-8 border-b border-gray-200 dark:border-gray-800 mb-8">
            <div className="flex gap-4">
              <Award className="mt-1" />
              <div>
                <p className="font-bold">{listing.owner?.name} is a Superhost</p>
                <p className="text-sm text-gray-500">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="mt-1" />
              <div>
                <p className="font-bold">Great location</p>
                <p className="text-sm text-gray-500">95% of recent guests gave the location a 5-star rating.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="mt-1" />
              <div>
                <p className="font-bold">Free cancellation for 48 hours</p>
                <p className="text-sm text-gray-500">Get a full refund if you change your mind.</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">About this place</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
              {listing.description}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">What this place offers</h3>
            <div className="grid grid-cols-2 gap-4">
              {(listing.amenities?.split(',') || []).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                  {amenity.trim()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Booking Form */}
        <div className="relative">
          <div className="sticky top-28">
            <BookingForm listing={listing} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingDetails;
