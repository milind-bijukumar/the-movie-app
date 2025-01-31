import { useContext } from "react";
import heartLikeIcon from "../../assets/heart-solid-like.svg";
import heartUnlikeIcon from "../../assets/heart-solid-unlike.svg";
import { WatchlistContext } from "../../App";

const MovieCard = ({movieObj}) =>{
const WatchlistContextValue = useContext(WatchlistContext);
const {watchlist,addToWatchList,removeFromWatchList} = WatchlistContextValue;

const isMovieInWatchList=watchlist.find((movie)=>movie.id===movieObj.id);
    return (
        <>  
            <div className="relative rounded-lg h-[41vh] w-[200px] bg-cover
                bg-center flex items-end justify-center text-white
                hover:scale-110 duration-300" 
                style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${movieObj.backdrop_path})`}}>
                
                {
                (isMovieInWatchList)
                ? <div>
                    <img className="w-[1.5rem] h-[1.5rem] absolute -top-0 -right-0 m-2 cursor-pointer" onClick={()=>{
                        removeFromWatchList(movieObj);
                    }} src={heartLikeIcon} alt="watchlist-add"/>
                </div>
                : <div className="">
                    <img className="w-[1.5rem] h-[1.5rem] absolute -top-0 -right-0 m-2 cursor-pointer" onClick={()=>{
                        addToWatchList(movieObj);
                    }} src={heartUnlikeIcon} alt="watchlist-remove"/>
                </div>                
                }

                <div className="font-medium bg-gray-900 bg-opacity-70 w-full font-mono p-1">
                    {movieObj.title}
                </div>
            </div>
        </>
    );
};
export default MovieCard
