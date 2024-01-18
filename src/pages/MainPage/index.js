import React from 'react'
import Nav from '../../components/Nav'
import Banner from '../../components/Banner'
import Category from '../../components/Category'
import Row from '../../components/Row'
import styled from 'styled-components'
import requests from '../../api/requests'
import Footer from '../../components/Footer'

const MainPage = () => {
  return (
    <Container >
        <Banner />
        <Category />
        <Row title="Trending Now" id="TN" delay={2000}  fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" id="TR"  delay={4000}  fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" id="AM" delay={6000} fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" id="CM"  delay={8000} fetchUrl={requests.fetchComedyMovies} />

        <Footer />
  </Container>
  )
}

export default MainPage;



const Container =styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  top:72px;  
  padding:0 calc( 3.5vw + 5px);

  &:after {
    content:"";
    background: url("/images/home-background.png") center center / cover no-repeat  fixed;
    position: absolute;
    inset: 0px;
    opacity:1;
    z-index: -1;
  }

`;