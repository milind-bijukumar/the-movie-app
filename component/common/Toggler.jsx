import { useContext } from "react";
import { ThemeContext } from "../../App";

const Toggler = () =>{
    const {theme,handlerTheme} =useContext(ThemeContext);
    const darkModeStyleClass=theme==="light"?"text-black":"text-white";
    
    

    return(
        <div className="absolute -right-0">        
        <label className="inline-flex items-center cursor-pointer">
            <input onChange={handlerTheme} type="checkbox" value={theme} className="sr-only peer" checked={theme !== "light"}/>
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-teal-600"></div>
            <span className="ms-3 text-sm font-medium darkModeStyleClass">Dark Mode</span>
        </label>
        </div>
    );
}

export default Toggler;