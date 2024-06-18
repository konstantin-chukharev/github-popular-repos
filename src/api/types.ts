export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: `https://api.github.com/licenses/${string}`;
  node_id: string;
};

export type Owner<Login extends string = string, ID extends number = number> = {
  login: Login;
  id: ID;
  node_id: string;
  avatar_url: `https://avatars.githubusercontent.com/u/${ID}?v=4`;
  gravatar_id: string;
  url: `https://api.github.com/users/${Login}`;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: `https://api.github.com/users/${Login}/gists{/gist_id}`;
  starred_url: `https://api.github.com/users/${Login}/starred{/owner}{/repo}`;
  subscriptions_url: `https://api.github.com/users/${Login}/subscriptions`;
  organizations_url: `https://api.github.com/users/${Login}/orgs`;
  repos_url: `https://api.github.com/users/${Login}/repos`;
  events_url: `https://api.github.com/users/${Login}/events{/privacy}`;
  received_events_url: `https://api.github.com/users/${Login}/received_events`;
  type: 'Organization' | 'User';
  site_admin: boolean;
};

export type Repository<
  Name extends string = string,
  OwnerLogin extends string = string,
> = {
  id: number;
  node_id: string;
  name: Name;
  full_name: `${OwnerLogin}/${Name}`;
  private: boolean;
  owner: Owner<OwnerLogin>;
  html_url: `https://github.com/${OwnerLogin}/${Name}`;
  description: string;
  fork: false;
  url: `https://api.github.com/repos/${OwnerLogin}/${Name}`;
  forks_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/forks`;
  keys_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/keys{/key_id}`;
  collaborators_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/collaborators{/collaborator}`;
  teams_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/teams`;
  hooks_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/hooks`;
  issue_events_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/issues/events{/number}`;
  events_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/events`;
  assignees_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/assignees{/user}`;
  branches_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/branches{/branch}`;
  tags_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/tags`;
  blobs_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/git/blobs{/sha}`;
  git_tags_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/git/tags{/sha}`;
  git_refs_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/git/refs{/sha}`;
  trees_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/git/trees{/sha}`;
  statuses_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/statuses/{sha}`;
  languages_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/languages`;
  stargazers_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/stargazers`;
  contributors_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/contributors`;
  subscribers_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/subscribers`;
  subscription_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/subscription`;
  commits_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/commits{/sha}`;
  git_commits_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/git/commits{/sha}`;
  comments_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/comments{/number}`;
  issue_comment_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/issues/comments{/number}`;
  contents_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/contents/{+path}`;
  compare_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/compare/{base}...{head}`;
  merges_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/merges`;
  archive_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/{archive_format}{/ref}`;
  downloads_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/downloads`;
  issues_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/issues{/number}`;
  pulls_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/pulls{/number}`;
  milestones_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/milestones{/number}`;
  notifications_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/notifications{?since,all,participating}`;
  labels_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/labels{/name}`;
  releases_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/releases{/id}`;
  deployments_url: `https://api.github.com/repos/${OwnerLogin}/${Name}/deployments`;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: `git://github.com/${OwnerLogin}/${Name}.git`;
  ssh_url: `git@github.com:${OwnerLogin}/${Name}.git`;
  clone_url: `https://github.com/${OwnerLogin}/${Name}.git`;
  svn_url: `https://github.com/${OwnerLogin}/${Name}`;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License;
  allow_forking: true;
  is_template: false;
  web_commit_signoff_required: false;
  topics: string[];
  visibility: 'public' | 'private';
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  score: number;
};

export type GetRepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
};

export type GetRepositoriesError = {
  message: string;
  documentation_url: 'https://docs.github.com/v3/search/';
  status: string;
};

export type ReposQueryParams = {
  searchToken?: string;
  created?: string;
  language?: string;
  visibility?: 'public' | 'private';
};

export type ReposFilter = {
  q: ReposQueryParams;
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
  order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
};
