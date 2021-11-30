import Rating from '../rating';

export async function populateRatings() {
  await Rating.create({
    uid: 1,
    movieid: 580489,
    rating: 5
  })
  await Rating.create({
    uid: 1,
    movieid: 566525,
    rating: 4
  })
  await Rating.create({
    uid: 2,
    movieid: 568124,
    rating: 5
  })
  await Rating.create({
    uid: 3,
    movieid: 512195,
    rating: 2
  })
}