import React from 'react'
import './ActorList.css'
type Props = {
  actor:any
}
const ActorThumb:React.FC<Props> = ({actor}) => {
  return (
      <div className="actor-thumb">
         <img className='actor-thumb-img' src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt='movie poster' />   
            {/* <div className='movie-thumb-img-background'>
              <p> {actor.title}</p>
              <StarRatings
                  rating={reduceToFiveStarRating(movie.vote_average)}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor='gold' />
              <Button style={{backgroundColor:'transparent'}}
                     className='btn hidden-background'
                     onClick={() => {
                      navigate(`/movieDetails/${movie.id}`)
                     }}>
                     More Details
              </Button>
            </div>   */}

        </div>
  )
}

export default ActorThumb
