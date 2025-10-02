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

