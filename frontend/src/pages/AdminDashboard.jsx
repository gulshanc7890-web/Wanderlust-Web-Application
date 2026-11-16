import { useState, useEffect } from 'react';
import API from '../api/axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/auth/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-pulse">
       <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-10"></div>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>)}
       </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-extrabold mb-10 text-gray-900 dark:text-white"
      >
        Admin <span className="text-primary-600">Overview</span>
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <motion.div 
          whileHover={{ y: -5 }}
          className="card p-6 bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-900/30"
        >
          <p className="text-xs font-bold uppercase text-primary-600 tracking-wider mb-2">Total Users</p>
          <p className="text-4xl font-black">{stats?.users}</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30"
        >
          <p className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2">Total Listings</p>
          <p className="text-4xl font-black">{stats?.listings}</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="card p-6 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30"
        >
          <p className="text-xs font-bold uppercase text-green-600 tracking-wider mb-2">Total Bookings</p>
          <p className="text-4xl font-black">{stats?.bookings}</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="card p-6 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30"
        >
          <p className="text-xs font-bold uppercase text-purple-600 tracking-wider mb-2">Total Revenue</p>
          <p className="text-4xl font-black">₹{stats?.revenue?.toLocaleString('en-IN')}</p>
        </motion.div>
      </div>

      {/* Additional admin controls could go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
             <button className="btn-primary">Manage Users</button>
             <button className="btn-secondary">Review Listings</button>
          </div>
        </div>
        <div className="card p-8">
          <h3 className="text-xl font-bold mb-4">System Status</h3>
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
            API Online
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
