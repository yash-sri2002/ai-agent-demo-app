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
