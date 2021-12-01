import {Movie, Results} from '../../../interfaces/MovieInterface';
import { movieDetailsPlaceHolder } from '../moviePlaceholder';
import { MovieDetailsInterface, Cast } from '../../../interfaces/MovieDetails'
import {loginResponse} from '../../../interfaces/responses'
import { Observable } from 'redux';
import { ActorListInterface } from '../../../interfaces/ActorList'
import { actorListPlaceholder } from '../actorListPlaceholder';
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
  getIndividualMovie: async(id:string): Promise<MovieDetailsInterface>  => {
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
  userLogin: async(username:string, password:string): Promise<loginResponse> => {
    try {
      const response = await fetch(`${BASE_URL}user/login`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      const {confirmed, accessToken} = await response.json()
      return {confirmed, accessToken};
    } catch (e) {
      console.log(e);
      return {confirmed: false, accessToken:''};
    }
  }
};


export default APIService;