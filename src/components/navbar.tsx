import { Film, Menu } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";


interface NavbarProps {
  children?: React.ReactNode;
  onSearch: (query: string) => void;
  onNavItemClick: (type: "movies" | "tvshows" | "watchlist") => void;
}

export const Navbar = ({ children, onSearch, onNavItemClick }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full py-2 z-40 bg-black/90 backdrop-blur-sm border-b border-white/10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Film className="h-8 w-8 text-red-600" />
                <span className="ml-2 text-xl font-bold text-white">
                  MovieBuzz
                </span>
              </div>

              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:flex-1 md:items-center">
              <div className="hidden min-[1100px]:flex flex-1 justify-center max-w-xl mx-auto">
                {children}
              </div>
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => onNavItemClick("movies")}
                  className="text-gray-300 hover:text-white"
                >
                  Movies
                </button>
                <button
                  onClick={() => onNavItemClick("tvshows")}
                  className="text-gray-300 hover:text-white "
                >
                  TV Shows
                </button>
                <button
                  onClick={() => onNavItemClick("watchlist")}
                  className="text-gray-300 hover:text-white"
                >
                  Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavItemClick={onNavItemClick}
      />
    </>
  );
};
