const isBackendDeployed = true;

export const BACKEND_URL = isBackendDeployed
  ? "https://hyrly-backend.isonikrish.workers.dev"
  : "http://localhost:8787";
