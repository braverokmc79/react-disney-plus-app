import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { axiosInnstance } from '../../api/axios';

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
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query=useQuery();
  const searchTerm=query.get('q');


  useEffect(() => {
    if(searchTerm){
      debounce(() => {      
        console.log('searchTerm ',searchTerm);   
        fetchSearchMovie(searchTerm);   
      }, 300);     
    }


  }, [searchTerm]);


  const fetchSearchMovie = async(searchTerm) => {
      try {
        const response=await axiosInnstance.get(`/search/multi?include_adult=false&query=${searchTerm}`);
        console.log('response ',response);          
      } catch (error) {
        console.error('error ',error);
      }
  }



  return (
    <div>SearchPage</div>
  )
}

export default SearchPage


