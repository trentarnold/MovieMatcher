import WatchedMovie, { WatchedMovieAttributes } from "../watched_movie";
import { Op } from "sequelize";


export async function fetchWatchedMoviesQuery(id: number): Promise<WatchedMovieAttributes[] | string> {
  const watchedMoviesDirtyArr: WatchedMovieAttributes[] = [];
  const uidMovies = await WatchedMovie.findAll({ where: { uid: id }});
  const fidMovies = await WatchedMovie.findAll({ where: { friendid: id }});
  if (uidMovies.length === 0 && fidMovies.length === 0) return 'no movies'
  uidMovies.map(movie => {
    if (movie.dataValues) watchedMoviesDirtyArr.push(movie.dataValues);
  })
  fidMovies.map(movie => {
    if (movie.dataValues) watchedMoviesDirtyArr.push(movie.dataValues);
  })
  const movieSet = new Set(watchedMoviesDirtyArr);
  const movieArr = [...movieSet];
  return movieArr
}

export async function addWatchedMovieQuery(id: number, movieID: number, friendID: number = 0, createdDate: Date = new Date(Date.now())): Promise<WatchedMovieAttributes | undefined> {
  const movie = await WatchedMovie.create({ uid: id, movieid: movieID, friendid: friendID, createdAt: createdDate });
  return movie.dataValues ? movie.dataValues : undefined;
}

export async function timesWatchedMovieQuery(id: number, movieID: number): Promise<number> {
  const moviesLen = await WatchedMovie.count({ where: { [Op.and]: [ {movieid: movieID}, {[Op.or]: [{ uid: id }, { friendid: id }]} ] }});
  return moviesLen;
}