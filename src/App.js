import styled from 'styled-components';
import './App.css';
import Nav from './components/Nav';

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


function App() {
  return (
    <Container className="App">
      <Nav />
    </Container>
  );
}

export default App;



