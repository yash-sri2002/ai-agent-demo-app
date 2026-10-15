import React from "react";
import type { User } from "../types/user.js";
import { logout } from "../services/session.js";

export function TopBar({ user }: { user: User | null }) {
  return (
    <header className="top-bar">
      <span className="top-bar-home">Home</span>
      <div className="top-bar-right">
        <span id="topBarUserName" className="top-bar-user">
          {user?.displayName ?? "Guest"}
        </span>
        {user && (
          <button id="logoutBtn" type="button" className="logout-button" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
