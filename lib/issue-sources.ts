// This file centralizes all external data sources for issues.
// Add or adjust sources here to control where issue data is pulled from.

export interface IssueSource {
  id: string;
  name: string;
  fetchUrl: string;
  type: "github" | "custom" | string;
  // Add more config fields as needed
}

export const ISSUE_SOURCES: IssueSource[] = [
  {
    id: "cds-github-standards-maintenance",
    name: "CDS Standards Maintenance (GitHub)",
    fetchUrl: "https://api.github.com/repos/ConsumerDataStandardsAustralia/standards-maintenance/issues",
    type: "github",
  },
  // Add more sources here as needed
];
