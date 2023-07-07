import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

// Because this is an assignment, ignoring this condition.
// if (process.env.NODE_ENV === "development") {
const { worker } = require("./mocks/browser");
worker.start();
// }

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
