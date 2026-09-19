import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import '@fontsource/heebo/hebrew-400.css';
import '@fontsource/heebo/latin-400.css';
import '@fontsource/heebo/hebrew-500.css';
import '@fontsource/heebo/latin-500.css';
import '@fontsource/heebo/hebrew-700.css';
import '@fontsource/heebo/latin-700.css';
import '@fontsource/heebo/hebrew-900.css';
import '@fontsource/heebo/latin-900.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js').catch(() => {
      // offline support is optional - the app works without it
    });
  });
}
