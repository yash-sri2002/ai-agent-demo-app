import React, { useState } from "react";
import type { User } from "../types/user.js";
import { Layout } from "../components/Layout.js";
import { createDomain } from "../api/domainApi.js";
import { DASHBOARD_STORAGE_KEY } from "./Dashboard.js";

function readLoggedInUser(): User | null {
  const raw = window.localStorage.getItem(DASHBOARD_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function DomainCreatePage() {
  const user = readLoggedInUser();
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(): Promise<void> {
    setError(null);

    if (name.trim().length === 0) {
      setError("Domain name is required.");
      return;
    }

    try {
      await createDomain({ name: name.trim(), status, description: description.trim() || undefined });
      window.location.assign("/domains");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create domain.");
    }
  }

  return (
    <Layout user={user}>
      <div className="domain-create-page">
        <nav className="breadcrumb">
          <a href="/domains">Domains</a> / Create
        </nav>
        <h1>Create Domain</h1>
        <p className="page-subtitle">Add a new domain to the system</p>

        <div className="form-card">
          <h2 className="form-card-title">Domain Information</h2>
          <p className="form-card-subtitle">Configure your domain's basic settings</p>

          <label htmlFor="domainNameInput">Domain Name *</label>
          <input
            id="domainNameInput"
            type="text"
            placeholder="Enter domain name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <p className="field-hint">This will be the primary identifier for the domain</p>

          <label className="checkbox-label">
            <input
              id="domainStatusCheckbox"
              type="checkbox"
              checked={status === "Active"}
              onChange={(event) => setStatus(event.target.checked ? "Active" : "Inactive")}
            />
            Active
          </label>
          <p className="field-hint">Inactive domains won't be accessible to users</p>

          <label htmlFor="domainDescriptionInput">Description</label>
          <textarea
            id="domainDescriptionInput"
            placeholder="Enter domain description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="info-callout">
          <strong>Domain Aliases &amp; Auto Discovery</strong>
          <p>
            Hostname configuration (Domain Aliases and Auto Discovery domains) is available after
            the domain is created.
          </p>
        </div>

        {error && (
          <p className="error-message" id="domainFormError">
            {error}
          </p>
        )}

        <div className="form-actions">
          <a href="/domains" id="cancelDomainBtn" className="button-secondary">
            Cancel
          </a>
          <button id="saveDomainBtn" className="button-primary" onClick={handleCreate}>
            Create Domain
          </button>
        </div>
      </div>
    </Layout>
  );
}
