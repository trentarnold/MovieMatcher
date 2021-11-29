import './movie-details.css'
import React, {useEffect, useState} from 'react';
import {Button} from '@chakra-ui/react';
import { useParams } from 'react-router';
import APIService from '../../../services/APISevice';
import { MovieDetailsInterface } from '../../../../../interfaces/MovieDetails';
import { movieDetailsPlaceHolder } from '../../../moviePlaceholder';
import StarRatings from 'react-star-ratings';
import ActorsList from '../../actors-list/ActorsList';
const MovieDetails = () => {
    const { id } : any = useParams();
    const [currentMovie, setCurrentMovie] = useState<MovieDetailsInterface>(movieDetailsPlaceHolder)
    console.log(currentMovie)
    useEffect(() => {
        async function fetchMovie () {
            const movieDetails = await APIService.getIndividualMovie(id);
            setCurrentMovie(movieDetails);
        }
        fetchMovie()
    }, [id])

    const reduceToFiveStarRating = (averageVote:number):number => {
        return (averageVote / 2);
      }
    return (
        <div>
            <div className='movie-details-container'>
                    <div>
                        <img className='movie-details-image' src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}></img>
                    </div>
                    <div className='movie-details-information-container'>
                        <div className ='movie-details-title-container'>
                        <div className='movie-details-title'>{currentMovie.title}</div>            
                        <StarRatings
                            rating={reduceToFiveStarRating(currentMovie.vote_average)}
                            starDimension="2rem"
                            starSpacing="1px"
                            starRatedColor='gold' />
                        <div style={{color:'white', marginLeft:'10px'}}>({currentMovie.vote_count})</div>
                        </div>
                        <div className='movie-details-description'>{currentMovie.overview}</div>
                        <div className='movie-details-genres'>
                                {currentMovie.genres.map(genre => <div> {genre.name}</div>)}
                        </div>
                        <div className='movie-details-production-company'>
                            <div className='movie-details-company-logo-container'> 
                            {currentMovie.production_companies.map(company => {
                                return (
                                    <div> 
                                        {company.logo_path ? 
                                            <div>
                                            <img className ='movie-details-company-logo'src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}></img>
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
                            <div className='movie-details-runtime'> <span style={{color:'grey', fontStyle:'italic'}}> Runtime: </span> {currentMovie.runtime} Minutes</div>
                        </div>
                        <div className='movie-details-button-holder'>
                            <Button>Add to Watchlist</Button>
                            <Button>rate</Button> 
                        </div>
                    </div>
            </div>
            <ActorsList id ={id}/>
        </div>
    )
}

export default MovieDetails
