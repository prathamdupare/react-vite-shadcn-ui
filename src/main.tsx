import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { ThemeProvider } from "./components/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
