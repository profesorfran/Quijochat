import React from 'react';
import { clearApiKey, clearAllAppData } from '../services/apiKey';

const Header: React.FC = () => {
  const handleChangeKey = () => {
    try { clearApiKey(); } catch {}
    window.location.reload();
  };

  const handleLogout = () => {
    try { clearAllAppData(); } catch {}
    window.location.reload();
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2 text-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Quijochat</h1>
        <p className="text-xs text-gray-600 dark:text-gray-400">Desarrollado por Francisco David Sanchez Valencia</p>
      </div>
      <div className="absolute right-3 top-2 flex gap-2">
        <button
          onClick={handleChangeKey}
          className="text-xs px-3 py-1 rounded-full border border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900"
        >
          Cambiar API Key
        </button>
        <button
          onClick={handleLogout}
          className="text-xs px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white"
          title="Borrar clave, historial y datos"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;

