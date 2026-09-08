import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { LoginPage } from "./pages/Login.js";
import { DashboardPage } from "./pages/Dashboard.js";
import { ProfilePage } from "./pages/Profile.js";
import { DomainsListPage } from "./pages/DomainsList.js";
import { DomainCreatePage } from "./pages/DomainCreate.js";

/**
 * Deliberately no router library - this app has a small, fixed set of
 * pages, so a one-line path check is simpler than adding a routing
 * dependency for a demo fixture. A real app would use react-router or
 * similar.
 */
function App() {
  if (window.location.pathname === "/dashboard") return <DashboardPage />;
  if (window.location.pathname === "/profile") return <ProfilePage />;
  if (window.location.pathname === "/domains/new") return <DomainCreatePage />;
  if (window.location.pathname === "/domains") return <DomainsListPage />;
  return <LoginPage />;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found in index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
