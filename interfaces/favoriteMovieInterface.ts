export interface FavoriteMovieInterface {
  createdAt: string,
  id: number,
  movieid: number,
  uid: number
  updatedAt: string,
  freindid?: number,
}

export interface MovieWithRatingInterface {
  createdAt: string,
  id: number,
  movieid: number,
  uid: number
  updatedAt: string,
  rating: number
}