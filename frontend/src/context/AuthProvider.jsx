import { useState, useEffect } from 'react';
import API from '../api/axios';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });
  const [loading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      API.get('/wishlist').then(({data}) => setWishlist(data)).catch(console.error);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWishlist([]);
    }
  }, [user]);

  const toggleWishlist = async (listingId) => {
    if (!user) throw new Error('Please login to save to wishlist');
    const existing = wishlist.find(w => w.listingId === Number(listingId));
    if (existing) {
      await API.delete(`/wishlist/${existing.id}`);
      setWishlist(prev => prev.filter(w => w.id !== existing.id));
      return false;
    } else {
      const { data } = await API.post('/wishlist', { listingId: Number(listingId) });
      setWishlist(prev => [...prev, data]);
      return true;
    }
  };

  const isSaved = (listingId) => {
    return wishlist.some(w => w.listingId === Number(listingId));
  };
  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const register = async (name, email, password, role) => {
    const { data } = await API.post('/auth/register', { name, email, password, role });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading, wishlist, toggleWishlist, isSaved }}>
      {children}
    </AuthContext.Provider>
  );
};

