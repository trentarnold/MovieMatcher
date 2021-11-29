import React, {useEffect, useState} from 'react';
import {Button} from '@chakra-ui/react';
import { useParams } from 'react-router';
import APIService from '../../../services/APISevice';
import { MovieDetailsInterface } from '../../../../../interfaces/MovieDetails';
import { movieDetailsPlaceHolder } from '../../../moviePlaceholder';
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

    return (
        <div style={{display:'flex'}}>
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}></img>
            </div>
            <div>
                <p>{currentMovie.original_title}</p>
                <p>{currentMovie.overview}</p>
                <div>
                    <Button>Add to Watchlist</Button>
                    <Button>rate</Button> 
                    <Button>watch with friend</Button>     
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
