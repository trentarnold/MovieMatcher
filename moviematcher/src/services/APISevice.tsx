import {Movie, Results} from '../../../interfaces/MovieInterface';
import { movieDetailsPlaceHolder } from '../moviePlaceholder';
import { MovieDetailsInterface, Cast } from '../../../interfaces/MovieDetails'
import { Observable } from 'redux';
import { ActorListInterface } from '../../../interfaces/ActorList'
import { actorListPlaceholder } from '../actorListPlaceholder';
import ActorDetailsInterface from '../../../interfaces/ActorDetails';
import { actorDetailsPlaceholder } from '../actorDetailsPlaceholder';
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
      const popularMovies = await fetch('https://api.themoviedb.org/3/discover/movie/?api_key=66be68e2d9a8be7fee88a803b45d654b&with_watch_providers=10&watch_region=US')
      return await popularMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getUpcomingMovies: async(): Promise<Results> => {
    try {
      const latestMovies = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&page=1')
      return await latestMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getHorrorMovies: async(): Promise<Results> => {
    try{
      const horrorMovies = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_watch_monetization_types=flatrate');
      return await horrorMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getComedyMovies: async(): Promise<Results> => {
    try{
      const comedyMovies = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate');
      return await comedyMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getActionMovies: async(): Promise<Results> => {
    try{
      const actionMovies = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=flatrate');
      return await actionMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getSciFiMovies: async(): Promise<Results> => {
    try{
      const sciFiMovies = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878&with_watch_monetization_types=flatrate');
      return await sciFiMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getDramaMovies: async(): Promise<Results> => {
    try{
      const dramaMovies = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18&with_watch_monetization_types=flatrate');
      return await dramaMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getIndividualMovie: async(id:string | number): Promise<MovieDetailsInterface>  => {
    try {
      const movie  = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en`);
      return await movie.json()
    }catch(e) {
      console.log(e);
      return movieDetailsPlaceHolder
    }
  },
  getActorList: async(id:number): Promise<ActorListInterface> => {
    try {
        const actorList = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=66be68e2d9a8be7fee88a803b45d654b`)
        return await actorList.json()
    } catch(err) {
      console.log(err)
      return actorListPlaceholder
    }
  },
  getStreamProviders: async(id:number): Promise<any> => {
    try {
      const streamProvider = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=66be68e2d9a8be7fee88a803b45d654b`)
      const data = await streamProvider.json();
      return data.results;
    }catch(err) {
      console.log(err)
      return actorListPlaceholder
    }
  },
  getSimilarMovies: async(id:number): Promise<Results> => {
    try {
      const similarMovies = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=66be68e2d9a8be7fee88a803b45d654b&with_watch_providers=10&watch_region=US`)
      return await similarMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },
  getActorDetails: async(actorId:number): Promise<ActorDetailsInterface> => {
    try {
      const actorDetails = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=66be68e2d9a8be7fee88a803b45d654b`)
      return await actorDetails.json();

    }catch(e) {
      console.log(e)
      return actorDetailsPlaceholder;
    }
  },
  getCombinedCredits: async(actorId:number): Promise<Movie[]> => {
    try {
      const similarMovies = await fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=66be68e2d9a8be7fee88a803b45d654b`)
      let data = await similarMovies.json();
      return data.cast
    }catch(e) {
      console.log(e)
      return []
    }
  },
};


export default APIService;