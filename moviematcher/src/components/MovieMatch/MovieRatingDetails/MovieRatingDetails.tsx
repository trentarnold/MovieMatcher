import React, {useEffect, useState} from 'react'
import './MovieRatingDetails.css'
import APIService from '../../../services/APISevice'
import { IMovie } from '../../../../../interfaces/movieInterface'
import { IMovieDetails } from '../../../../../interfaces/MovieDetails'
import { movieDetailsPlaceHolder } from '../../../moviePlaceholder'
import StarRatings from 'react-star-ratings';
import ButtonHolder from '../../movie-page/movie-details/ButtonHolder'
import RateMovieModal from '../../movie-page/movie-details/RateMovieModal'
import {ServerApiService} from '../../../services/ServerApi';
import {useAppSelector, useAppDispatch} from '../../../redux/app/hooks';
import {selectAuth} from '../../../redux/features/modals/authSlice'
import {setActivities} from '../../../redux/features/user/activitiesSlice'
import {addRating} from '../../../redux/features/user/ratingsSlice'
import { IFavoriteMovie } from '../../../../../interfaces/favoriteMovieInterface'
import moment from 'moment';
type Props = {
  currentMovie:IMovie,
  handleAccept: () => void;
  handleDeny: () => void;
}

const MovieRatingDetails:React.FC<Props> = ({currentMovie, handleAccept, handleDeny}) => {
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>(movieDetailsPlaceHolder);
  const [streamProviders, setStreamProviders] = useState<any>({flatrate:[]});
  const [ratingModalToggle, setRatingModalToggle] = useState<boolean>(false);
  const [watchedMovies, setWatchedMovies] = useState<IFavoriteMovie[]>([])
  const accessToken = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [newRating, setNewRating] = useState<number>(0)
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
          setStreamProviders(fetchedStreamProviders.US);
      }
   }
   async function fetchWatchedMovie() {
    const movies = await ServerApiService.getWatchedMovies(accessToken);
    if (Array.isArray(movies)) {
        let movieArr:IFavoriteMovie[] = [];
        movies.map(movie => {
            if (movie.movieid === Number(currentMovie.id)) {
                movieArr.push(movie);
            }
            return movie;
        })
        setWatchedMovies(movieArr)
    }
}
    getMovieDetails()
    fetchStreamProviders()
    fetchWatchedMovie()
    return () => {
      isCancelled = true;
    }
  }, [currentMovie])

  const reduceToFiveStarRating = (averageVote:number):number => {
    return (averageVote / 2) ?? 1;
  }
  async function handleRatingSubmit() {
    ServerApiService.addRating(accessToken, currentMovie.id, newRating);
    const activities = await ServerApiService.getActivities(accessToken);
    dispatch(setActivities(activities));
    dispatch(addRating({movieid: currentMovie.id, rating: newRating}))
    setNewRating(0);
}
function sortWatchedMoviesByDate() {
  const sorted = watchedMovies.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
  })
  return sorted;
}
function daysSince(date: string) {
  const today = new Date().setHours(24, 0, 0, 0);
  const days = moment(today).diff(date, 'days');
  if (days === 0) return '(today)';
  if (days === 1) return '(1 day ago)';
  if (days > 1) return `(${days} days ago)`
}
  return (
    <div>
      {ratingModalToggle ? <RateMovieModal
        rating={newRating}
        setNewRating={setNewRating}
        setRatingModalToggle={setRatingModalToggle}
        submitRating={handleRatingSubmit}
        movie={currentMovie}
      /> : <div />}
      <div className='movie-details-container fixed-height'>
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
                <div className='movie-details-genres' style={{margin: "0.5rem 0"}}>
                                {movieDetails && movieDetails.genres && movieDetails.genres.length  == undefined ? <></> : movieDetails.genres?.map(genre => <div> {genre.name}</div>)}
                </div>

                {streamProviders.flatrate &&
                <>
                  <div style ={{textAlign:'center'}}>Stream On:</div>
                  <div className='movie-details-stream-providers'>
                      {streamProviders.flatrate.length && streamProviders.flatrate.map((provider:any) => <img key={provider.id} className = 'movie-details-stream-provider'
                       src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt='stream provider'/>)
                      }
                  </div>
                </>
                }
                <div className='movie-details-production-company'>
                    <div className='movie-details-company-logo-container'>
                    {movieDetails.production_companies.map((company:any, index:number) => {
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
            <ButtonHolder movie = {movieDetails} setRatingModalToggle={setRatingModalToggle} setNewRating={setNewRating} watchedMovies={watchedMovies} 
                                        setWatchedMovies={setWatchedMovies}  flexColumn={false} />
            {watchedMovies.length 
              ? <div className="last-watched-container">
                  <div className="last-watched-details-header">You watched this on:</div>
                  {sortWatchedMoviesByDate().map(watchedMovie => <div className="last-watched-details">{moment(watchedMovie.createdAt).format('dddd MMM D, YYYY')} {daysSince(watchedMovie.createdAt)}</div>)}
              </div>
              : <div />
          }
          </div>
          <div>
              <img className='movie-details-image' src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="movie poster"/>
          </div>
        </div>
      </div>
  )
}

export default MovieRatingDetails
