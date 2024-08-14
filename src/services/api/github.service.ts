import { environment } from "../../environment/environment";

export class GithubService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = environment.baseUrl;
  }

  private handleRateLimitHeaders(headers: Headers): number {
    const remaining = headers.get("X-RateLimit-Remaining");
    console.log(remaining);
    return remaining ? parseInt(remaining, 10) : 0; // el segundo perimetro es la base
  }

  public async getUserInfoByUsername(username: string) {
    const url = `${this.baseUrl}/users/${username}`;

    try {
      const response = await fetch(url);
      const remainingRequests = this.handleRateLimitHeaders(response.headers);

      if (remainingRequests === 0) throw new Error("Rate limit exceeded");
      if (!response.ok)
        throw new Error(`Error to get user information from ${username}`);

      return await response.json();
    } catch (error) {
      console.error("There has been a problem with fetch pipi", error);
      throw error;
    }
  }

  public async getRepositoriesByUsername(username: string) {
    const url = `${this.baseUrl}/users/${username}/repos`;

    try {
      const response = await fetch(url);
      const remainingRequests = this.handleRateLimitHeaders(response.headers);

      if (remainingRequests === 0) throw new Error("Rate limit exceeded");

      if (!response.ok)
        throw new Error(
          `Error to get repositories information from ${username}`
        );
        
      return await response.json();
    } catch (error) {
      console.error("There has been a problem with fetch pipi", error);
      throw error;
    }
  }
}
