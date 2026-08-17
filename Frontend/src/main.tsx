import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';


import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* 2. Wrap your App in the Provider */}
        <CartProvider>
            <App />
        </CartProvider>
    </StrictMode>,
)