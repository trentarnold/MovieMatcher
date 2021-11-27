import React from 'react';
import './movie-list.css';
import MovieThumb from './movie-thumb/movie-thumb';
import {Movie} from '../../../../interfaces/MovieInterface'

type Props  = {
  movieList: Movie[]
}
const MovieList: React.FC<Props> = ({movieList}) => {
  //pass it a title and a list of movies through props
  return (
    <div className="movie-list-container">
        <h1>Criteria</h1>
        {/* pass individual movie to MovieThumb */}
        <div className="movie-list">
            {movieList.map(movie => <MovieThumb key={Number(movie.id)} movie={movie}/>)}
        </div>
    </div>
  )
}

export default MovieList