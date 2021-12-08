import React, { useEffect, useState } from 'react'
import MovieThumb from '../movie-list/movie-thumb/movie-thumb'
import { IMovieDetails } from '../../../../interfaces/MovieDetails'
import APIService from '../../services/APISevice'
import { useParams } from 'react-router'

const StreamingMovies = () => {
  const params = useParams();
  console.log(params, 'PARMs')
  const [movies, setMovies] = useState<IMovieDetails[]>([])

  // useEffect(() => {
  //   const movies = await APIService.
  //   setMovies(movies);
  // }, [])

  return (
    <div>
      <div>{params.provider}</div>
      <div style={{flexWrap: 'wrap'}}>
        {/* movies.map(movie => <MovieThumb movie={movie}/>) */}
      </div>
    </div>
  )
}

export default StreamingMovies
