import MovieList from '../movie-list/movie-list';
import MovieDetails from './movie-details/movie-details';
import React from 'react'

const MoviePage = () => {
    return (
        <div>
            <MovieDetails />
            <MovieList />
        </div>
    )
}

export default MoviePage
