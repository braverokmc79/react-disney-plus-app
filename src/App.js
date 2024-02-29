import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import Nav from './components/Nav';
import SearchPage from './pages/SearchPage/index';
import DetailPage from './pages/DtailPage/index';


const Layout=()=>{
  return(
    <div> 
      <Nav />

      <Outlet />
    </div>
  );
}  


function App() {
  return (
    <div className="App">
       <Routes>        
          <Route path="/"  element={<Layout />}  >
              {/* <Route index element={<LoginPage />} /> */}
              <Route index element={<MainPage />} />   
              <Route path="main" element={<MainPage />} />   
              <Route path=":movieId" element={<DetailPage  />} />   
              <Route path="search" element={ <SearchPage />} />   
              
          </Route>
        </Routes>
    </div>
  );
}

export default App;



