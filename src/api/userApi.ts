import type { LoginCredentials, User } from "../types/user.js";

const API_BASE_URL = "/api/users";

export interface LoginResponse {
  user: User;
  token: string;
}

/**
 * Calls the backend login endpoint. Thrown errors carry the backend's
 * message so the UI layer can display it directly.
 */
export async function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: "Login failed." }));
    throw new Error(body.message ?? "Login failed.");
  }

  return response.json() as Promise<LoginResponse>;
}

/** Updates a user's display name. Thrown errors carry the backend's message. */
export async function updateProfileRequest(userId: string, displayName: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, displayName }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: "Profile update failed." }));
    throw new Error(body.message ?? "Profile update failed.");
  }

  return response.json() as Promise<User>;
}
