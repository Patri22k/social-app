import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import { UserProvider } from './hooks/user';
import { Bounce, ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
      <UserProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
      />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
