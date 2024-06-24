import { http, HttpResponse } from 'msw';
import { GetRepositoriesError, GetRepositoriesResponse } from 'src/api/types';

export const createGetRepositoriesHandler = ({
  hasError,
  emptyCollection,
}: { hasError?: boolean; emptyCollection?: boolean } = {}) => {
  const path = `${import.meta.env.VITE_GITHUB_API_URL}/search/repositories`;

  if (hasError) {
    return http.get(path, () =>
      HttpResponse.json(
        {
          message: 'Internal Server Error',
          status: '500',
          documentation_url: 'https://docs.github.com/v3/search/',
        } satisfies GetRepositoriesError,
        { status: 500, statusText: 'Internal Server Error', type: 'error' },
      ),
    );
  }

  if (emptyCollection) {
    return http.get(path, () =>
      HttpResponse.json({
        total_count: 0,
        incomplete_results: false,
        items: [],
      } satisfies GetRepositoriesResponse),
    );
  }

  return http.get(path, async () => {
    const res = await import('./getRepositories.json');
    return HttpResponse.json(res);
  });
};
