import React from "react";
import type { User } from "../types/user.js";
import { Layout } from "../components/Layout.js";
import { LOGGED_IN_USER_KEY } from "../services/session.js";

const STORAGE_KEY = LOGGED_IN_USER_KEY;

function readLoggedInUser(): User | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function DashboardPage() {
  const user = readLoggedInUser();

  return (
    <Layout user={user}>
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        <p className="welcome-message">Welcome, {user?.displayName ?? "Guest"}.</p>
        <a id="editProfileLink" href="/profile">
          Edit Profile
        </a>
      </div>
    </Layout>
  );
}

export const DASHBOARD_STORAGE_KEY = STORAGE_KEY;
