import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:underline cursor-pointer"><Link to="/help">Help Center</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/aircover">AirCover</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/anti-discrimination">Anti-discrimination</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/support">Disability support</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/cancellation">Cancellation options</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Hosting</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:underline cursor-pointer"><Link to="/host">Airbnb your home</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/host-protection">AirCover for Hosts</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/hosting-resources">Hosting resources</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/community">Community forum</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/responsible-hosting">Hosting responsibly</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Wanderlust</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:underline cursor-pointer"><Link to="/newsroom">Newsroom</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/features">New features</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/careers">Careers</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/investors">Investors</Link></li>
              <li className="hover:underline cursor-pointer"><Link to="/gift-cards">Gift cards</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Social</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-all hover:scale-110">
                <FaFacebook size={22} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-all hover:scale-110">
                <FaInstagram size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-all hover:scale-110">
                <FaTwitter size={22} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-all hover:scale-110">
                <FaLinkedin size={22} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-all hover:scale-110">
                <FaGithub size={22} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>© 2026 Wanderlust, Inc.</span>
            <Link to="/privacy" className="hover:underline cursor-pointer">Privacy</Link>
            <Link to="/terms" className="hover:underline cursor-pointer">Terms</Link>
            <Link to="/sitemap" className="hover:underline cursor-pointer">Sitemap</Link>
          </div>
          <div className="flex items-center gap-6 font-semibold text-gray-900 dark:text-gray-100">
            <div onClick={() => alert('Language preferences coming soon!')} className="flex items-center gap-2 cursor-pointer hover:underline">
              <Globe size={16} />
              <span>English (IN)</span>
            </div>
            <div onClick={() => alert('Currency options coming soon!')} className="cursor-pointer hover:underline">
              <span>₹ INR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
