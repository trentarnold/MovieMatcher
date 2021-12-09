import MovieList from '../movie-list/movie-list';
import MovieDetails from './movie-details/movie-details';
import {useState, useEffect} from 'react';
import APIService from '../../services/APISevice';
import { IMovie } from '../../../../interfaces/movieInterface';
import { useParams } from 'react-router';

const MoviePage = () => {

  const { id } : any = useParams();
  const [similarMovies, setSimilarMovies] = useState<IMovie[]>([])

  useEffect(() => {

    let isCancelled = false;

    async function fetchPopular () {
      try {
        const fetchedPopularMovies  = await APIService.getSimilarMovies(id);
        if(!isCancelled) {
          setSimilarMovies(fetchedPopularMovies.results)
        }
      } catch (e) {
        console.error(e)
      }
    };

    fetchPopular();

    return () => {
        isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <MovieDetails />
      <MovieList criteria = 'Similar Movies' movieList = {similarMovies} />
    </div>
  );
};

export default MoviePage;
