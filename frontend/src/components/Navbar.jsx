import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, Heart, Home, LogOut, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">W</div>
          <span className="font-bold text-xl tracking-tight text-primary-600 hidden sm:block">Wanderlust</span>
        </Link>

        {/* Search Bar (Middle) */}
        <Link to="/listings" className="hidden md:flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-gray-50 dark:bg-gray-800">
          <span className="text-sm font-medium px-2 border-r border-gray-300 dark:border-gray-700">Anywhere</span>
          <span className="text-sm font-medium px-2 border-r border-gray-300 dark:border-gray-700">Any week</span>
          <span className="text-sm text-gray-500 px-2">Add guests</span>
          <div className="bg-primary-600 p-2 rounded-full text-white">
            <Search size={16} />
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link to="/listings" className="hidden lg:block text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">
            Airbnb your home
          </Link>
          
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1 hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-900 relative"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-400" />
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              {user?.avatar ? <img src={user.avatar} alt="avatar" /> : <User size={20} className="text-gray-500" />}
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 overflow-hidden"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                        <Home size={16} /> Dashboard
                      </Link>
                      <Link to="/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                        <Heart size={16} /> Wishlist
                      </Link>
                      {user.role === 'ADMIN' && (
                        <Link to="/admin" className="block px-4 py-2 text-sm text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
                          Admin Panel
                        </Link>
                      )}
                      <hr className="my-1 border-gray-100 dark:border-gray-700" />
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">Login</Link>
                      <Link to="/register" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Sign up</Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
