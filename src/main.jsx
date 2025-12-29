import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { supabase } from "./supabaseClient";

// ⬇️ ORDEN CRÍTICO DE CSS
import "./styles/theme.css";
import "./index.css";

async function handleAuthRedirect() {
  const hash = window.location.hash;

  if (hash.includes("access_token")) {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Auth error:", error);
    } else {
      console.log("Session restored:", data.session);
    }

    window.history.replaceState(null, "", window.location.pathname);
  }
}

handleAuthRedirect();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
