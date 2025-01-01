import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
import './index.css'; 

const SeplioChainId = 11155111;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={SeplioChainId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
