import React, { useState } from 'react';
import { Film, Menu, X } from 'lucide-react';

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center mr-24">
              <Film className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-white">MovieBuzz</span>
            </div>

            <div className="hidden md:block flex-1 mx-8 ">{children}</div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="https://www.omdbapi.com/trending/movies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                Movies
              </a>
              <a
                href="https://www.omdbapi.com/trending/tvshows"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                TV Shows
              </a>
              <a
                href="https://www.omdbapi.com/trending/watchlist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                Watchlist
              </a>
            </div>

            {/* Hamburger Icon */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={toggleMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Side Navigation */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <span className="text-white text-xl font-bold">Menu</span>
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <nav className="flex flex-col space-y-4">
              <a
                href="https://www.omdbapi.com/trending/movies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                Movies
              </a>
              <a
                href="https://www.omdbapi.com/trending/tvshows"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                TV Shows
              </a>
              <a
                href="https://www.omdbapi.com/trending/watchlist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                Watchlist
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
