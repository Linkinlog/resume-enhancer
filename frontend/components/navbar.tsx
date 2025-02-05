import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
              className="inline-flex items-center justify-center p-2 rounded-md text-background hover:text-background focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/pricing"
            className="block text-background hover:text-background"
          >
            Pricing
          </Link>
          <Link
            href="/signup"
            className="block text-background hover:text-background"
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className="block text-background hover:text-background"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};
