import {Movie, Results} from '../../../interfaces/MovieInterface';
import { movieDetailsPlaceHolder } from '../moviePlaceholder';
import { MovieDetailsInterface } from '../../../interfaces/MovieDetails'
import { Observable } from 'redux';

const BASE_URL = 'http://localhost:3001/'


const APIService = {
  fetchMovie: async (id: number) =>{
    try {
      const result = await fetch('')
      await result.json();
    } catch (e) {
        console.log(e)
    }
  },
  
  getPopularMovies: async(): Promise<Results> => {
    try {
      const popularMovies = await fetch('https://api.themoviedb.org/3/discover/movie/?api_key=66be68e2d9a8be7fee88a803b45d654b&with_watch_providers=8&watch_region=US')
      return await popularMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },
  getIndividualMovie: async(id:string): Promise<MovieDetailsInterface>  => {
    try {
      const movie  = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=66be68e2d9a8be7fee88a803b45d654b`);           
      return await movie.json()
    }catch(e) {
      console.log(e);
      return movieDetailsPlaceHolder
    }
  }

};


export default APIService;