import { Spotlight } from './ui/spotlight';
import { Film } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="h-[60vh] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight className="hidden md:block" />
      <div className="p-4 relative z-10 w-full text-center">
        <Film className="w-12 h-12 mx-auto mb-4 text-red-600" />
        <h1 className="mt-4 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          MovieBuzz
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          Discover and explore the latest movies, TV shows, and trending content. Your ultimate entertainment companion.
        </p>
      </div>
    </div>
  );
};