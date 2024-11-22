import React from "react"; 
import ReactDOM from "react-dom/client";
//imported css styles files
import './styles/reset.css';
import './styles/global.css';
//imported app.jsx
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
