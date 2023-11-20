import React, {useEffect, useState} from 'react';
import weather_ico from './Assets/clear.png';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import SearchBar from "./SearchBar";

function Forcust({startDate,city,setStartDate,forcust_data}) {
    const [icon,setIcon] = useState("Clear");
    const [weather,setWeather] = useState("Cloudy");
    const [Htemperature,setHtemperature] = useState(20);
    const [Ltemperature,setLtemperature] = useState(20);
    const [humidity,setHumidity] = useState(20);
    const [SunriseTime,setSunriseTime] = useState("2:00");
    const [SunsetTime,setSunsetTime] = useState("3:00");
    const [date,setDate] = useState("20 Jan 2023");

    function convertUnixTimestampToTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        return formattedTime;
    }

    function convertDateStringToFormattedDate(dateString) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const inputDate = new Date(dateString);
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = months[inputDate.getMonth()];
        const year = inputDate.getFullYear();

        return `${day} ${month} ${year}`;
    }

    useEffect(() => {
        setSunriseTime(convertUnixTimestampToTime(forcust_data?.data?.city?.sunrise) );
        setSunsetTime(convertUnixTimestampToTime(forcust_data?.data?.city?.sunset) );
        forcust_data?.data?.list?.map((item, range) => {
            if (range <= 0) {
                setDate(item.dt_txt);
                setIcon(item.weather[0].icon);
                setWeather(item.weather[0].main);
                setHtemperature(item.main.temp_max);
                setLtemperature(item.main.temp_min);
                setHumidity(item.main.humidity);
                // setSunriseTime(item.city.SunriseTime);
                // setSunsetTime(item.ciry.SunsetTime);
            }
        });
    }, [city, forcust_data]);

    const placeIcon=(ico_id,size="")=>{
        const icon_api = `https://openweathermap.org/img/wn/${ico_id}${size}.png`;
        return icon_api
        // console.log(ico_id)
    }
    // const [date, setDate] = useState(new Date());

    const forecastData = [
        {
            date: "20 Jan 2023",
            weather: "Sunny",
            Htemperature: "27°C / 63°F",
            Ltemperature: "27°C / 63°F",
            Humidity: "50%",
            SunriseTime: "6:00",
            SunsetTime: "8:00",
        },
        {
            "date": "21 Jan 2023",
            "weather": "Partly Cloudy",
            "Htemperature": "25°C / 77°F",
            "Ltemperature": "18°C / 64°F",
            Humidity: "50%",
            "SunriseTime": "6:15",
            "SunsetTime": "7:45"
        },
        {
            "date": "22 Jan 2023",
            "weather": "Rainy",
            "Htemperature": "20°C / 68°F",
            "Ltemperature": "15°C / 59°F",
            Humidity: "50%",
            "SunriseTime": "6:30",
            "SunsetTime": "7:30"
        },
        {
            "date": "23 Jan 2023",
            "weather": "Cloudy",
            "Htemperature": "22°C / 72°F",
            "Ltemperature": "17°C / 63°F",
            Humidity: "50%",
            "SunriseTime": "6:10",
            "SunsetTime": "7:55"
        },
        {
            "date": "24 Jan 2023",
            "weather": "Clear Sky",
            "Htemperature": "30°C / 86°F",
            "Ltemperature": "22°C / 72°F",
            Humidity: "50%",
            "SunriseTime": "5:45",
            "SunsetTime": "8:15"
        },
        {
            "date": "25 Jan 2023",
            "weather": "Thunderstorm",
            "Htemperature": "18°C / 64°F",
            "Ltemperature": "14°C / 57°F",
            Humidity: "50%",
            "SunriseTime": "6:20",
            "SunsetTime": "7:40"
        }
    ];

    const repeatedForecasts = Array.from({ length: 6 }, (_, index) => (
            index===0?(
                <div className="grid grid-row-2 ">
                    <div className="text-sm sm:text-xl font-bold h-auto">  </div>
                    <div className="grid grid-row-6 items-center">

                        <div className="flex items-center">

                            <div className="relative max-w-sm">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                                {/*<input type="date" datepicker datepicker-autohide type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>*/}
                            </div>


                        </div>
                        <div className="text-xl font-bold">
                            Htemperature
                        </div>
                        <div className="text-xl font-bold mt-2">
                            Ltemperature
                        </div>
                        <div className="text-xl font-bold mt-2">
                            Humidity
                        </div>
                        <div className="text-xl font-bold mt-2">
                            SunriseTime
                        </div>
                        <div className="text-xl mb-4 font-bold mt-2">
                            SunsetTime
                        </div>
                    </div>
                </div>
            ):(
                <div className="grid grid-row-2 w-full px-2">
                    <div className="text-sm text-center sm:text-xl font-bold h-auto">{convertDateStringToFormattedDate(date)}</div>
                    <div className="grid w-full text-white rounded-xl grid-row-6 bg-gradient-to-b from-[#464646] to-[#1D2540]">

                        <div className="flex justify-center items-center">
                            {/*<img src={weather_ico} height={100} width={100} alt="weather_ico"/>*/}
                            <img src={placeIcon(icon,"@2x")}/>
                            <div className="text-3xl font-bold">
                                {/*{forecastData[index].weather}*/}
                                {weather}
                            </div>

                        </div>

                        <div className="text-xl text-center  font-bold">
                            <hr className="border-1 opacity-10 border-white w-full mb-4"/>
                            {/*{forecastData[index].Htemperature}*/}
                            {Htemperature}° F/{Htemperature}° C
                        </div>
                        <div className="text-xl text-center  font-bold mt-2">
                            {/*{forecastData[index].Ltemperature}*/}
                            {Ltemperature}° F/{Ltemperature}° C
                        </div>
                        <div className="text-xl text-center  font-bold mt-2">
                            {/*{forecastData[index].Humidity}*/}
                            {humidity} %
                        </div>
                        <div className="text-xl text-center font-bold mt-2">
                            {/*{forecastData[index].SunriseTime} AM*/}
                            {SunriseTime} AM
                        </div>
                        <div className="text-xl text-center mb-4 font-bold mt-2">
                            {/*{forecastData[index].SunsetTime} PM*/}
                            {SunsetTime} PM
                        </div>
                    </div>
                </div>
            )
    ));


    return (
        <>
        <div className="mx-20 mt-16">

            <div className="grid grid-cols-6 justify-items-center">
                {repeatedForecasts}
            </div>
        </div>
        </>
    );
}

export default Forcust;
