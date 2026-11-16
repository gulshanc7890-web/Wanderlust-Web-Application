import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import PlaceholderPage from './pages/PlaceholderPage';
import HelpCenter from './pages/HelpCenter';
import AntiDiscrimination from './pages/AntiDiscrimination';
import AirCover from './pages/AirCover';
import DisabilitySupport from './pages/DisabilitySupport';
import CancellationOptions from './pages/CancellationOptions';
import HostHome from './pages/HostHome';
import HostAirCover from './pages/HostAirCover';
import HostingResources from './pages/HostingResources';
import CommunityForum from './pages/CommunityForum';
import ResponsibleHosting from './pages/ResponsibleHosting';
import Newsroom from './pages/Newsroom';
import NewFeatures from './pages/NewFeatures';
import Careers from './pages/Careers';
import Investors from './pages/Investors';
import GiftCards from './pages/GiftCards';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <Navbar />
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Footer Placeholder Routes */}
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/aircover" element={<AirCover />} />
              <Route path="/anti-discrimination" element={<AntiDiscrimination />} />
              <Route path="/support" element={<DisabilitySupport />} />
              <Route path="/cancellation" element={<CancellationOptions />} />
              
              <Route path="/host" element={<HostHome />} />
              <Route path="/host-protection" element={<HostAirCover />} />
              <Route path="/hosting-resources" element={<HostingResources />} />
              <Route path="/community" element={<CommunityForum />} />
              <Route path="/responsible-hosting" element={<ResponsibleHosting />} />
              
              <Route path="/newsroom" element={<Newsroom />} />
              <Route path="/features" element={<NewFeatures />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/gift-cards" element={<GiftCards />} />
              
              <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="How we collect, use, and protect your personal data." />} />
              <Route path="/terms" element={<PlaceholderPage title="Terms of Service" description="The rules and guidelines for using our platform." />} />
              <Route path="/sitemap" element={<PlaceholderPage title="Sitemap" description="Navigate through all pages of the Wanderlust platform." />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-center" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
