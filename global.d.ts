declare type Actor = {
  name: string;
  id: number;
  profile_path: string;
  popularity: number;
};
declare type Credit = {
  id: number;
  overview: string;
  vote_count: number;
  poster_path: string;
  title?: string;
  name?: string;
  genre_ids: number[];
  media_type: string;
};

declare type Result =
  | undefined
  | [
      {
        cast: Credit[];
      }
    ];

// declare type Result = {
//   page: number;
//   results: Actor[];
//   total_pages: number;
//   total_results: number;
// };
