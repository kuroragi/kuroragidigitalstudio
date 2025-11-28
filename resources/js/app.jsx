import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./bootstrap";

// Mount React app
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
