import React, { useCallback, useEffect, useState } from 'react'
import { axiosInnstance } from '../api/axios';
import './Row.css';

const Row = ({title, id,fetchUrl}) => {
  const [movies, setMovies] = useState([]);
  
  const fetchMovieData= useCallback( async () => {
    const response= await axiosInnstance.get(fetchUrl, {});
    
    console.log("response ==> ", response.data.results);

    setMovies(response.data.results);
  }, [fetchUrl] );


  useEffect(() =>{
    fetchMovieData();
  }, [fetchMovieData]);

  console.log("id ==> ", document.getElementById(id));

  const handleClick=(e)=>{
    console.log("handleClick ==> ", e);
  }

  return (
    <div>
        <h2>{title}</h2>
        <div className='slider'>
          <div className='slider__arrow-left'>
            <span className='arrow'
              onClick={()=>{ document.getElementById(id).scrollLeft  -= window.innerWidth -80} }
            >
                {"<"}
            </span>            
          </div>

          <div id={id} className='row__posters'>
         
          {movies.map((movie, index) => (
            <div className='row__poster' key={index}>
              <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt={movie.title} 
                onClick={()=>handleClick(movie)}
              
              />
            </div>
          ))}   

          </div>

          <div className='slider__arrow-right'>
            <span className='arrow'
               onClick={()=>{ document.getElementById(id).scrollLeft  += window.innerWidth + 80} }
            >
                {">"}
            </span>            
          </div>

        </div>

    </div>
  )
}

export default Row


