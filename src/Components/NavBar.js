import React from 'react';
import icon from "./Assets/Vector.png";
import refresh from "./Assets/mdi_refresh-circle.png";
function NavBar({setStartDate,setState,setCity,setLocation}) {
    return (
        <div className="flex justify-between bg-[#000000] bg-opacity-50 w-screen p-2 items-center">
            <div className="flex sm:ml-48">
                <img src={icon} height={50} width={50} alt="icon"/>
                <div className="mx-2 font-bold text-white text-4xl">
                    Weather 99
                </div>
            </div>
            <div onClick={()=>{setStartDate("");setState("");setCity("");setLocation("")}} className="flex sm:mr-80 items-center">
                <img src={refresh} height={50} width={50} alt="refresh"/>
                <div className="mx-2 font-bold text-white ">
                    Refresh
                </div>
            </div>
        </div>
    );
}

export default NavBar;