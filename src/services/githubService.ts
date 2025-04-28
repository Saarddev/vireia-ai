
// GitHub API service to fetch repository information

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
}

/**
 * Fetches the latest commit from a specified GitHub repository
 * @param owner - The repository owner username
 * @param repo - The repository name
 * @returns Promise with the latest commit data
 */
export const fetchLatestCommit = async (
  owner: string, 
  repo: string
): Promise<GitHubCommit | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const commits = await response.json();
    return commits[0] || null;
  } catch (error) {
    console.error('Error fetching GitHub commit:', error);
    return null;
  }
};
