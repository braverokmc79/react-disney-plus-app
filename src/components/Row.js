import React, { useCallback, useEffect, useState } from 'react'
import { axiosInnstance } from '../api/axios';

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

  console.log("movies ==> ", movies);

  const handleClick=(e)=>{
    console.log("handleClick ==> ", e);
  }

  return (
    <div>
        <h2>{title}</h2>
        <div className='slider'>
          <div className='slider__arrow-left'>
            <span className='arrow'>
                {"<"}
            </span>            
          </div>

          <div id={id} className='row__posters'>
         
          {movies.map((movie, index) => (
            <div className='row__poster' key={index}>
              <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} width={100} 
                onClick={()=>handleClick(movie)}
              
              />
            </div>
          ))}   

          </div>

          <div className='slider__arrow-right'>
            <span className='arrow'>
                {">"}
            </span>            
          </div>

        </div>

    </div>
  )
}

export default Row


