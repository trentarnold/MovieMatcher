async function addtoActivity (res, req) {
  try{
    const newActivity = await db.Activity.create(req.body);
    if(newActivity){
      res.status(201).send(newActivity);
    } else {
      res.status(400).send(`Couldn't make new Activity`);
    }
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function getActivity (res, req) {
  try {
    const {user} = req.body;
   // const activity = await db.Activity.findAll( {where: }) waiting on DB to fill search in.
   res.status(200).send(activity);
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function addRating (req, res) {
  try {
    const newRating = await db.Ratings.create(req.body);
    if(newRating){
      res.status(201).send(newRating);
    } else {
      res.status(400).send(`Couldn't add rating`);
    }
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

async function getRating (req, res) {
  try {
    const {User, Movie} = req.body;
   // const rating = await db.Rating.findOne({ where: }) //Waiting on DB for search.
   if(rating){
    res.status(201).send(rating);
   } else {
     res.status(400).send(`Rating couldn't be found...`)
   }
  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500)
  }
}

module.exports = {
  addtoActivity,
  getActivity,
  addRating,
  getRating,

}