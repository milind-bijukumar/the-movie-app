import { useEffect, useState } from "react";
// import MoviePoster from "../../assets/MoviePoster.jpg";
import Pagination from "../pagination/Pagination";
import axios from 'axios';
import Spinner from "../common/Spinner";
import MovieCard from "../movieCard/MovieCard";

const Movies = ()=>{
    const [movies,setMovies] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const onPrevClick=()=>{
        if (pageNumber>1)  
                setPageNumber(pageNumber-1);
    }

    const onNextClick=()=>{
        if (pageNumber<500)  
                setPageNumber(pageNumber+1);
    }


    const fetchMovieData= async()=>{
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=1439d8ee0449071c8283dae52000692e&page=${pageNumber}`);
            const movies = response.data.results;
            setMovies(movies);
            setIsLoading(false);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchMovieData();
        // setTimeout(fetchMovieData,2000);
    },[pageNumber])
    
    return (
    <div>
        <div>
            <h2 className="m-10 font-bold text-3xl font-mono">Trending Movies</h2>
        </div>
        
        {   (isLoading) ? <Spinner/>:
        <>
            <div className="flex flex-wrap gap-8 justify-evenly">
            {movies.map((movieObj)=>{
                return (
                <>
                    <MovieCard movieObj={movieObj}/>
                </>    
                );
            })}
        </div>
        <div>
            <Pagination pageNumber={pageNumber} onNextClick={onNextClick} onPrevClick={onPrevClick}/>
        </div>
        </>
    } 
    </div>
    )
}
export default Movies;