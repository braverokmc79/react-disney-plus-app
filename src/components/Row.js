import React, { useCallback, useEffect, useState } from 'react'
import { axiosInnstance } from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal';

const Row = ({title, id,fetchUrl}) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  //클릭한 영화 정보 가져오기
  const [movieSelected, setMovieSelection] = useState({});


  const fetchMovieData= useCallback( async () => {
    const response= await axiosInnstance.get(fetchUrl, {});      
    setMovies(response.data.results);
  }, [fetchUrl] );


  useEffect(() =>{
    fetchMovieData();
  }, [fetchMovieData]);


  const handleClick=useCallback((movie)=>{
    console.log("movie ",movie);

    setModalOpen(true);
    setMovieSelection(movie);
  }, [setModalOpen, setMovieSelection]);




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

          {modalOpen && 
            <MovieModal
              {...movieSelected}
              setModalOpen={setModalOpen}
            />          
          }
          
    </div>
  )
}

export default Row


