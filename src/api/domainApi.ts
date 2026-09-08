import type { Domain } from "../types/domain.js";

export async function listDomains(): Promise<Domain[]> {
  const response = await fetch("/api/domains");
  if (!response.ok) {
    throw new Error("Failed to load domains.");
  }
  return response.json();
}

export interface CreateDomainInput {
  name: string;
  status: "Active" | "Inactive";
  description?: string;
}

export async function createDomain(input: CreateDomainInput): Promise<Domain> {
  const response = await fetch("/api/domains", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? "Failed to create domain.");
  }

  return response.json();
}
