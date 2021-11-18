
import React, { useState, useEffect } from 'react';
import MovieDetails from "./MovieDetails";

function App() {

  const MovieAPI = `1546e23efdecd068f8cbb91fee78c13b`;
  const baseURL = 'https://image.tmdb.org/t/p/w500'
    
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [query,setQuery] = useState("a");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    
    getMovies();
  }, [query]);

  const getMovies = async () => {
    //const response = await fetch(`https://api.edamam.com/search?q=${queryy}&app_id=${App_ID}&app_key=${API_Key}`);
    setLoading(true);
    //const response = await fetch(`https://api.spoonacular.com/movies/complexSearch?query=${queryy}&apiKey=${API_Key}`)
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MovieAPI}&query=${query}`);
    try {
    const data = await response.json();
    console.log('response data?', data)
    setMovies(data.results);
    console.log(data.results);
    if (error || !Array.isArray(data)) {
      return <p>There was an error loading your data!</p>;
    }
     } catch(err) {
      setError(err);
       console.log('Error happened here!')
       console.error(error)
     }
     finally {
      setLoading(false);
     }
    };

    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }
    const updateSearch = (e) => {
      setSearch(e.target.value);
    }

    if (loading) {
      return <h1>Data is loading...</h1>;
    }
    
  return (

    <div className='App'>
      <div className="heading">
      <h1> Welcome to Entertainment City</h1>
        <h2> Search to know about shows/movies</h2>
        </div>
        <form className="search-form" onSubmit={getSearch}>
          <div className= 'search-box'>
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..." value={search} onChange={updateSearch}/>
            <button className="search-button" type="submit" >Search</button>
            </div>
        </form>
        
        {movies && movies.map(result => (
          <MovieDetails 
          key={result.id}
          title= {result.original_title}
          image= {baseURL+result.poster_path}
          releaseDate= {result.release_date}
          description = {result.overview}
          />  
        ))}  
    </div>
  );
}

export default App;