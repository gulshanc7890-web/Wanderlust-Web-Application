import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import API from '../api/axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Calendar, Home, User, Settings, Camera, LogOut } from 'lucide-react';
import ListingCard from '../components/ListingCard';

const Dashboard = () => {
  const { user, setUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Data states
  const [bookings, setBookings] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile forms
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  // Removed unused password state
  const [newPassword, setNewPassword] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'bookings') {
        const { data } = await API.get('/bookings/my');
        setBookings(data);
      } else if (activeTab === 'listings') {
        const { data } = await API.get(`/listings?ownerId=${user.id}`);
        setMyListings(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);


  const handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await API.delete(`/bookings/${id}`);
        toast.success('Booking cancelled successfully');
        setBookings(bookings.map(b => b.id === id ? { ...b, bookingStatus: 'cancelled' } : b));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  const uploadToCloudinary = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    // PLEASE REPLACE WITH YOUR OWN CLOUDINARY PRESET AND CLOUD NAME IF NEEDED
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'wonderlust'); 
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzry1xnsz';

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setAvatar(data.secure_url);
        toast.success('Image uploaded temporarily. Save changes to update profile.');
      } else {
        toast.error('Failed to upload image to Cloudinary');
      }
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const { data } = await API.put('/auth/profile', { name, email, avatar });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    setUpdatingProfile(true);
    try {
      const { data } = await API.put('/auth/profile', { password: newPassword });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Password updated successfully!');

      setNewPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setUpdatingProfile(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-500">Manage your bookings, listings, and profile settings.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Menu */}
        <div className="space-y-6 lg:col-span-1">
          <div className="card p-6">
             <div className="flex flex-col items-center gap-4 mb-6 text-center">
               <div className="relative">
                 {user?.avatar ? (
                   <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                 ) : (
                   <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-4xl font-bold shadow-lg border-4 border-white">
                     {user?.name?.[0]}
                   </div>
                 )}
               </div>
               <div>
                 <h3 className="font-bold text-lg">{user?.name}</h3>
                 <p className="text-sm text-gray-500">{user?.email}</p>
               </div>
             </div>
             
             <div className="space-y-2">
               <button 
                 onClick={() => setActiveTab('bookings')}
                 className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left font-semibold ${activeTab === 'bookings' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
               >
                 <Calendar size={18} /> Your Bookings
               </button>
               <button 
                 onClick={() => setActiveTab('listings')}
                 className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left font-semibold ${activeTab === 'listings' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
               >
                 <Home size={18} /> My Listings
               </button>
               <button 
                 onClick={() => setActiveTab('profile')}
                 className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left font-semibold ${activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
               >
                 <User size={18} /> Edit Profile
               </button>
               <button 
                 onClick={() => setActiveTab('settings')}
                 className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left font-semibold ${activeTab === 'settings' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
               >
                 <Settings size={18} /> Account Settings
               </button>
               <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                 <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition text-left font-semibold">
                   <LogOut size={18} /> Log Out
                 </button>
               </div>
             </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-600 to-rose-600 p-6 rounded-3xl text-white shadow-xl">
            <h3 className="font-bold text-xl mb-2">Want to earn extra?</h3>
            <p className="text-sm opacity-90 mb-4">List your property on Wanderlust and start hosting guests from around the world.</p>
            <button onClick={() => window.location.href='/host'} className="w-full bg-white text-primary-600 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition">List your home</button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          
          {/* TAB: Bookings */}
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2].map(n => <div key={n} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>)}
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="card p-4 flex flex-col sm:flex-row gap-4">
                      <img src={booking.listing?.image ? booking.listing.image.split(',')[0] : ''} className="w-full sm:w-32 h-32 rounded-xl object-cover" />
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-bold text-lg">{booking.listing?.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</p>
                        <p className="font-bold mt-2 text-primary-600">₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-gray-800 pt-4 sm:pt-0 sm:pl-4">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          booking.bookingStatus === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {booking.bookingStatus || 'Confirmed'}
                        </span>
                        {booking.bookingStatus !== 'cancelled' && (
                          <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-sm font-semibold text-red-500 hover:text-red-700 underline underline-offset-2"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-900/50 p-16 rounded-3xl text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No active bookings</h3>
                  <p className="text-gray-500">Time to dust off your bags and start planning your next adventure.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB: My Listings */}
          {activeTab === 'listings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <button onClick={() => window.location.href='/host'} className="btn-primary py-2 px-6 rounded-full text-sm font-bold">Add New</button>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2].map(n => <div key={n} className="h-64 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>)}
                </div>
              ) : myListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {myListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-900/50 p-16 rounded-3xl text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
                  <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">You haven't listed any properties yet</h3>
                  <p className="text-gray-500 mb-6">Become a host and start earning today.</p>
                  <button onClick={() => window.location.href='/host'} className="btn-primary py-3 px-8 rounded-xl font-bold shadow-lg">List your home</button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB: Edit Profile */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-8">
              <h2 className="text-2xl font-bold mb-8">Edit Profile</h2>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-md" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-bold shadow-md">
                        {name?.[0]}
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <Camera size={24} />
                      <input type="file" className="hidden" accept="image/*" onChange={uploadToCloudinary} disabled={uploadingImage} />
                    </label>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Profile Photo</h4>
                    <p className="text-sm text-gray-500">Click the image to upload a new avatar via Cloudinary.</p>
                    {uploadingImage && <span className="text-xs text-primary-600 font-bold mt-1 inline-block animate-pulse">Uploading...</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition"
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition"
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={updatingProfile || uploadingImage} 
                  className="btn-primary py-3 px-8 rounded-xl font-bold mt-4 disabled:opacity-70"
                >
                  {updatingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </motion.div>
          )}

          {/* TAB: Account Settings (Password) */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-8">
              <h2 className="text-2xl font-bold mb-8">Account Settings</h2>
              
              <div className="max-w-lg">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Change Password</h3>
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                    <input 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition"
                      required 
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={updatingProfile} 
                    className="btn-primary py-3 px-8 rounded-xl font-bold mt-4 disabled:opacity-70"
                  >
                    {updatingProfile ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
