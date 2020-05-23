import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { initGA, initFBPixel } from './analytics';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { hotjar } from 'react-hotjar';

hotjar.initialize('1824836', 'v1');

//Google analytics
initGA();

// Stripe
const stripePromise = loadStripe('pk_test_WUVFL6e8MvKUMbCGtN8npTaA00srMSEDJH');

//fb pixel
initFBPixel();

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
