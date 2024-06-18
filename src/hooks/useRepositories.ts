import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getRepositories,
  type GetRepositoriesParams,
} from '../api/getRepositories';
import { useStarredRepositories } from './useStarRepository';

const oneHourInMs = 1000 * 60 * 60;

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
