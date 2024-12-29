import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavItemClick: (type: 'movies' | 'tvshows' | 'watchlist') => void;
}

export const MobileMenu = ({ isOpen, onClose, onNavItemClick }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/80"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <nav className="flex flex-col p-4">
          <button
            onClick={() => {
              onNavItemClick('movies');
              onClose();
            }}
            className="w-full text-left text-lg text-white py-4 border-b border-white/10 hover:text-red-500 transition-colors"
          >
            Movies
          </button>
          <button
            onClick={() => {
              onNavItemClick('tvshows');
              onClose();
            }}
            className="w-full text-left text-lg text-white py-4 border-b border-white/10 hover:text-red-500 transition-colors"
          >
            TV Shows
          </button>
          <button
            onClick={() => {
              onNavItemClick('watchlist');
              onClose();
            }}
            className="w-full text-left text-lg text-white py-4 border-b border-white/10 hover:text-red-500 transition-colors"
          >
            Watchlist
          </button>
        </nav>
      </div>
    </motion.div>
  );
};