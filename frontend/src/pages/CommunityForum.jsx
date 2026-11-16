import { useState } from 'react';
import { Users, ThumbsUp, MessageSquare, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const CommunityForum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showTopics, setShowTopics] = useState(false);

  const handleSignIn = () => {
    if (user) {
      toast.success("You are already signed in! Welcome to the forum.");
      setShowTopics(true);
      setTimeout(() => {
        document.getElementById('topics-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      toast.error("Please login to access the forum.");
      navigate('/login');
    }
  };

  const handleBrowseTopics = () => {
    setShowTopics(true);
    setTimeout(() => {
      document.getElementById('topics-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <Users className="w-16 h-16 text-primary-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Community Forum
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Connect with thousands of hosts worldwide. Share stories, ask questions, and learn from experienced Superhosts.
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 text-center shadow-lg mb-16">
        <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          The forum is a space to exchange tips, discuss hosting challenges, and stay updated on the latest community news.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {!user ? (
            <button onClick={handleSignIn} className="btn-primary py-3 px-8 rounded-xl font-bold shadow-md hover:scale-105 transition-transform">
              Sign In to Forum
            </button>
          ) : (
            <button onClick={() => toast.success("Drafting a new topic feature coming soon!")} className="btn-primary py-3 px-8 rounded-xl font-bold shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2">
              <MessageSquare size={18} /> Create New Topic
            </button>
          )}
          <button onClick={handleBrowseTopics} className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-3 px-8 rounded-xl font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2">
            <Search size={18} /> Browse Topics
          </button>
        </div>
      </div>

      {showTopics && (
        <motion.div id="topics-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4 mb-8">
            <h2 className="text-3xl font-bold">Trending Discussions</h2>
            <span className="text-primary-600 font-bold cursor-pointer">View All</span>
          </div>

          {[
            {
              title: "What is the best smart lock for remote check-ins in 2026?",
              author: "HostMaster_99",
              replies: 42,
              likes: 128,
              time: "2 hours ago",
              tag: "Technology"
            },
            {
              title: "Guest threw a party and broke my TV. How does AirCover work?",
              author: "Sarah_NYC",
              replies: 89,
              likes: 340,
              time: "5 hours ago",
              tag: "Help & Support"
            },
            {
              title: "Tips for writing a listing title that gets 50% more clicks!",
              author: "SuperHost_Alex",
              replies: 15,
              likes: 76,
              time: "1 day ago",
              tag: "Marketing"
            }
          ].map((topic, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md transition cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-1 rounded-md mb-3 inline-block">
                    {topic.tag}
                  </span>
                  <h3 className="text-xl font-bold group-hover:text-primary-600 transition">{topic.title}</h3>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1"><MessageSquare size={16}/> {topic.replies}</div>
                  <div className="flex items-center gap-1"><ThumbsUp size={16}/> {topic.likes}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                  {topic.author.charAt(0)}
                </div>
                <span>Posted by <strong className="text-gray-900 dark:text-white">{topic.author}</strong></span>
                <span>•</span>
                <span>{topic.time}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
export default CommunityForum;
