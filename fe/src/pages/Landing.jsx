import { useEffect } from "react";
import { createSession, updateScreen } from "../api/sessionApi";
import { PAGE_CATALOG, PAGE_LANDING } from "../constants";
import {useNavigate} from "react-router-dom";

const Landing = () => {

    const navigate = useNavigate();

    useEffect(() => {
        createSession(PAGE_LANDING)
    }, [])

    const onNextPage = () => {
        updateScreen(PAGE_CATALOG)
            .then(() => {
                navigate("/" + PAGE_CATALOG);
            })
            .catch(error => {
              //  alert("Error = " + error);
            });
    };
    
    return (
    <div>
        <div className="container mx-auto mt-2 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 pt-3 pb-3 pl-5 pr-5 rounded-md text-white cursor-pointer
            transition-transform hover:scale-105" onClick={() => onNextPage()}>LOGIN</button>
        </div>
        <div className="container mx-auto pt-5">
            <div>
                <img src="/images/jewelry_landing.jpeg"></img>
            </div>
            <div className="text-center">
                <button className="bg-blue-700 mt-3 pt-3 pb-3 pl-5 pr-5 rounded-md text-white cursor-pointer tracking-widest 
                transition-transform hover:scale-101" onClick={() => onNextPage()}>EXPLORE PRODUCTS</button>
            </div>
        </div>
    </div>
    )
}
export default Landing;