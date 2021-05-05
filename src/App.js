import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Movies from './Components/Movies';
import Heading from './Components/Heading';
import Search from './Components/Search';
import Nominate from './Components/Nominate';
import RemoveNomination from './Components/RemoveNomination';

function App() {
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getMovieRequest = async (searchText) => {
    const url = `http://www.omdbapi.com/?s=${searchText}&apikey=d1684ae3`

    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search)
    }
  }

  useEffect(()=>{
    getMovieRequest(searchText);
  }, [searchText])

  const addNomination = (movie) => {
    const nominationsList = [...nominations, movie];
    setNominations(nominationsList)
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading="The Shoppies"/>
        <Search searchText={searchText} setSearchText={setSearchText}/>
      </div>
      <div className="row">
        <Movies movies={movies} nominate={Nominate} handleNominationClick={addNomination}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading="Nominations"/>
      </div>
      <div className="row">
        <Movies movies={nominations} nominate={RemoveNomination} handleNominationClick={addNomination}/>
      </div>
    </div>
  );
}

export default App;
