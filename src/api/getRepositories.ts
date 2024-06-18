import { stringifyFilter } from '../utils/githubFilter';
import type { GetRepositoriesError, GetRepositoriesResponse } from './types';

const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

export type GetRepositoriesParams = {
  language?: string;
  first?: number;
  page?: number;
};

export async function getRepositories({
  language,
  first = 20,
  page = 1,
}: GetRepositoriesParams = {}) {
  const [weekAgoAsDate] = new Date(Date.now() - weekInMilliseconds)
    .toISOString()
    .split('T');

  const filter = stringifyFilter({
    q: { created: `>=${weekAgoAsDate}`, visibility: 'public', language },
    sort: 'stars',
    order: 'desc',
    per_page: first,
    page,
  });

  // await new Promise((resolve) => setTimeout(resolve, 10000000));

  const response = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/repositories?${filter}`,
  );

  const data = (await response.json()) as
    | GetRepositoriesResponse
    | GetRepositoriesError;

  if ('items' in data) {
    return data;
  }

  throw Error(`Failed to fetch repositories: ${data.message}`);
}
