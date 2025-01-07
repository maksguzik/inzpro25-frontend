import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChartProvider } from "./context/ChartContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const URL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: URL, // https://tracewave.me
        audience: audience
    }}
    onRedirectCallback={(appState) => {
      window.history.replaceState({}, document.title, appState?.returnTo || "/");
    }}
    >
      <ChartProvider>
      <App />
    </ChartProvider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
