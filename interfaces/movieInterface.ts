export interface Movie {
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array<Number>,
    id: number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: string,
    video: Boolean,
    vote_average: number,
    vote_count: number
}

export interface Results {
  results: Movie[],
  page?: Number,
  total_pages?:Number,
  total_results?:Number
}

