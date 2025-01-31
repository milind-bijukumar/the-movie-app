import { useEffect, useState } from "react";
import axios from 'axios';
// import PlaceHolderImage from "../../assets/imagePlaceholder.png"
import PlaceHolderImage from "../../assets/imagePlaceholder3.gif"
import getRandomValue from "../../utils"

const Banner = ()=>{
    const [bannerImg,setBannerImg] = useState(PlaceHolderImage);
    const [movieTitle, setMovieTitle] = useState();
    
    const fetchMovieData= async()=>{
        try{
            const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=1439d8ee0449071c8283dae52000692e");
            const movies = response.data.results;
            const requiredMovieIndex = getRandomValue(0,19);
            const movie = movies[requiredMovieIndex];
            const bannerImageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
            setBannerImg(bannerImageUrl);
            setMovieTitle(movie.title);
        }
        catch(error){
            console.log("Unable to fetch",error);
        }
    };

    useEffect(()=>{
        fetchMovieData();
        // setTimeout(fetchMovieData,2000);
    },[]);


    return (
    <div className="h-[80vh] bg-cover bg-center  flex items-end justify-center my-10" 
        style={{backgroundImage:`url(${bannerImg})`}}>
        <div className="text-white font-bold font-mono text-2xl tracking-widest m-2 bg-gray-900 bg-opacity-60 rounded-full" >
            {movieTitle}
        </div>
    </div>
 
    )
}
export default Banner;