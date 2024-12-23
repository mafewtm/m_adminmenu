import React from 'react';
import ReactDOM from 'react-dom/client';
import { debugData } from './utils/debugData';
import { isEnvBrowser } from './utils/misc';
import App from './app';
import './main.css';

debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

if (isEnvBrowser()) {
  const root = document.getElementById('root');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);