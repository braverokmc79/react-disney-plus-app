import axios from 'axios';
import React, { useEffect, useState } from 'react'
import axiosInnstance from '../api/axios';
import requests from '../api/requests';

import './Banner.css';

// const fetch = require('node-fetch');
// const url = 'https://api.themoviedb.org/3/movie/movie_id?language=en-US';
// const options = {method: 'GET', headers: {accept: 'application/json'}};
// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

const Banner = () => {

   const [movie, setMovie] = useState([]);
   const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보를 가져오기(여러 영화)
    //const response=await axiosInnstance.get(requests.fetchPopularMovies);  //fetchNowPlaying
    const response=await axiosInnstance.get(requests.fetchNowPlaying);
     // console.log("response ==> " , response.data.results);

    //여러 영화 중 영화 하나의 ID를 가져오기
    const movieId=response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id;


    //console.log("movieId ==> " ,movieId);

    //특정 영화의 더 상세한 정보를 가져오기
    //https://api.themoviedb.org/3/movies/848326
    const {data:movieDetail}=await axiosInnstance.get(`/movie/${movieId}`,{
      params:{append_to_response:"videos"} 
    });
  

    setMovie(movieDetail);   
  }

  //https://image.tmdb.org/t/p/original/iNgn9LP0iMuLSnWqolivcY3Y7F6.jpg

  const truncate=(str, n) => {  
    return str?.length > n? str.substr(0, n) + '...' : str;  
  };



  return (
    <header className='banner'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})` ,
        backgroundPosition:"top center",
        backgroundSize:"50% auto",
        objectFit:"fill",
        backgroundRepeat:"no-repeat",
      }}
    >

    <div className='banner__contents'> 
       <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}       
       </h1>


      <div className='banner__buttons'>
        {movie?.videos?.results[0]?.key&&
            <button className='banner__button play'
              onClick={()=>setIsClicked(true)}
            >Play</button>
        }      
      </div>
      
      <p className='banner__description'>
          {truncate(movie?.overview, 100)}
      </p>

    </div>
    
    <div className='bannner--fadeBottom'  />


    </header>
  )


}

export default Banner


