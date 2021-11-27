function addtoActivity (res, req) {
  try{

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

function getActivity (res, req) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

function addRating (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
}

function getRating (req, res) {
  try {

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