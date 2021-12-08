const axios = require('axios');
import { Movie, Results } from "../../interfaces/movieInterface";

export const APIMovieService = {
  fetchMovie: async (id: number) =>{
    try {
      const result = await axios.get('')
      await result;//.json();
    } catch (e) {
        console.log(e)
    }
  },

  getPopularMovies: async(): Promise<Results> => {
    try {
      const popularMovies = await axios.get('https://api.themoviedb.org/3/discover/movie/?api_key=66be68e2d9a8be7fee88a803b45d654b&watch_region=US&with_watch_providers=10')
      return await popularMovies;//.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getUpcomingMovies: async(): Promise<Results> => {
    try {
      const latestMovies = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&page=1')
      return await latestMovies;//.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getFileredMovies: async(params: string)  => {
    const movies = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=48343d08ec9aa87fbbfecd658bbc7ba9&language=en-US&include_adult=true&include_video=false' + params)
    return movies.data;
  },

  getCastID: async(castString: string) => {
    const cast = castString.trim().replace(' ', '%20');
    const castIDArr = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=48343d08ec9aa87fbbfecd658bbc7ba9&language=en-US&query=${cast}&page=1&include_adult=false`)
    if(castIDArr.data.results.length === 0){
      return '';
    }
    const castID = castIDArr.data.results[0].id;
    return(castID);
  },

  getMoviesBase: async() => {
    const movies = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=48343d08ec9aa87fbbfecd658bbc7ba9&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false')
    return movies.data;
  }
}

module.exports = {
  APIMovieService
}