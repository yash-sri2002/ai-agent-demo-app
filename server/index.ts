/**
 * Minimal backend for the demo app's login flow. In-memory only - this is
 * a fixture for testing automation-impact-agent, not a real auth system
 * (no hashing, no session store, one hardcoded user).
 */
import express from "express";

interface StoredUser {
  id: string;
  email: string;
  password: string;
  displayName: string;
}

const users: StoredUser[] = [
  { id: "u1", email: "test.user@example.com", password: "SuperSecret123", displayName: "Test User" },
];

const app = express();
app.use(express.json());

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body ?? {};
  const user = users.find((candidate) => candidate.email === email && candidate.password === password);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password." });
    return;
  }

  res.json({
    user: { id: user.id, email: user.email, displayName: user.displayName },
    token: `demo-token-${user.id}`,
  });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`ai-agent-demo-app API server listening on http://localhost:${port}`);
});
