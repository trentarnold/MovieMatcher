import StarRatings from 'react-star-ratings';
require('./RateMovieModal.css');

const RateMovieModal = (props: any) => {
  const handleSubmit = () => {
    props.submitRating();
    props.setRatingModalToggle(false);
  };

  const handleReset = () => {
    props.setNewRating(0);
    props.setRatingModalToggle(false);
  };

  return (
    <div className="rating-modal">
      <div className="rating-modal" onClick={handleReset}></div>
      <div className="rating-modal-input">
        <div className="modal-movie-title">{props.movie.title}</div>
        <div style={{paddingBottom: "0.5rem"}}>Rate:</div>
        <StarRatings
          rating={props.rating}
          changeRating={(rating) => props.setNewRating(rating)}
          starDimension="2rem"
          numberOfStars={5}
          starSpacing="1px"
          starRatedColor='gold'
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default RateMovieModal;
