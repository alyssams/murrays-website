"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { publicClient } from "@/sanity/lib/publicClient";

// import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Menu, X } from "lucide-react";

// GROQ query to fetch navigation from site settings
const navigationQuery = groq`
  *[_type == "siteSettings"][0]{
    navigation[] {
      title,
      url
    }
  }
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [navigation, setNavigation] = useState<{ title: string; url: string }[]>([]);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const navData = await publicClient.fetch(navigationQuery);

        // const navData = await client.fetch(navigationQuery);
        // Set navigation or fallback to an empty array
        setNavigation(navData?.navigation || []);
      } catch (error) {
        console.error("Error fetching navigation", error);
      }
    }
    fetchNavigation();
  }, []);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-600">
          Murray’s
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          {navigation.map((link, idx) => (
            <Link key={idx} href={link.url} className="hover:text-red-500">
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white px-4 pb-4 shadow">
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-700">
            {navigation.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-red-500"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}