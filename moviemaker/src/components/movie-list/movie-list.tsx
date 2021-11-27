import React from 'react';
import './movie-list.css';
import MovieThumb from './movie-thumb/movie-thumb';

const MovieList = () => {
  //pass it a title and a list of movies through props
  return (
    <div className="movie-list-container">
        <h1>Criteria</h1>
        {/* pass individual movie to MovieThumb */}
        <div className="movie-list">
            <MovieThumb />
            <MovieThumb />
            <MovieThumb />
            <MovieThumb />
            <MovieThumb />
            <MovieThumb />
            <MovieThumb />
        </div>
    </div>
  )
}

export default MovieList