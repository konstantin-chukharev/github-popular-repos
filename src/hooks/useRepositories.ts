import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getRepositories,
  type GetRepositoriesParams,
} from '../api/getRepositories';
import { useStarredRepositories } from './useStarredRepositories';

const oneHourInMs = 1000 * 60 * 60;

/**
 Hook to return repository search data from GitHub API.
 Supports language filter and pagination.
 If starred is set to true, it will return starred repositories from local storage instead.
 Also provides controls and additional flags related to starring:
  - toggleStar: function to star/unstar a repository
  - hasStarred: function to check if a repository is starred
  - isPending: flag to indicate if a star operation is pending
  - isStarringAvailable: flag to indicate if local storage is available for starring
*/
export function useRepositories(
  options: GetRepositoriesParams & { starred?: boolean },
) {
  const { starred, ...params } = options;

  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['repositories', params.first, params.page, params.language],
    queryFn: () => getRepositories(params),
    staleTime: oneHourInMs,
  });

  const { data: starredData, ...controls } = useStarredRepositories({
    skip: !starred,
  });

  if (starred) {
    return { data: starredData, ...controls };
  }

  if (error && !isFetching) {
    throw error;
  }

  return { data, ...controls };
}
