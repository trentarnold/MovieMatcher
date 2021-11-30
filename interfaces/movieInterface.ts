export interface Movie {
  adult: Boolean,
  backdrop_path: String,
  genre_ids: number[],
  id: number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: number,
  vote_count: number
}

export interface Results {
  results: Movie[]
}