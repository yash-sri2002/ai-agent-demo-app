import { loginRequest } from "../api/userApi.js";
import { validateLoginCredentials } from "../validation/loginValidation.js";
import type { LoginCredentials, User } from "../types/user.js";

export class AuthError extends Error {}

/**
 * Business logic layer between the Login page and the API: validates
 * input before making a network call, and normalizes failures into a
 * single AuthError type the UI can catch.
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  const validation = validateLoginCredentials(credentials.email, credentials.password);
  if (!validation.valid) {
    throw new AuthError(validation.errors.join(" "));
  }

  try {
    const { user } = await loginRequest(credentials);
    return user;
  } catch (error) {
    throw new AuthError(error instanceof Error ? error.message : "Login failed.");
  }
}
