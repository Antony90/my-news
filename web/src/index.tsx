import ReactDOM from 'react-dom/client';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import App from './App';
import AppWrapper from './AppWrapper';

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppWrapper>
    <App />
  </AppWrapper>
);
