import { useContext } from "react";
import Banner from "../../component/banner/Banner";
import Movies from "../../component/movies/Movies";
import Navbar from "../../component/navbar/Navbar";
import { ThemeContext } from "../../App";

const Home = ()=>{

    const {theme,handlerTheme} = useContext(ThemeContext);
    const backgroundColorClass = theme==="light"?"bg-white text-black":"bg-black text-white";

    return (
    <div className={backgroundColorClass}>
        <Navbar/>
        <Banner/>
        <Movies/>
    </div>
    )
}
export default Home;