import React from "react"; 
import ReactDOM from "react-dom/client";
//imported css styles files
import './styles/reset.css';
import './styles/global.css';
//imported app.jsx
import App from './App.jsx';
import { UserProvider } from "./context/UserContext.jsx";

// App component is being passed to the UserProvider as a child, 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
