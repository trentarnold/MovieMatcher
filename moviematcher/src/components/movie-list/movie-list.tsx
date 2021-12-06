import React, { useEffect } from 'react';
import './movie-list.css';
import MovieThumb from './movie-thumb/movie-thumb';
import {Movie} from '../../../../interfaces/movieInterface';
import { useAppSelector } from '../../redux/app/hooks';
type Props  = {
  movieList: Movie[],
  criteria: string
}

const MovieList: React.FC<Props> = ({movieList, criteria}) => {

  function shuffleArray (arr: Movie[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

  const toggle = useAppSelector((state) => state.friendsList.value)
  
  //shuffles list of movies so Venom isn't at the beginning of every genre list
  useEffect(()=>{
    shuffleArray(movieList)
  })

  //pass it a title and a list of movies through props
  return (
    <div className="movie-list-container">
        <h1>{criteria}</h1>
        {/* pass individual movie to MovieThumb */}
        <div className="movie-list" style={{maxWidth: toggle? '83.5%' : '100%'}} >
            {movieList.map(movie => <MovieThumb key={Number(movie.id)} movie={movie}/>)}
        </div>
    </div>
  )
}

export default MovieList