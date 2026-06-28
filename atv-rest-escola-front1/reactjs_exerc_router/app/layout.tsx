import React from 'react';
import '@/app/globals.css';
import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'NextJS Router Pathname',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8 bg-white min-h-screen border-l border-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}