export type Credit = {
  id: number;
  overview: string;
  vote_count: number;
  poster_path: string;
  title?: string;
  name?: string;
};

export type Actor = {
  name: string;
  id: number;
  profile_path: string;
  popularity: number;
};

export type Result = {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
};
