import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';

//Bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';
//Fontawesome

render(
  <StrictMode>
    <App/>   
  </StrictMode>,
  document.getElementById('root')
);

