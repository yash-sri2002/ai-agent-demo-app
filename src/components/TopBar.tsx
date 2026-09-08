import React from "react";
import type { User } from "../types/user.js";

export function TopBar({ user }: { user: User | null }) {
  return (
    <header className="top-bar">
      <span className="top-bar-home">Home</span>
      <div className="top-bar-right">
        <span id="topBarUserName" className="top-bar-user">
          {user?.displayName ?? "Guest"}
        </span>
      </div>
    </header>
  );
}
