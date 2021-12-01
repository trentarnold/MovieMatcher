import { connectDB } from '../index'
import User from '../User';

connectDB();

async function find() {
  // const res = await User.findAll()
  // console.log(res)
  const res = await User.findOne<any>({where: {id: 1}, include:["watched_movies", "ratings", "friends", "whitelist", "blacklist"]})
  if (res) {
    console.log('+++++++++++ watched movies', res.dataValues.watched_movies.map((m:any) => m.dataValues))
    console.log('+++++++++++ ratings', res.dataValues.ratings.map((m:any) => m.dataValues))
    console.log('+++++++++++ friends', res.dataValues.friends.map((m:any) => m.dataValues))
    console.log('+++++++++++ whitelist', res.dataValues.whitelist.map((m:any) => m.dataValues))
    console.log('+++++++++++ blacklist', res.dataValues.blacklist.map((m:any) => m.dataValues))
  }
}

find();
