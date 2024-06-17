import { stringifyFilter } from '../utils/filter';
import type { GetRepositoriesResponse } from './types';

export async function getRepositories() {
  const filter = stringifyFilter({ q: { created: '2017-01-10' } });

  const response = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/repositories?${filter}`,
  );

  return response.json() as Promise<GetRepositoriesResponse>;
}
