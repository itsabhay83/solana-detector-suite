

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Polyfill Buffer for the browser environment
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(<App />);
