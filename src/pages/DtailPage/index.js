import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInnstance } from '../../api/axios';

const DetailPage = () => {
  let {movieId} =useParams();
  const [movie, setMovie] = useState({});
  ;

  useEffect(() => {
    fetchMovie();
  },[] );


  async function fetchMovie() {
      const response=await  axiosInnstance.get(`/movie/${movieId}`)
      console.log(response.data);
      setMovie(response.data);
  }


  if(!movie)return null;

  return (
    <section>
      <img 
          className='modal__poster-img'
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
      />
    </section>
  
  )


}

export default DetailPage