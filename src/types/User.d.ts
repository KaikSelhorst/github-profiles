export interface User {
  login: string;
  html_url: string;
  avatar_url: string;
  followers_url: string;
  repos_url: string;
  name: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
}
export interface UserRepo {
  name: string;
  html_url: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
}
