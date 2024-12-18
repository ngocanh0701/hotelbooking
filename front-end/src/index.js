import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext" ;
import { SearchContextProvider } from "./context/SearchContext";
import { RoomContextProvider  } from "./context/RoomContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <RoomContextProvider>
          <App />
        </RoomContextProvider> 
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
