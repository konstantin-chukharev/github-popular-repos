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

      console.log(value);

      return JSON.parse(value) as Repository;
    });
}

type StarredRepositoriesOptions = {
  skip?: boolean;
};

export function useStarredRepositories({
  skip = false,
}: StarredRepositoriesOptions = {}) {
  const [isPending, startTransition] = useTransition();

  const [starredRepos, setStarredRepos] = useState<Repository[]>(
    skip ? [] : fetchStarredRepositories(),
  );

  const toggleStar = useCallback((repo: Repository) => {
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
    toggleStar,
    hasStarred,
    refetchStarredRepositories,
  };
}
