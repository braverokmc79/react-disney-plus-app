import React, { useEffect, useState } from 'react'
import {axiosInnstance, axiosWidthImageInnstance} from '../api/axios';
import requests from '../api/requests';

import './Banner.css';
import styled from 'styled-components';

// const fetch = require('node-fetch');
// const url = 'https://api.themoviedb.org/3/movie/movie_id?language=en-US';
// const options = {method: 'GET', headers: {accept: 'application/json'}};
// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

const Container =styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;

`;

const HomeContainer =styled.div`
    width: 100%;
    height: 100%;

`;


const Iframe =styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border:none;

  &::after{
    content:"";  
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
  
  }

`


const Banner = () => {

   const [movie, setMovie] = useState([]);
   const [isClicked, setIsClicked] = useState(false);
   const  [backgroundPositionPoster, setBackgroundPositionPoster] =useState("");

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
  
   // console.log("widthImageList", movieId);


    //가로형 이미지 목록 가져오기
    //https://api.themoviedb.org/3/movie/1071215/images/?api_key=08d90cc4e7968b1f8e51588a0d42cf06&language=en-US&include_image_language=en
    //https://api.themoviedb.org/3/movie/1071215/images?api_key=0a08e38b874d0aa2d426ffc04357069d&language=en-US&include_image_language=en
    const {data: widthImageList}= await axiosWidthImageInnstance.get(`${movieId}/images`,{});
    setBackgroundPositionPoster( widthImageList?.backdrops[0]?.file_path || movie.poster_path);
    // console.log("widthImageList ==> ", widthImageList.backdrops);
    // console.log("한개 가져오기 widthImageList ==> ",movieId , widthImageList.backdrops[0].file_path);




    setMovie(movieDetail);   
  }

  //https://image.tmdb.org/t/p/original/iNgn9LP0iMuLSnWqolivcY3Y7F6.jpg

    //https://image.tmdb.org/t/p/w1280/qzgEPduJyQ6RkgMdn4nbjdKUYJM.jpg
  //https://api.themoviedb.org/3/movie//buvBq2zLP7CcJth8tjrI4znvfEO/images
 //`url(https://image.tmdb.org/t/p/original${movie.poster_path})` 

  const truncate=(str, n) => {  
    return str?.length > n? str.substr(0, n) + '...' : str;  
  };


  if(isClicked){
    return (
      <>
      <Container >
        <HomeContainer>
        
          <Iframe
            src={`https://youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&loop=1&mute=1&playlist=${movie?.videos?.results[0]?.key}`}
            width="640"
            height="360"
            allow='autoplay; fullscreen'
          >

          </Iframe>

        </HomeContainer>
      </Container>      
      <button onClick={()=>setIsClicked(false)} className='btn-close'>X</button>
      </>

    ) 
  }else{

   // console.log("movie ==> ", movie);

  return (

    
    backgroundPositionPoster && <header className='banner'
            style={{
              // backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` ,
              backgroundImage: `url(https://image.tmdb.org/t/p/original${backgroundPositionPoster})`,
              backgroundPosition:"top center",
              backgroundSize:"cover",
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
}

export default Banner


