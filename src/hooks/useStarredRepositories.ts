import { useCallback, useMemo, useState, useTransition } from 'react';
import { GetRepositoriesResponse, Repository } from '../api/types';

function addRepo(repo: Repository) {
  window.localStorage.setItem(
    `github-repo-${repo.id}`,
    JSON.stringify(repo, undefined, 0),
  );
}

function removeRepo(repo: Repository) {
  window.localStorage.removeItem(`github-repo-${repo.id}`);
}

const hasStarred = (repo: Repository) => {
  return !!window.localStorage.getItem(`github-repo-${repo.id}`);
};

function fetchStarredRepositories() {
  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith('github-repo-'))
    .map((key) => {
      const value = window.localStorage.getItem(key);

      if (!value)
        throw Error(`[fetchStarredRepositories]: couldn't find key "${key}"`);

      return JSON.parse(value) as Repository;
    });
}

function isLocalStorageAvailable() {
  try {
    const testKey = '__availability-test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

type StarredRepositoriesOptions = {
  skip?: boolean;
};

/**
 Hook to handle the logic of storing fetched repository in local storage that were starred by the user.
 For simplicity does not check if local storage is over filled or if data stored matches the API schema.

 Points for improvement:
  - Add a limit to the number of starred repositories
  - Add pagination to the starred repositories
  - Handle QuotaExceededError when local storage is full
  - Use zod to validate the data retrieved from local storage
*/
export function useStarredRepositories({
  skip = false,
}: StarredRepositoriesOptions = {}) {
  const [isPending, startTransition] = useTransition();
  const [isStarringAvailable, setStarringAvailable] = useState(
    isLocalStorageAvailable,
  );

  const [starredRepos, setStarredRepos] = useState<Repository[]>(
    skip || !isStarringAvailable ? [] : fetchStarredRepositories(),
  );

  const toggleStar = useCallback((repo: Repository) => {
    if (!isLocalStorageAvailable()) {
      setStarringAvailable(false);
      return;
    }

    startTransition(() => {
      if (hasStarred(repo)) {
        removeRepo(repo);
        setStarredRepos((repos) => repos.filter((r) => r.id !== repo.id));
      } else {
        addRepo(repo);
        setStarredRepos((repos) => [...repos, repo]);
      }
    });
  }, []);

  const refetchStarredRepositories = useCallback(() => {
    startTransition(() => {
      setStarredRepos(fetchStarredRepositories());
    });
  }, []);

  const data = useMemo<GetRepositoriesResponse>(
    () => ({
      items: starredRepos,
      total_count: starredRepos.length,
      incomplete_results: false,
    }),
    [starredRepos],
  );

  return {
    data,
    isPending,
    isStarringAvailable,
    toggleStar,
    hasStarred,
    refetchStarredRepositories,
  };
}
