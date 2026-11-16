import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import API from '../api/axios';

const BookingForm = ({ listing }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getLocalISODate = (date = new Date()) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  const today = getLocalISODate();

  const getMinCheckOutDate = () => {
    if (!checkIn) return today;
    const inDate = new Date(checkIn);
    inDate.setDate(inDate.getDate() + 1);
    return getLocalISODate(inDate);
  };

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    if (checkOut && new Date(newCheckIn) >= new Date(checkOut)) {
      setCheckOut('');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book');
      return navigate('/login');
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      toast.error('Please select valid dates');
      return;
    }

    const diffTime = checkOutDate - checkInDate;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      toast.error('Check-out must be at least 1 day after check-in');
      return;
    }

    

    try {
      setLoading(true);
      await API.post('/bookings', {
        listingId: listing.id,
        checkIn,
        checkOut,
        guests
      });

      toast.success('Booking successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-2xl font-bold">₹{listing.price.toLocaleString('en-IN')}</span>
          <span className="text-gray-500 font-light"> night</span>
        </div>
      </div>

      <form onSubmit={handleBooking} className="space-y-4">
        <div className="grid grid-cols-2 border border-gray-300 dark:border-gray-700 rounded-t-xl overflow-hidden">
          <div className="p-3 border-r border-gray-300 dark:border-gray-700">
            <label className="block text-[10px] font-bold uppercase">Check-in</label>
            <input 
              type="date" 
              className="w-full text-sm bg-transparent border-none p-0 focus:ring-0" 
              value={checkIn}
              onChange={handleCheckInChange}
              min={today}
              required
            />
          </div>
          <div className="p-3">
            <label className="block text-[10px] font-bold uppercase">Check-out</label>
            <input 
              type="date" 
              className="w-full text-sm bg-transparent border-none p-0 focus:ring-0" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={getMinCheckOutDate()}
              required
            />
          </div>
        </div>
        <div className="p-3 border border-t-0 border-gray-300 dark:border-gray-700 rounded-b-xl">
          <label className="block text-[10px] font-bold uppercase">Guests</label>
          <select 
            className="w-full text-sm bg-transparent border-none p-0 focus:ring-0"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
          </select>
        </div>

        <button type="submit" disabled={loading} className="w-full btn-primary py-3 font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed">
          {loading ? 'Booking...' : 'Reserve'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>

      {checkIn && checkOut && (() => {
        const nights = Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
        const price = listing.price * nights;
        const total = price + 500;
        return (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="underline italic">₹{listing.price.toLocaleString('en-IN')} x {nights} nights</span>
              <span>₹{price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline italic">Cleaning fee</span>
              <span>₹500</span>
            </div>
            <hr className="border-gray-200 dark:border-gray-800" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default BookingForm;
