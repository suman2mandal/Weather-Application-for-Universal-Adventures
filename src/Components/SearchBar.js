import React from 'react';
import location_icon from "./Assets/material-symbols_share-location.png";
function SearchBar({location,state,setLocation,city,setCity,performSearch}) {
    return (
        <div className="mx-20 mt-16">
            <div className="sm:justify-between flex sm:flex-row flex-col-reverse ">
                <div className="flex justify-between">
                    <div>
                        <div className="flex items-center">
                            <img src={location_icon} height={50} width={50} alt="location_icon"/>
                            <div className="text-xl sm:text-2xl md:text-4xl font-bold">
                                {city},{state}
                            </div>
                        </div>
                        {location}
                    </div>
                </div>
                <form className="w-full sm:w-80">
                    <div className="flex">
                        <label
                            htmlFor="location-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Your Email
                        </label>

                        <div className="relative w-full">
                            <input
                                type="search"
                                id='location-search"'
                                className="block p-2.5 w-full z-20 text-sm text-gray-900  rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                                  dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder="Search for city or address"
                                required=""
                                onChange={(e)=>{setCity(e.target.value)} }
                                value={city}
                            />
                            <button
                                type="submit"
                                className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-black  rounded-e-lg border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                onClick={(e)=>{e.preventDefault();performSearch()}}
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <hr className="h-px my-8 bg-gray-100 border-0 dark:bg-gray-700"/>
        </div>
    );
}

export default SearchBar;