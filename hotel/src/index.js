import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext" ;
import { SearchContextProvider } from "./context/SearchContext";
import { RoomContextProvider  } from "./context/RoomContext";
import { HotelProvider } from "./context/HotelContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HotelProvider>
      <SearchContextProvider>
        <RoomContextProvider>
          <App />
        </RoomContextProvider> 
      </SearchContextProvider>
      </HotelProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

