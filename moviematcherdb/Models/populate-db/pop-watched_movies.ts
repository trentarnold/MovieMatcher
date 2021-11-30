import WatchedMovie from '../watched_movie';

export async function populateWatchedMovies() {
  await WatchedMovie.create({
    uid: 1,
    movieid: 580489,
    friendid: 1,
  })
  await WatchedMovie.create({
    uid: 2,
    movieid: 580489,
    friendid: 3
  })
  await WatchedMovie.create({
    uid: 1,
    movieid: 566525,
    friendid: 3
  })
  await WatchedMovie.create({
    uid: 3,
    movieid: 512195,
    friendid: 2
  })
  await WatchedMovie.create({
    uid: 2,
    movieid: 568124,
    friendid: 1
  })
}