const isBackendDeployed = false;

export const BACKEND_URL = isBackendDeployed
  ? import.meta.env.VITE_BACKEND_URL
  : "http://localhost:8787";
