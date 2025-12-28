import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { supabase } from "./supabaseClient";

async function handleAuthRedirect() {
  const hash = window.location.hash;

  if (hash.includes("access_token")) {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Auth error:", error);
    } else {
      console.log("Session restored:", data.session);
    }

    // Limpia el hash para evitar loops
    window.history.replaceState(null, "", window.location.pathname);
  }
}

handleAuthRedirect();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
