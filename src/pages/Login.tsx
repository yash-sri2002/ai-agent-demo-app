import React, { useState } from "react";
import { InputField } from "../components/InputField.js";
import { Button } from "../components/Button.js";
import { login, AuthError } from "../services/AuthService.js";
import { DASHBOARD_STORAGE_KEY } from "./Dashboard.js";

export const REMEMBERED_EMAIL_KEY = "rememberedEmail";

export function LoginPage() {
  const [email, setEmail] = useState(() => window.localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(() => window.localStorage.getItem(REMEMBERED_EMAIL_KEY) !== null);
  const [showResetHelp, setShowResetHelp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(): Promise<void> {
    setError(null);
    try {
      const user = await login({ email, password });
      if (rememberMe) {
        window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
      } else {
        window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }
      window.localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(user));
      window.location.assign("/dashboard");
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <InputField id="loginEmailInput" label="Email" value={email} onChange={setEmail} />
      <InputField
        id="passwordInput"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      {error && <p className="error-message">{error}</p>}
      <Button id="signInBtn" label="Log In" onClick={handleLogin} />
      <div className="login-options">
        <label htmlFor="rememberMeCheckbox">
          <input
            id="rememberMeCheckbox"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          Remember me
        </label>
        <a id="forgotPasswordLink" href="#" onClick={(event) => { event.preventDefault(); setShowResetHelp(true); }}>
          Forgot password?
        </a>
      </div>
      {showResetHelp && (
        <p id="resetPasswordHelp" className="info-message">
          Please contact your administrator to reset your password.
        </p>
      )}
    </div>
  );
}
