import { environment } from "../../environment/environment";

export class GithubService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = environment.baseUrl;
  }

  public async getUserInfoByUsername(username: string) {
    const url = `${this.baseUrl}/users/${username}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error to get user information from ${username}`);
      return await response.json();
    } catch (error) {
      console.error("There has been a problem with fetch pipi", error);
    }
  }

  public async getRepositoriesByUsername(username: string) {
    const url = `${this.baseUrl}/users/${username}/repos`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error to get repositories information from ${username}`);
      return await response.json();
    } catch (error) {
      console.error("There has been a problem with fetch pipi", error);
    }
  }
}
