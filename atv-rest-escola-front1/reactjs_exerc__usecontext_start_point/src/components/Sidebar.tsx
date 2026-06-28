"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const items: NavigationItem[] = [
    { label: 'About', href: '/' },
    { label: 'Readme', href: '/readme' },
    { label: 'Activity', href: '/activity' },
    { label: 'Stars', href: '/stars', badge: 0 },
    { label: 'Watchers', href: '/watchers', badge: 1 },
    { label: 'Forks', href: '/forks', badge: 0 },
    { label: 'Releases', href: '/releases' },
    { label: 'Packages', href: '/packages' },
    { label: 'Contributors', href: '/contributors', badge: 1 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Repository Navigation
        </h2>
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border border-blue-100'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;