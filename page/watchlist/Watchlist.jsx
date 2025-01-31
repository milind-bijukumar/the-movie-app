import Navbar from "../../component/navbar/Navbar";
import genreIdMappings from "../../configurations/genreConfigs";
import deleteIcon from "../../assets/trash-solid.svg";
import noDataImg from "../../assets/no-record.png";
import { useState,useEffect, useContext } from "react";
import { WatchlistContext } from "../../App";
import { ThemeContext } from "../../App";


const Watchlist = ()=>{
    //Consuming Context
    const WatchListContextValue = useContext(WatchlistContext);
    const {watchlist,removeFromWatchList} = WatchListContextValue;

    //Theme
    const {theme}= useContext(ThemeContext);
    const darkModeStyleClass = theme==="light"?"bg-white text-black":"bg-black text-white";
    const boxStyleClass = theme==="light"?"bg-black text-white":"bg-white text-black";


    //State for sorting
    const [isSortedByRating,setIsSortedByRating] = useState(false);
    const [isSortedByPopularity,setIsSortedByPopularity] = useState(false);
    const [isSortedByMovieName,setIsSortedByMovieName] = useState(false);
    //State for Movie to be displayed
    const [watchlistMoviesinDisplay,setWatchlistMoviesinDisplay] = useState(watchlist);
    const [watchListMoviesAfterFilter,setWatchListMoviesAfterFilter] = useState(watchlist);

    //Bug Fix : for Delete action
    useEffect(()=>{
        setWatchlistMoviesinDisplay(watchlist);
    },[watchlist]);

    //Bug Fix : Ensure Search is applied only on filtered Movie
    useEffect(()=>{
        setWatchlistMoviesinDisplay(watchListMoviesAfterFilter);
    },[watchListMoviesAfterFilter]);

    //Function handling Search
    const onSearch = (e) =>{
        const searchVal = e.target.value.toLowerCase();
        const searchedMovies = watchListMoviesAfterFilter.filter((movie)=>movie.title.toLowerCase().startsWith(searchVal));
        // console.log(searchedMovies.length===0);
        setWatchlistMoviesinDisplay(searchedMovies);

        
    }
    // console.log(watchlistMoviesinDisplay.length);
    //Fucntion for Sorting By Rating
    const sortByRating = () =>{
        let watchListMovieSortedByRating=[];
        if (isSortedByRating===false){
             watchListMovieSortedByRating=watchlistMoviesinDisplay.sort((a,b)=>a.vote_average-b.vote_average);
             setIsSortedByRating(true);
        }else{
            watchListMovieSortedByRating=watchlistMoviesinDisplay.sort((a,b)=>b.vote_average-a.vote_average);
            setIsSortedByRating(false);
        }
        setWatchlistMoviesinDisplay(watchListMovieSortedByRating);  
    }
    
    //Fucntion for Sorting By Popularity
    const sortByPopularity = () =>{
        let watchListMovieSortedByPopularity=[];
        if (isSortedByPopularity===false){
            watchListMovieSortedByPopularity=watchlistMoviesinDisplay.sort((a,b)=>a.popularity-b.popularity);
             setIsSortedByPopularity(true);
        }else{
            watchListMovieSortedByPopularity=watchlistMoviesinDisplay.sort((a,b)=>b.popularity-a.popularity);
            setIsSortedByPopularity(false);
        }
        setWatchlistMoviesinDisplay(watchListMovieSortedByPopularity);
    }
    //Fucntion for Sorting By Movie Name
    const sortByMovieName = () =>{
        let watchListMovieSortedByMovieName=[];
        if (isSortedByMovieName===false){
            watchListMovieSortedByMovieName=watchlistMoviesinDisplay.sort((a,b)=>a.title.localeCompare(b.title));
             setIsSortedByMovieName(true);
        }else{
            watchListMovieSortedByMovieName=watchlistMoviesinDisplay.sort((a,b)=>b.title.localeCompare(a.title));
            setIsSortedByMovieName(false);
        }
        setWatchlistMoviesinDisplay(watchListMovieSortedByMovieName);
    }

    //Function for Filter
    const filterByGenre= (genre) =>{
        if (genre==="All Genre"){
            setWatchListMoviesAfterFilter(watchlist);
            return;
        }
        const filteredMovies = watchlist.filter((movie)=>{
            const movieGenresArr = movie.genre_ids.map((id)=>genreIdMappings[id]);
            return movieGenresArr.includes(genre);
        });
        setWatchListMoviesAfterFilter(filteredMovies);
        
    }


    const genre = new Set();
    watchlist.forEach((movie)=>{
        for(let i=0;i<movie.genre_ids.length;i++){
            genre.add(genreIdMappings[movie.genre_ids[i]]);
        }
    })
    const genreArray = Array.from(genre);
    genreArray.unshift("All Genre");
    return (
    <>
        <Navbar/>
        <div className={`flex justify-center items-center flex-row flex-wrap ${darkModeStyleClass}`}>
            {genreArray.map((genre)=>{
                return (
                    <div onClick={()=>filterByGenre(genre)} className={`${boxStyleClass} font-mono h-[3rem] w-[9rem] m-4  p-4 flex items-center justify-center rounded-xl text-lg cursor-pointer font-semibold`}> 
                        {genre}
                    </div>
                )
            })}
        </div>
        <div className={darkModeStyleClass}>
            <input onChange={onSearch} className={`border-2 border-gray-500 rounded-lg w-[20rem] h-[3rem] my-5 px-3`} type="text" placeholder="Search Movie"/>
        </div>
        <div className={`mt-8 ${darkModeStyleClass}`}>
            {   (watchlistMoviesinDisplay.length===0)
                ?<div className="flex justify-center items-center">
                    <img className="w-[200px] h-[200px]" src={noDataImg} alt="No-Record-Found" />
                </div> 
                :<table className="table-auto w-10/12 mx-14 border-separate border-spacing-y-8">
                    <thead className="font-mono font-bold text-xl tracking-widest">
                        <tr>
                            <th onClick={sortByMovieName} className="cursor-pointer">Movie </th>
                            <th onClick={sortByRating} className="cursor-pointer">Rating</th>
                            <th onClick={sortByPopularity} className="cursor-pointer">Populairty </th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody className="font-medium">
                        {watchlistMoviesinDisplay.map((movie)=>{
                            return (
                                <tr className="text-base">
                                    <td className=" flex items-center gap-5">
                                    <img className="h-[8rem] w-[10rem] rounded-xl" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
                                        <span>{movie.title}</span>
                                    </td>
                                    <td className="">{movie.vote_average}</td>
                                    <td className="">{movie.popularity}</td>
                                    <td className="">{   
                                        movie.genre_ids.map((movieGenre)=>{ 
                                            return (
                                                    <span className="flex justify-center items-center my-2">{genreIdMappings[movieGenre]}</span>  
                                                );
                                            })
                                        }                    
                                    </td>
                                    <td className="justify-items-end w-[50px]">
                                    <img className="w-[25px] h-[25px]" src={deleteIcon} alt="delete-icon" onClick={()=>{removeFromWatchList(movie)}}/>       
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        </div>
    </>
    )
}
export default Watchlist;