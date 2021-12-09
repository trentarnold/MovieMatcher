import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IMovie } from '../../../../interfaces/movieInterface';
import './movie-search.css'


const SearchBar = () => {

  const [query, setQuery] = useState<string>('')
  const [queryResults, setQueryResults] = useState<IMovie[]>([])
  const navigate = useNavigate();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  }

  useEffect(() =>{
    const searchActors = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&query=${query}&page=1&include_adult=false`)
        const res = await response.json()
        setQueryResults(() => res.results)
        console.log(queryResults, 'query results')
      } catch (e) {
        console.error(e);
      }
    };
    
    if (query.length > 1) {
      //replace this with function from api service
      searchActors()
    };
  }, [query]);


  const handleClick = (id: number) => {
    navigate(`/movieDetails/${id}`)
    setQuery(() => '')
    setQueryResults(() => [])
  }

  return (
    <div className='search-bar'>
      <input type='text' value={query} onChange={handleChange} placeholder="Seach movies..." />
      {query.length > 1 && 
      <div className='search-results'>
        {queryResults.length > 1 &&
          queryResults.map(result => {
            return <div onClick={() => handleClick(result.id)} className='search-result'>
              <p className="search-result-title">{result.title}</p>
              <p className="search-result-year">{result.release_date? result.release_date.slice(0,4) : ''}</p>
            </div>
          })
        }
      </div>
      }
    </div>
  );
};

export default SearchBar;