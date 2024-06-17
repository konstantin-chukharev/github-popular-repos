import { useCallback, useState } from 'react';

function _addStar(name: string) {
  window.localStorage.setItem(`github-repo-${name}`, 'starred');
}

function _removeStar(name: string) {
  window.localStorage.removeItem(`github-repo-${name}`);
}

function fetchStarredRepositoryNames() {
  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith('github-repo-'))
    .map((key) => key.replace('github-repo-', ''));
}

export function useStarRepository(name: string | undefined) {
  const [isStarred, setIsStarred] = useState(
    () =>
      !!name &&
      window.localStorage.getItem(`github-repo-${name}`) === 'starred',
  );

  const toggleStar = useCallback(() => {
    setIsStarred((_starred) => {
      if (!name) return _starred;

      if (_starred) {
        _removeStar(name);
        return false;
      }

      _addStar(name);
      return true;
    });
  }, [name]);

  return { isStarred, toggleStar };
}
