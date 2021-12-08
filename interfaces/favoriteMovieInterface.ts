export interface IFavoriteMovie {
  createdAt: string,
  id: number,
  movieid: number,
  uid: number
  updatedAt: string,
  freindid?: number,
}

export interface IMovieWithRating {
  createdAt: string,
  id: number,
  movieid: number,
  uid: number
  updatedAt: string,
  rating: number
}