import React from 'react';
import MovieThumb from './movie-list/movie-thumb/movie-thumb';
import { IMovieDetails } from '../../interfaces/MovieDetails';
import { useAppSelector } from '../redux/app/hooks';
type Props  = {
  movieList: IMovieDetails[],
  criteria: string
}

const FavoriteMovieList: React.FC<Props> = ({movieList, criteria}) => {
  const toggle = useAppSelector((state) => state.friendsList.value)

  //pass it a title and a list of movies through props
  return (
    <div className="movie-list-container" style={{justifyContent:'flex-start'}}>
      <h1>{criteria}</h1>
      <div className="movie-list" style={{maxWidth: toggle? '83.5%' : '100%'}} >
        {movieList.map(movie => <MovieThumb key={Number(movie.id)} movie={movie}/>)}
      </div>
    </div>
  );
};

export default FavoriteMovieList;