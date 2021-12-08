import { IMovie, IResults} from '../../../interfaces/movieInterface';
import { movieDetailsPlaceHolder } from '../moviePlaceholder';
import { IMovieDetails } from '../../../interfaces/MovieDetails'
import { IActorList } from '../../../interfaces/ActorList'
import { actorListPlaceholder } from '../actorListPlaceholder';
import ActorDetailsInterface from '../../../interfaces/ActorDetails';
import { actorDetailsPlaceholder } from '../actorDetailsPlaceholder';
import ActorsList from '../components/actors-list/ActorsList';
const BASE_URL = 'http://localhost:3001'

const APIService = {
  fetchMovie: async (id: number) =>{
    try {
      const result = await fetch('')
      await result.json();
    } catch (e) {
        console.log(e)
    }
  },

  getPopularMovies: async(): Promise<IResults> => {
    try {
      const response = await fetch(`${BASE_URL}/movies/Popular`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getUpcomingMovies: async(): Promise<IResults> => {
    try {
      const response = await fetch(`${BASE_URL}/movies/Upcoming`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getHorrorMovies: async(): Promise<IResults> => {
    try{
      const response = await fetch((`${BASE_URL}/movies/APIservice?with_genres=${27}`), {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getComedyMovies: async(): Promise<IResults> => {
    try{
      const response = await fetch((`${BASE_URL}/movies/APIservice?with_genres=${35}`), {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getActionMovies: async(): Promise<IResults> => {
    try{
      const response = await fetch((`${BASE_URL}/movies/APIservice?with_genres=${28}`), {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getSciFiMovies: async(): Promise<IResults> => {
    try{
      const response = await fetch((`${BASE_URL}/movies/APIservice?with_genres=${878}`), {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getDramaMovies: async(): Promise<IResults> => {
    try{
      const response = await fetch((`${BASE_URL}/movies/APIservice?with_genres=${18}`), {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return {results:[]}
    }
  },

  getIndividualMovie: async(id:string | number): Promise<IMovieDetails>  => {
    try {
      // const movie  = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en`);
      // return await movie.json()
      const movie = await fetch((`${BASE_URL}/movies/Specific?movie=${id}` ), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await movie.json()
      return data
    }catch(e) {
      console.log(e);
      return movieDetailsPlaceHolder
    }
  },
  getActorList: async(id:number): Promise<IActorList> => {
    try {
      const actorList = await fetch((`${BASE_URL}/movies/ActorList?movie=${id}` ), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await actorList.json()
    } catch(err) {
      console.log(err)
      return actorListPlaceholder
    }
  },
  getStreamProviders: async(id:number): Promise<any> => {
    try {
      const streamProvider = await fetch((`${BASE_URL}/movies/Providers?provider=${id}`), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await streamProvider.json();
      console.log(data, 'this is the data from inside gsp')
      return data;

    }catch(err) {
      console.log(err)
      return actorListPlaceholder
    }
  },
  getSimilarMovies: async(id:number): Promise<IResults> => {
    try {
      const similarMovies = await fetch((`${BASE_URL}/movies/Similar?movie=${id}`), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await similarMovies.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },
  getActorDetails: async(actorId:number): Promise<ActorDetailsInterface> => {
    console.log('hit outside of try')
    try {
      console.log("hit apiService")
      const actorDetails = await fetch((`${BASE_URL}/movies/ActorDetails?actor=${actorId}` ), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await actorDetails.json()
    }catch(e) {
      //console.log(e)
      return actorDetailsPlaceholder;
    }
  },
  getCombinedCredits: async(actorId:number): Promise<IMovie[]> => {
  try {
      const similarMovies = await fetch((`${BASE_URL}/movies/CombinedCredits?actor=${actorId}` ), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data =await similarMovies.json();
      return data.cast;

    }catch(e) {
      console.log(e)
      return []
    }
  },
};


export default APIService;