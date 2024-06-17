import { useSuspenseQuery } from '@tanstack/react-query';
import { getRepositories } from '../api/getRepositories';

export function useRepositories() {
  return useSuspenseQuery({
    queryKey: ['repositories'],
    queryFn: () => getRepositories(),
  });
}
