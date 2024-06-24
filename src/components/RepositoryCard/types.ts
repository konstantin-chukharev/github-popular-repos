import type { Repository } from 'src/api/types';

export type RepositoryCardOwner = Pick<
  Repository['owner'],
  'login' | 'type' | 'avatar_url' | 'html_url'
>;

export type RepositoryCardData = Pick<
  Repository,
  | 'html_url'
  | 'name'
  | 'description'
  | 'topics'
  | 'stargazers_count'
  | 'language'
  | 'created_at'
  | 'updated_at'
> & { owner: RepositoryCardOwner };

export type RepositoryCardProps = {
  repository: RepositoryCardData;
  toggleStar: () => void;
  hasStarred: () => boolean;
  isStarringAvailable: boolean;
};
