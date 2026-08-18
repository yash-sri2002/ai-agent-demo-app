import React, { useState } from "react";
import { InputField } from "../components/InputField.js";
import { Button } from "../components/Button.js";
import { login, AuthError } from "../services/AuthService.js";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(): Promise<void> {
    setError(null);
    try {
      await login({ email, password });
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <InputField id="emailInput" label="Email" value={email} onChange={setEmail} />
      <InputField
        id="passwordInput"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      {error && <p className="error-message">{error}</p>}
      <Button id="signInBtn" label="Log In" onClick={handleLogin} />
    </div>
  );
}
