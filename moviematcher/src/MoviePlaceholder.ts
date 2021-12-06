import { Movie } from '../../interfaces/movieInterface';
import { MovieDetailsInterface } from '../../interfaces/MovieDetails';
export const moviePlaceholder:Movie = {
  adult: true,
  backdrop_path: 'String',
  genre_ids: [1,2],
  id: 1,
  original_language: 'String',
  original_title: 'String',
  overview: 'String',
  popularity: 2,
  poster_path: 'String',
  release_date: 'String',
  title: 'String',
  video: true,
  vote_average: 2,
  vote_count: 1
}
const productionCompany = {
  id: 1,
  logo_path: 'string',
  name: 'string',
  origin_country: 'string'
  }

  const productionCountries = {
    iso_3166_1: 'string',
    name: 'string'
  }

  const spokenLanguages = {
  english_name: 'string',
  iso_639_1: 'string',
  name: 'string'
  }
export const movieDetailsPlaceHolder:MovieDetailsInterface = {
  adult: true,
  backdrop_path: 'string',
  belongs_to_collection:'any',
  budget: 1,
  genres: [{id:1, name:'name'}],
  homepage: 'string',
  id: 1,
  imdb_id: 'string',
  original_language: 'string',
  original_title: 'string',
  overview: 'string',
  popularity: 1,
  poster_path: 'string',
  production_companies: [productionCompany],
  production_countries: [productionCountries],
  release_date: 'string',
  revenue: 1,
  runtime: 1,
  spoken_languages: [spokenLanguages],
  status: 'string',
  tagline: 'string',
  title: 'string',
  video: true,
  vote_average: 1,
  vote_count: 1
}
