/**
 * The logged-in user is kept in localStorage under this key. Lives here
 * (not in Dashboard.tsx) so the top bar can log out without importing a
 * page - Dashboard -> Layout -> TopBar -> Dashboard would be a cycle.
 */
export const LOGGED_IN_USER_KEY = "demoLoggedInUser";

export function logout(): void {
  window.localStorage.removeItem(LOGGED_IN_USER_KEY);
  window.location.assign("/");
}
