import React, {useEffect, useState} from 'react'
import './MovieRatingDetails.css'
import APIService from '../../../services/APISevice'
import { Movie } from '../../../../../interfaces/movieInterface'
import { MovieDetailsInterface } from '../../../../../interfaces/MovieDetails'
import { movieDetailsPlaceHolder } from '../../../moviePlaceholder'
import StarRatings from 'react-star-ratings';
import ButtonHolder from '../../movie-page/movie-details/ButtonHolder'
import { Button } from '@chakra-ui/react'
import { FaThumbsUp, FaThumbsDown} from 'react-icons/fa';
type Props = {
  currentMovie:Movie,
  handleAccept: () => void;
  handleDeny: () => void;
}

const MovieRatingDetails:React.FC<Props> = ({currentMovie, handleAccept, handleDeny}) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsInterface>(movieDetailsPlaceHolder);
  const [streamProviders, setStreamProviders] = useState<any>();
  useEffect(() => {
    if(currentMovie.title === 'String') return
    let isCancelled = false;
    const getMovieDetails = async() => {
      const details = await APIService.getIndividualMovie(currentMovie.id)
      if(!isCancelled) {
        setMovieDetails(details)
      }
    }
    async function fetchStreamProviders () {
      const fetchedStreamProviders = await APIService.getStreamProviders(currentMovie.id);
      if(!isCancelled && fetchedStreamProviders.US) {
          setStreamProviders(fetchedStreamProviders.US.flatrate);
      }
   }
    getMovieDetails()
    fetchStreamProviders()
    return () => {
      isCancelled = true;
    }
  }, [currentMovie])
  const reduceToFiveStarRating = (averageVote:number):number => {
    return (averageVote / 2);
  }
  return (
    <div>
      <div className='movie-details-container'>
            <div className='movie-details-information-container'>
                <div className ='movie-details-title-container'>
                <div className='movie-details-title'>{currentMovie.title}</div>
                <StarRatings
                    rating={reduceToFiveStarRating(currentMovie.vote_average)}
                    starDimension="2rem"
                    starSpacing="1px"
                    starRatedColor='gold'
                     />
                <div style={{color:'white', marginLeft:'10px'}}>({currentMovie.vote_count})</div>
                </div>
                <div className='movie-details-description'>{currentMovie.overview}</div>
                <div className='movie-details-genres'>
                        {movieDetails.genres.map(genre => <div key={genre.id}> {genre.name}</div>)}
                </div>

                {streamProviders &&
                <>
                  <div style ={{textAlign:'center'}}>Stream On:</div>
                  <div className='movie-details-stream-providers'>
                      {streamProviders.length && streamProviders.map((provider:any) => <img key={provider.id} className = 'movie-details-stream-provider'
                       src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt='stream provider'/>)
                      }
                  </div>
                </>
                }
                <div className='movie-details-production-company'>
                    <div className='movie-details-company-logo-container'>
                    {movieDetails.production_companies.map((company, index) => {
                        return (
                            <div>
                                {company.logo_path && index < 5?
                                    <div key={company.id}>
                                    <img className ='movie-details-company-logo'src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} alt="production company"/>
                                    </div>
                                    : ''
                                }
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className='movie-details-release-runtime'>
                    <div className='movie-details-release-date'> <span style={{color:'grey', fontStyle:'italic'}}> Released on:  </span>{currentMovie.release_date}</div>
                    <div className='movie-details-runtime'> <span style={{color:'grey', fontStyle:'italic'}}> Runtime: </span> {movieDetails.runtime} Minutes</div>
            </div>
            <ButtonHolder movie = {movieDetails} />
          </div>
          <div>
              <img className='movie-details-image' src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="movie poster"/>
          </div>
        </div>
      </div>
  )
}

export default MovieRatingDetails
