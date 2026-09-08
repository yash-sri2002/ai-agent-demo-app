import React from "react";
import type { User } from "../types/user.js";

/**
 * Matches the real Hercules admin UI's top bar structure (observed live
 * via Playwright MCP): Home + a domain selector on the left; alert
 * notifications, background tasks, the user's name, and a user-menu
 * avatar (initials) on the right.
 */
export function TopBar({ user }: { user: User | null }) {
  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <span className="top-bar-home">Home</span>
        <button id="domainSelectorBtn" type="button" className="domain-selector">
          yash.com <span className="chevron">▾</span>
        </button>
      </div>
      <div className="top-bar-right">
        <button id="alertNotificationsBtn" type="button" className="icon-button" aria-label="Alert notifications">
          🔔
        </button>
        <button id="backgroundTasksBtn" type="button" className="icon-button" aria-label="Background tasks">
          ☰
        </button>
        <span id="topBarUserName" className="top-bar-user">
          {user?.displayName ?? "Guest"}
        </span>
        <button
          id="userMenuBtn"
          type="button"
          className="user-avatar"
          aria-label={`User menu for ${user?.displayName ?? "Guest"}`}
        >
          {initials(user?.displayName)}
        </button>
      </div>
    </header>
  );
}

function initials(name: string | null | undefined): string {
  if (!name) return "G";
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
