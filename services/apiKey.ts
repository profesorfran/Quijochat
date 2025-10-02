export function getApiKey(): string | null {
  try {
    return localStorage.getItem('gemini_api_key');
  } catch {
    return null;
  }
}

export function setApiKey(key: string) {
  localStorage.setItem('gemini_api_key', key.trim());
}

export function clearApiKey() {
  localStorage.removeItem('gemini_api_key');
}

// Borra todos los datos locales de la aplicación ("cerrar sesión")
export function clearAllAppData() {
  try {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('chatUserName');
    localStorage.removeItem('chatGrade');
  } catch {}
  try {
    // Por si se usara almacenamiento de sesión en el futuro
    sessionStorage.clear();
  } catch {}
}

