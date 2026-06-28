import React from 'react';

export default function ResponsividadePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      
      {/* O segredo da responsividade está aqui: flex-col no celular, md:flex-row no desktop */}
      <div className="flex flex-col md:flex-row flex-1 max-w-6xl mx-auto w-full p-4 gap-8 mt-4">

        {/* COLUNA ESQUERDA (Principal - Fica embaixo no celular, à esquerda no desktop) */}
        <main className="flex-1 order-2 md:order-1">
          <div className="border border-gray-200 rounded-lg p-0 mb-6 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 font-semibold text-sm">
              Resources
            </div>
            <ul className="divide-y divide-gray-200">
              <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                <span className="text-gray-400 text-lg">📄</span> 
                <span className="text-blue-600 hover:underline text-sm font-medium">Readme</span>
              </li>
              <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                <span className="text-gray-400 text-lg">📈</span> 
                <span className="text-blue-600 hover:underline text-sm font-medium">Activity</span>
              </li>
            </ul>
          </div>
        </main>

        {/* COLUNA DIREITA (Sidebar - Fica no topo no celular, à direita no desktop) */}
        <aside className="w-full md:w-1/3 lg:w-1/4 order-1 md:order-2 space-y-6">
          
          {/* About */}
          <div className="border-b border-gray-200 pb-6 md:border-none md:pb-0">
            <h2 className="font-semibold text-lg mb-3">About</h2>
            <p className="text-gray-700 text-sm mb-4">
              Instruções para criação de aplicação responsiva
            </p>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                <span className="text-gray-400">⭐</span> 0 stars
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                <span className="text-gray-400">👁️</span> 1 watching
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                <span className="text-gray-400">🍴</span> 0 forks
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
              Report repository
            </div>
          </div>

          {/* Releases */}
          <div className="border-b border-gray-200 pb-6 md:border-none md:pb-0">
            <h2 className="font-semibold text-base mb-2">Releases</h2>
            <p className="text-sm text-gray-500">No releases published</p>
          </div>

          {/* Packages */}
          <div className="border-b border-gray-200 pb-6 md:border-none md:pb-0">
            <h2 className="font-semibold text-base mb-2">Packages</h2>
            <p className="text-sm text-gray-500">No packages published</p>
          </div>

          {/* Contributors */}
          <div>
            <h2 className="font-semibold text-base mb-2">Contributors</h2>
            <p className="text-sm text-gray-500">No contributors</p>
          </div>
        </aside>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center text-xs text-gray-500 gap-4">
          <span>© 2026 Footer</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Docs</span>
        </div>
      </footer>
    </div>
  );
}