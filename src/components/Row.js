import React, { useCallback, useEffect, useState } from 'react'
import { axiosInnstance } from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal';

import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';




const Row = ({title, id, delay,fetchUrl}) => {
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
    <Container>
        <h2>{title}</h2>
          
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={5}
        navigation  //arrow 버튼 사용유무
        pagination={{ clickable: true }} // 페이지 버튼 사용여부
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}

        // loop={true} //loop 기능을 사용할지 여부 => 버전업 기본값 true 사용하면 waring
        speed={1500}   //슬라이드 이동 속도  
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
          
        }}
         breakpoints={{
          1968: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          1568: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },

          1378: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },

          1060: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          756: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },

          456: {
            slidesPerView:1,
            slidesPerGroup: 1,
          },
        }}

        className="mySwiper"
      >

        {movies.map((movie, index) => (
          <SwiperSlide 
            className='row__poster' 
            key={index}>
              
            <img 
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} 
              alt={movie.title} 
              onClick={()=>handleClick(movie)}              
            />
          </SwiperSlide>
        ))}   

    </Swiper>

        {modalOpen && 
          <MovieModal
            {...movieSelected}
            setModalOpen={setModalOpen}
          />          
        }
          
    </Container>
  )
}

export default Row


const Container=styled.div`
  padding: 0, 0 30px;

`;
