import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav id="main-nav" className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/my_logo.svg"
                alt="Logo"
                width={400}
                height={400}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/pricing" className="text-background hover:text-background">
              Pricing
            </Link>
            <Link href="/auth" className="text-background hover:text-background">
              Sign In
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg bg-white bg-opacity-10 text-background hover:bg-opacity-20 transition-all"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`} 
        id="mobile-menu"
      >
        <div className="p-4 space-y-2">
          <Link
            href="/pricing"
            className="block text-center py-3 rounded-lg text-background bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/auth"
            className="block text-center py-3 rounded-lg text-background bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
