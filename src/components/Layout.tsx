import React from "react";
import { Sidebar } from "./Sidebar.js";
import { TopBar } from "./TopBar.js";
import type { User } from "../types/user.js";

export function Layout({ user, children }: { user: User | null; children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <TopBar user={user} />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
