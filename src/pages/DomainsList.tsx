import React, { useEffect, useState } from "react";
import type { User } from "../types/user.js";
import type { Domain } from "../types/domain.js";
import { Layout } from "../components/Layout.js";
import { deleteDomain, listDomains } from "../api/domainApi.js";
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

export function DomainsListPage() {
  const user = readLoggedInUser();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listDomains()
      .then(setDomains)
      .finally(() => setLoading(false));
  }, []);

  const filtered = domains.filter((domain) =>
    domain.name.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleDelete(domain: Domain): Promise<void> {
    if (!window.confirm(`Delete domain "${domain.name}"? This cannot be undone.`)) {
      return;
    }
    await deleteDomain(domain.id);
    setDomains((current) => current.filter((existing) => existing.id !== domain.id));
  }

  return (
    <Layout user={user}>
      <div className="domains-page">
        <h1>Domains</h1>
        <p className="page-subtitle">Manage all domains in the system</p>

        <div className="domains-toolbar">
          <input
            id="domainSearchInput"
            type="text"
            placeholder="Search domains..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <a id="newDomainBtn" href="/domains/new" className="button-primary">
            + New Domain
          </a>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table id="domainsTable">
            <thead>
              <tr>
                <th>Domain Name</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((domain) => (
                <tr key={domain.id} data-domain-name={domain.name}>
                  <td>{domain.name}</td>
                  <td>
                    <span className={`status-badge status-${domain.status.toLowerCase()}`}>
                      {domain.status}
                    </span>
                  </td>
                  <td>{new Date(domain.createdAt).toLocaleDateString()}</td>
                  <td className="domain-actions">
                    <button type="button" className="icon-button" aria-label={`View ${domain.name}`}>
                      👁
                    </button>
                    <button type="button" className="icon-button" aria-label={`Edit ${domain.name}`}>
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="icon-button icon-button-danger"
                      aria-label={`Delete ${domain.name}`}
                      onClick={() => void handleDelete(domain)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p id="domainsTotal" className="domains-total">
          Total: {filtered.length}
        </p>
      </div>
    </Layout>
  );
}
