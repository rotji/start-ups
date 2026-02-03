// Use-case interface for searching Startups
export interface SearchStartupsInput {
  query?: string;
  category?: string;
  problem?: string;
  stage?: string;
  page?: number;
  pageSize?: number;
}

export interface SearchStartupsOutput {
  startups: any[]; // Should be Startup[], but kept generic for interface
  total: number;
}

export interface ISearchStartupsUseCase {
  execute(input: SearchStartupsInput): Promise<SearchStartupsOutput>;
}
