import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import '../css/app.css';

// Set Stripe public key from Laravel config
const stripeMetaTag = document.querySelector('meta[name="stripe-public-key"]');
window.STRIPE_PUBLIC_KEY = stripeMetaTag?.getAttribute('content');

if (!window.STRIPE_PUBLIC_KEY) {
    console.warn('Stripe public key not found in meta tags. Please ensure the stripe-public-key meta tag is set in your HTML.');
}

const root = document.getElementById('app');
if (root) {
    createRoot(root).render(
        <Router>
            <App />
        </Router>
    );
}
