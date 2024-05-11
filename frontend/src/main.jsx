import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/inter";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/joy";
// import { AlertProvider } from "./hooks/useAlert.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <StyledEngineProvider>
        <App />
      </StyledEngineProvider>
    </React.StrictMode>
  </Provider>
);
