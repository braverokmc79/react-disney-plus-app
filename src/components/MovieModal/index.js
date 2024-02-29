import React, {  useRef } from 'react'
import './MovieModal.css';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const MovieModal = ({
        adult,
        backdrop_path,
        genre_ids,
        id,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,        
        setModalOpen
    }) => {

  const ref=useRef();

  useOnClickOutside(ref, ()=>{setModalOpen(false)});


  return (
    <div className='presentation'  role="presentation">
        <div className='wrapper-modal'>
          <div className='modal' ref={ref} >

            <span onClick={()=>setModalOpen(false)} className='modal-close'>x</span>
        

        <img className='modal__poster-img'  src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}  alt="modal-img"  />

        <div className='modal__content'>
            <p className='modal_details'>
                <span className='modal__user_perc'>100% for you</span>{" "}
                {release_date}
            </p>

            <h2 className='modal__title'>{title ? title : original_title }</h2>
            <p className='modal__overview'>평점 : {vote_average}</p>
            <p className='modal__overview'>{overview}</p>
        </div>
       
       
        </div>
        </div>    
    </div>
  )
}

export default MovieModal