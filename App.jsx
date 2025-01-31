import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import Watchlist from './page/watchlist/Watchlist';
import Home from './page/home/Home';
import Navbar from './component/navbar/Navbar';

export const WatchlistContext = createContext();
export const ThemeContext = createContext();

function App() {
  
  var existingMoviesInWatchList = JSON.parse(localStorage.getItem("watchlist"));
  if (existingMoviesInWatchList===null){ 
    existingMoviesInWatchList=[];
  }
  //state to handle watchlist
  const [watchlist,setWatchList] = useState(existingMoviesInWatchList);
  //function for adding/removving movies to/from watchlist
  const addToWatchList=(movie) =>{
    setWatchList([...watchlist,movie]);
  }
  const removeFromWatchList=(movie)=>{
    const newMovies = watchlist.filter((watchListMovie)=>watchListMovie.id!==movie.id);
    setWatchList(newMovies);
  }
  //updating watchlist in localstroage each time its changed 
  useEffect(()=>{
    localStorage.setItem("watchlist",JSON.stringify(watchlist));
  },[watchlist]);

  //State to handle Theme
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  //Handler Function to Change Theme
  const handlerTheme=()=>{
    if(theme==="light"){
        setTheme("dark");
    }else{
        setTheme("light");
    }
  }
  //To set body background color based on theme
  useEffect(() => {
    document.body.style.backgroundColor = theme==="light" ? "white" : "black";
    localStorage.setItem("theme",theme);
  }, [theme]);


  return (
  <> 
    <BrowserRouter>
    <WatchlistContext.Provider value={{watchlist:watchlist,addToWatchList:addToWatchList,removeFromWatchList:removeFromWatchList}}>
      <ThemeContext.Provider value={{theme,handlerTheme}}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/watchlist' element={<Watchlist/>} />
      </Routes>
      </ThemeContext.Provider>
    </WatchlistContext.Provider>
    </BrowserRouter>
  </>
  )
}

export default App
