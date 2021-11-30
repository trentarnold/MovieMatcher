import { connectDB } from './index'
import User from './user';

connectDB();

async function find() {
  // const res = await User.findAll()
  // console.log(res)
  const res = await User.findOne<any>({where: {id: 1}, include:["watched_movies"]})
  if (res) {
    console.log(res.dataValues.watched_movies, 'results')
  }
}

find();
