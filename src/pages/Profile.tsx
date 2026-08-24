import React, { useState } from "react";
import { InputField } from "../components/InputField.js";
import { Button } from "../components/Button.js";
import { updateProfileRequest } from "../api/userApi.js";
import { DASHBOARD_STORAGE_KEY } from "./Dashboard.js";
import type { User } from "../types/user.js";

function readLoggedInUser(): User | null {
  const raw = window.localStorage.getItem(DASHBOARD_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function ProfilePage() {
  const user = readLoggedInUser();
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSave(): Promise<void> {
    if (!user) {
      setMessage("You must be logged in to edit your profile.");
      return;
    }

    try {
      const updatedUser = await updateProfileRequest(user.id, displayName);
      window.localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(updatedUser));
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="profile-page">
      <h1>Edit Profile</h1>
      <InputField
        id="displayNameInput"
        label="Display name"
        value={displayName}
        onChange={setDisplayName}
      />
      {message && <p className="profile-message">{message}</p>}
      <Button id="saveChangesBtn" label="Save" onClick={handleSave} />
    </div>
  );
}
