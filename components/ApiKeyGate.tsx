import React, { useEffect, useState } from 'react';
import { getApiKey, setApiKey, clearApiKey } from '../services/apiKey';

interface ApiKeyGateProps {
  onReady: () => void;
}

const ApiKeyGate: React.FC<ApiKeyGateProps> = ({ onReady }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existing = getApiKey();
    if (existing) {
      onReady();
    }
  }, [onReady]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError('La clave no puede estar vacía.');
      return;
    }
    try {
      setApiKey(key);
      setError(null);
      onReady();
    } catch (err) {
      setError('No se pudo guardar la clave en este navegador.');
    }
  };

  const handleClear = () => {
    clearApiKey();
    setKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Introduce tu clave de API de Gemini</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Para usar la aplicación, necesitas tu propia clave de API de Gemini. La clave se guarda solo en tu navegador.
        </p>
        <form onSubmit={handleSave} className="space-y-3">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="GEMINI_API_KEY"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
            >
              Borrar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-teal-500 hover:bg-teal-600 text-white"
            >
              Guardar y continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyGate;

