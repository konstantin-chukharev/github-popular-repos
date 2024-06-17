import { stringifyFilter } from '../utils/filter';
import type { GetRepositoriesResponse } from './types';

const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

type GetRepositoriesParams = {
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
    q: { created: weekAgoAsDate, visibility: 'public', language },
    sort: 'stars',
    order: 'desc',
    per_page: first,
    page,
  });

  const response = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/repositories?${filter}`,
  );

  return response.json() as Promise<GetRepositoriesResponse>;
}
