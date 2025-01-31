import {Link} from "react-router-dom";
// import Logo from '../../assets/MovieLogo.png';
import Logo from '../../assets/MovieLogo1.jpg';
import { useContext } from "react";
import { ThemeContext } from "../../App";
import Toggler from "../common/Toggler";

const Navbar = ()=>{
    const {theme,handlerTheme} = useContext(ThemeContext);
    const darkModeStyleClass = theme==="light"?"bg-white text-black":"bg-black text-white";

    return (
    <div className={`flex items-center space-x-9 py-6 relative ${darkModeStyleClass}`}>
        <Link to='/'>
            <img src={Logo} alt="app-logo" className="w-[50px] rounded-full"/>
        </Link>
        <Link to='/' className="text-xl font-extrabold font-mono hover:scale-110 duration-300">
            Movie
        </Link>
        <Link to='/watchlist' className="text-xl font-extrabold font-mono hover:scale-110 duration-300">
            Watchlist
        </Link>
        <Toggler/>
    </div>
    )
}
export default Navbar;