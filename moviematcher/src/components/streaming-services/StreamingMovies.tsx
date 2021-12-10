import React, { useEffect, useState } from 'react'
import MovieThumb from '../movie-list/movie-thumb/movie-thumb'
import { IMovieDetails } from '../../../interfaces/MovieDetails'
import APIService from '../../services/APISevice'
import { useParams } from 'react-router'

const StreamingMovies = () => {
  const params = useParams();
  console.log(params, 'PARMs')
  const [movies, setMovies] = useState<IMovieDetails[]>([])

  useEffect(() => {
    async function getProviders() {
      const res = await APIService.getMoviesByStreamProvider(Number(params.id));
      setMovies(res);
    }
    getProviders();
  }, [])

  return (
    <div >
      <div style={{textAlign: "center", fontSize: "2rem", fontWeight: "500"}}>{params.provider}</div>
      <div style={{borderBottom: "2px solid grey", width: "40%", margin: "auto"}}></div>
      <div style={{display: "flex", flexWrap: 'wrap', justifyContent: "center", marginTop: "1rem"}}>
        {movies.length && movies.map(movie => <MovieThumb key={movie.id} movie={movie}/>)}
      </div>
    </div>
  )
}

export default StreamingMovies
