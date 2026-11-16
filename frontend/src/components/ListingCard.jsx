import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const ListingCard = ({ listing }) => {
  const { toggleWishlist, isSaved } = useAuth();
  const saved = isSaved(listing.id);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const currentlySaved = await toggleWishlist(listing.id);
      if (currentlySaved) toast.success('Added to wishlist');
      else toast.success('Removed from wishlist');
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    }
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Helper to parse images whether they are JSON array, comma-separated, or single string
  const getImages = (imgStr) => {
    if (!imgStr) return ['https://via.placeholder.com/400'];
    try {
      const parsed = JSON.parse(imgStr);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // Ignore JSON parse errors
    }
    const splitted = imgStr.split(',').map(s => s.trim()).filter(Boolean);
    return splitted.length > 0 ? splitted : ['https://via.placeholder.com/400'];
  };

  const images = getImages(listing.image);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/listing/${listing.id}`} className="cursor-pointer block">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <AnimatePresence initial={false}>
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="object-cover h-full w-full absolute inset-0" 
                src={images[currentImageIndex]} 
                alt={`${listing.title} - Image ${currentImageIndex + 1}`} 
              />
            </AnimatePresence>
            
            <div className="absolute top-3 right-3 z-10">
              <Heart 
                className={`drop-shadow-md transition cursor-pointer active:scale-90 ${saved ? 'text-primary-500 fill-primary-500' : 'text-white hover:text-primary-500 hover:fill-primary-500'}`}
                onClick={handleSave} 
              />
            </div>

            {/* Carousel Controls */}
            {images.length > 1 && isHovered && (
              <div className="absolute inset-0 flex items-center justify-between p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={prevImage}
                  className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-sm transition transform hover:scale-110"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-sm transition transform hover:scale-110"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
            
            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-start mt-1">
            <h3 className="font-semibold text-base truncate flex-1 text-gray-900 dark:text-gray-100">{listing.location}, {listing.country}</h3>
            <div className="flex items-center gap-1 text-sm ml-2">
              <Star size={14} className="fill-gray-900 dark:fill-white text-gray-900 dark:text-white" />
              <span className="font-medium text-gray-800 dark:text-gray-200">New</span>
            </div>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm -mt-1 truncate">
            {listing.category}
          </p>
          
          <p className="font-semibold text-sm mt-1 text-gray-900 dark:text-gray-100">
            ₹{listing.price.toLocaleString('en-IN')} <span className="font-normal text-gray-500 dark:text-gray-400">night</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
