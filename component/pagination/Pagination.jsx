import { useContext } from "react";
import { ThemeContext } from "../../App";

const Pagination = ({pageNumber, onPrevClick,onNextClick}) =>{

    const {theme}=useContext(ThemeContext);
    const darkModeStyleClass = theme==="light"?"bg-gray-400 text-black":"bg-gray-900 text-white";

    return (
        <div className={`border mt-12 h-[50px] flex justify-center items-center gap-10 font-mono font-bold ${darkModeStyleClass}`}>
            <div className=" cursor-pointer" onClick={onPrevClick}>Prev</div>
            <div>{pageNumber}</div>
            <div className="cursor-pointer" onClick={onNextClick}>Next</div>
        </div>
    );
}
export default Pagination;