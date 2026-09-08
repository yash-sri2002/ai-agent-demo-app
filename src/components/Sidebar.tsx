import React from "react";

/**
 * Loosely mirrors the real Hercules admin UI's left navigation structure
 * (System > Setup & Governance, Platform, Operations, Configuration) -
 * observed directly against the real app, not guessed. Only "Domains" is
 * a real working link; the rest are inert placeholders, since this is a
 * demo fixture standing in for a small slice of a much larger real app.
 */
export function Sidebar() {
  return (
    <nav id="sidebarNav" className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-heading">System</h3>
        <div className="sidebar-group">
          <span className="sidebar-group-label">Setup &amp; Governance</span>
          <a id="navDomains" href="/domains" className="sidebar-link">
            Domains
          </a>
          <a id="navAdministrators" href="#" className="sidebar-link sidebar-link-inert">
            Administrators
          </a>
          <a id="navLicensing" href="#" className="sidebar-link sidebar-link-inert">
            Licensing
          </a>
        </div>
      </div>
      <a id="navPlatform" href="#" className="sidebar-link sidebar-link-inert sidebar-top-level">
        Platform
      </a>
      <a id="navOperations" href="#" className="sidebar-link sidebar-link-inert sidebar-top-level">
        Operations
      </a>
      <a id="navConfiguration" href="#" className="sidebar-link sidebar-link-inert sidebar-top-level">
        Configuration
      </a>
      <a id="navHelp" href="#" className="sidebar-link sidebar-link-inert sidebar-top-level">
        Help
      </a>
    </nav>
  );
}
