/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_GITHUB_API_URL: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
