// import Rating, { RatingAttributes } from "../rating";

// // helper 
// async function checkRating(id: number, movieID: number) {
//   const exists = Rating.findOne({ where: { uid: id, movieid: movieID }});
//   return exists ? exists.dataValues : null;
// }

// export async function getRatingsQueryByID(id: number): Promise<RatingAttributes | string> {
//   const ratings = await Rating.findAll({ where: { uid: id }});
//   if (!ratings.length) return 'no ratings';
//   else return ratings.dataValues;
// }

// export async function getRatingsQueryByMovie(movieID: number): Promise<RatingAttributes | string> {
//   const ratings = await Rating.findAll({ where: { movieid: movieID }});
//   if (!ratings.length) return 'no ratings';
//   else return ratings.dataValues;
// }

// export async function addRatingQuery(id: number, movieID: number, rating: number): Promise<RatingAttributes | string> {
//   const exists = await checkRating(id, movieID);
//   if (exists) return 'already rated'
//   else {
//     const newRating = await Rating.create({ uid: id, movieid: movieID, rating })
//     return newRating.dataValues ? newRating.dataValues : 'error'
//   }
// }

// export async function deleteRatingQuery(id: number, movieID: number): Promise<RatingAttributes | string> {
//   const exists = await checkRating(id, movieID);
//   if (!exists) return 'not yet rated'
//   else {
//     await Rating.destroy({ where: {uid: id, movieid: movieID }})
//   }
// }