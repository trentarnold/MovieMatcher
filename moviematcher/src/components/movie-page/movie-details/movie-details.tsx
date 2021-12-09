import './movie-details.css'
import {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import APIService from '../../../services/APISevice';
import { IMovieDetails } from '../../../../interfaces/MovieDetails';
import { movieDetailsPlaceHolder } from '../../../moviePlaceholder';
import StarRatings from 'react-star-ratings';
import ActorsList from '../../actors-list/ActorsList';
import ButtonHolder from './ButtonHolder';
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import RateMovieModal from './RateMovieModal';
import { ServerApiService } from '../../../services/ServerApi';
import { addRating } from '../../../redux/features/user/ratingsSlice';
import { setActivities } from '../../../redux/features/user/activitiesSlice';
import { IFavoriteMovie } from '../../../../interfaces/favoriteMovieInterface';
import moment from 'moment';

const MovieDetails = () => {

  const { id }: any = useParams();
  const accessToken = useAppSelector(selectAuth);
  const [currentMovie, setCurrentMovie] = useState<IMovieDetails>(movieDetailsPlaceHolder)
  const [streamProviders, setStreamProviders] = useState<any>();
  const [newRating, setNewRating] = useState<number>(0)
  const [ratingModalToggle, setRatingModalToggle] = useState<boolean>(false)
  const [watchedMovies, setWatchedMovies] = useState<IFavoriteMovie[]>([])
  const dispatch = useAppDispatch();

  useEffect(() => {
    setWatchedMovies([]);

    let isCancelled = false;
    const fetchMovie = async () => {
      try {
        const movieDetails = await APIService.getIndividualMovie(id);
        if(!isCancelled) {
          setCurrentMovie(movieDetails);
        }
      } catch (e) {
          console.error(e);
      };
    };

    const fetchStreamProviders = async () => {
      try {
        const fetchedStreamProviders = await APIService.getStreamProviders(id);
        console.log(fetchedStreamProviders)
        if(!isCancelled && fetchedStreamProviders.results?.US?.flatrate) {
          setStreamProviders(fetchedStreamProviders.results?.US?.flatrate);
        }
      } catch (e) {
        console.error(e);;
      };
    };

    const fetchWatchedMovie = async () => {
      try {
        const movies = await ServerApiService.getWatchedMovies(accessToken);
        if (Array.isArray(movies)) {
          let movieArr:IFavoriteMovie[] = [];
          movies.map(movie => {
            if (movie.movieid === Number(id)) {
              movieArr.push(movie);
            }
            return movie;
          })
          setWatchedMovies(movieArr)
        }
      } catch (e) {
          console.error(e);;
      };
    };

    fetchMovie();
    fetchStreamProviders();
    fetchWatchedMovie();

    return () => {
      isCancelled = true
    };

  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, );

  const reduceToFiveStarRating = (averageVote:number):number => {
    return (averageVote / 2);
  };

  const handleRatingSubmit = async () => {
    try {
      ServerApiService.addRating(accessToken, currentMovie.id, newRating);
      const activities = await ServerApiService.getActivities(accessToken);
      dispatch(setActivities(activities));
      dispatch(addRating({movieid: currentMovie.id, rating: newRating}))
      setNewRating(0);
    } catch (e) {
      console.error(e);
    };
  };

  useEffect(()=> {
    console.log(streamProviders)
  },[streamProviders])

  const daysSince = (date: string) => {
    const today = new Date().setHours(24, 0, 0, 0);
    const days = moment(today).diff(date, 'days');
    if (days === 0) return '(today)';
    if (days === 1) return '(1 day ago)';
    if (days > 1) return `(${days} days ago)`
  }

  const sortWatchedMoviesByDate = () => {
    const sorted = watchedMovies.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });
    return sorted;
  };

  return (
    <div style={{marginTop: "1.5rem"}}>     
      {ratingModalToggle ? <RateMovieModal
        rating={newRating}
        setNewRating={setNewRating}
        setRatingModalToggle={setRatingModalToggle}
        submitRating={handleRatingSubmit}
        movie={currentMovie}
        /> : <div />
      }
      <div className='movie-details-container'>
        <div className='movie-details-information-container'>
          <div className ='movie-details-title-container'>
            <div className='movie-details-title'>{currentMovie.title}</div>
            <StarRatings
              rating={reduceToFiveStarRating(currentMovie?.vote_average)}
              starDimension="2rem"
              starSpacing="1px"
              starRatedColor='gold'
            />
            <div style={{color:'white', marginLeft:'10px'}}>({currentMovie.vote_count})</div>
          </div>
          <div className='movie-details-description'>{currentMovie.overview}</div>
          <div className='movie-details-genres' style={{margin: "0.5rem 0"}}>
            {currentMovie.genres?.map(genre => <div> {genre.name}</div>)}
          </div>
          {streamProviders
            ? <div>
              <div style ={{textAlign:'center'}}>Stream On:</div>
              <div className='movie-details-stream-providers'>
                {streamProviders && streamProviders.map((provider:any) => <img className = 'movie-details-stream-provider' src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt='stream provider' title={provider.provider_name}/>)
                }
              </div>
            </div>
            : <div style ={{textAlign:'center', marginBottom: "0.75rem", color: "red"}}>Not Found on Any Streaming Services</div>
          }
          <div className='movie-details-release-runtime'>
            <div className='movie-details-release-date'>
              <span style={{color:'grey', fontStyle:'italic'}}>Release Date:  </span>
              {currentMovie.release_date}
            </div>
            <div className='movie-details-runtime'>
              <span style={{color:'grey', fontStyle:'italic'}}> Runtime: </span> {currentMovie.runtime} Minutes
            </div>
          </div>
          <div className='movie-details-production-company'>
            <div className='movie-details-company-logo-container'>
              {currentMovie.production_companies?.map((company, index) => {
                return (
                  <div>
                    {company.logo_path && index < 5?
                      <div>
                      <img className ='movie-details-company-logo'src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} alt="production company"/>
                      </div>
                      : ''
                    }
                  </div>
                )
              })}
            </div>
          </div>
          {accessToken ? <ButtonHolder setRatingModalToggle={setRatingModalToggle} setNewRating={setNewRating} watchedMovies={watchedMovies}
            setWatchedMovies={setWatchedMovies} movie={currentMovie} flexColumn={false}/> : <div />
          }
          {watchedMovies.length
            ? <div className="last-watched-container">
              <div className="last-watched-details-header">You watched this on:</div>
              {sortWatchedMoviesByDate().map(watchedMovie => <div className="last-watched-details">{moment(watchedMovie.createdAt).format('dddd MMM D, YYYY')} {daysSince(watchedMovie.createdAt)}</div>)}
            </div>
            : <div />
          }
        </div>
        <div style={{ margin: "1.5rem 0"}}>
          <img className='movie-details-image' src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="movie poster"/>
        </div>
      </div>
      <ActorsList id ={id}/>
    </div>
  );
};

export default MovieDetails;
