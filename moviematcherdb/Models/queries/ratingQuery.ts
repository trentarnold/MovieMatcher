import { connectDB } from "..";
import Rating, { RatingAttributes } from "../rating";

// helper 
async function checkRating(id: number, movieID: number) {
  const exists = await Rating.findOne({ where: { uid: id, movieid: movieID }});
  return exists ? exists.dataValues : null;
}

export async function getRatingsByIDQuery(id: number): Promise<RatingAttributes[] | string> {
  const ratings = await Rating.findAll({ where: { uid: id }});
  if (!ratings.length) return 'no ratings';
  else {
    const cleanRatings: RatingAttributes[] = [];
    for (let rating of ratings) {
      if (rating.dataValues) cleanRatings.push(rating.dataValues)
    }
    return cleanRatings;
  };
}

export async function getRatingsByMovieQuery(movieID: number): Promise<RatingAttributes[] | string> {
  const ratings = await Rating.findAll({ where: { movieid: movieID }});
  if (!ratings.length) return 'no ratings';
  else {
    const cleanRatings: RatingAttributes[] = [];
    for (let rating of ratings) {
      if (rating.dataValues) cleanRatings.push(rating.dataValues)
    }
    return cleanRatings;
  };
}

export async function addRatingQuery(id: number, movieID: number, rating: number): Promise<RatingAttributes[] | string> {
  const exists = await checkRating(id, movieID);
  if (exists) return 'already rated'
  else {
    await Rating.create({ uid: id, movieid: movieID, rating })
    return await getRatingsByIDQuery(id);
  }
}

export async function deleteRatingQuery(id: number, movieID: number): Promise<RatingAttributes[] | string> {
  const exists = await checkRating(id, movieID);
  if (!exists) return 'not yet rated'
  else {
    await Rating.destroy({ where: {uid: id, movieid: movieID }})
    return await getRatingsByIDQuery(id);
  }
}

async function run() {
  await connectDB();
  console.log(await getRatingsByMovieQuery(512195));
  // console.log(await addRatingQuery(1, 512195, 5));
}

// run()