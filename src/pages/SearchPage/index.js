import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInnstance } from '../../api/axios';
import './SearchPage.css';


//Throttle
let timer;
function debounce(callbackFn, timeout) {
  if(timer) {
      clearTimeout(timer);
  }

  timer = setTimeout(() => {
      callbackFn();
  }, timeout);
}



const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate=useNavigate();


  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query=useQuery();
  const searchTerm=query.get('q');


  useEffect(() => {
    if(searchTerm){
      debounce(() => {      
        fetchSearchMovie(searchTerm);            
        console.log(searchResults.length);
      }, 300);     
    }
  }, [searchTerm]);


  const fetchSearchMovie = async(searchTerm) => {
      try {
        const response=await axiosInnstance.get(`/search/multi?include_adult=false&query=${searchTerm}`);
        setSearchResults(response.data.results);
            
      } catch (error) {
        console.error('error ',error);
      }
  }
  

  if(searchResults.length > 0){
    return (
      <section className='search-container'>
          {
            searchResults.map((movie) => {
             
              if(movie.backdrop_path!=null && movie.media_type!=="person"){
                  const moiveImageUrl=`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

                    return  (
                        <div className='movie' key={movie.id}>
                          <div className='movie__column-poster' onClick={()=>navigate(`/${movie.id}`)}>
                            <img src={moiveImageUrl} alt={movie.title}  className='movie__poster'     />
                           </div>                           
                        </div>
                    );
                      
               }else{
                    return null;
               }
            
            })

            
          }
      </section>
    )

  }else{

      return (
        <section className='no-results'>
          <div className='no-results__text'>
            <p>
                찾고자하는 검색어 "{searchTerm}"  에 맞는 영화가 없습니다.
            </p>
          </div>
        </section>
      )
  }
  


}

export default SearchPage


