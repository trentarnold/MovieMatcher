const axios = require('axios');
import { Movie, Results } from "../../interfaces/movieInterface";
import {MovieDetailsInterface} from '../../interfaces/MovieDetails'
import { movieDetailsPlaceHolder } from '../../moviematcher/src/moviePlaceholder'
import { ActorListInterface } from '../../interfaces/ActorList';
import { actorListPlaceholder } from '../../moviematcher/src/actorListPlaceholder';
import  ActorDetailsInterface  from '../../interfaces/ActorDetails';
import { actorDetailsPlaceholder } from '../../moviematcher/src/actorDetailsPlaceholder';


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
      return  popularMovies.data;//.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getUpcomingMovies: async(): Promise<Results> => {
    try {
      const latestMovies = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&page=1')
      return latestMovies.data.results;//.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getFilteredMoviesQuery: async(params: string)  => {
    console.log(params);
    const movies = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=48343d08ec9aa87fbbfecd658bbc7ba9&language=en-US&include_adult=true&include_video=false&watch_region=US' + params)
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
  },

  getIndividualMovie: async(id:string | number): Promise<MovieDetailsInterface>  => {
    try {
      const movie  = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en`);
      return await movie//.json()
    }catch(e) {
      console.log(e);
      return movieDetailsPlaceHolder
    }
  },
  getActorListQuery: async(id:number): Promise<ActorListInterface> => {
    try {
        const actorList = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=66be68e2d9a8be7fee88a803b45d654b`)
        return actorList.data.cast//.json()
    } catch(err) {
      console.log(err)
      return actorListPlaceholder
    }
  },
  getStreamProvidersQuery: async(id:number): Promise<any> => {
    try {
      const streamProvider = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=66be68e2d9a8be7fee88a803b45d654b`)
      const data = streamProvider.data//.json();
      return data.results;
    }catch(err) {
      console.log(err)
      return actorListPlaceholder
    }
  },
  getSimilarMoviesQuery: async(id:number): Promise<Results> => {
    try {
      const similarMovies = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=66be68e2d9a8be7fee88a803b45d654b&with_watch_providers=10&watch_region=US`)
      console.log(similarMovies.data);
      return similarMovies.data//.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },
  getActorDetailsQuery: async(actorId:number): Promise<ActorDetailsInterface> => {
    try {
      const actorDetails = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=66be68e2d9a8be7fee88a803b45d654b`)
      return actorDetails.data//.json();

    }catch(e) {
      console.log(e)
      return actorDetailsPlaceholder;
    }
  },
  getCombinedCreditsQuery: async(actorId:number): Promise<Movie[]> => {
    try {
      const similarMovies = await axios.get(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=66be68e2d9a8be7fee88a803b45d654b`)
      let data = await similarMovies//.json();
      return data.cast
    }catch(e) {
      console.log(e)
      return []
    }
  },
}

module.exports = {
  APIMovieService
}