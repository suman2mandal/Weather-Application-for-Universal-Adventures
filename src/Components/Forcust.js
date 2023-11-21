import React, {useEffect, useState} from 'react';
import weather_ico from './Assets/clear.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import SearchBar from "./SearchBar";

function Forcust({startDate,city,setStartDate,forcust_data}) {
    const [dates, setDates] = useState([]);
    const [icons, setIcons] = useState([]);
    const [weathers, setWeathers] = useState([]);
    const [Htemperatures, setHtemperatures] = useState([]);
    const [Ltemperatures, setLtemperatures] = useState([]);
    const [humidities, setHumidities] = useState([]);
    const [SunriseTimes, setSunriseTimes] = useState([]);
    const [SunsetTimes, setSunsetTimes] = useState([]);

    function convertUnixTimestampToTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
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

    let endDate = new Date(startDate);
    if(startDate!=="") {
        endDate.setDate(startDate.getDate() + 4);
    }
    function extractDateFromDateObject(dateObject) {
        // Extracting date components
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = dateObject.getDate().toString().padStart(2, '0');

        // Creating the formatted date string
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }


    useEffect(() => {
        const filteredData = [];

        forcust_data?.data?.list?.forEach((item) => {
            const dateObject = new Date(item.dt_txt);
            const current_date = extractDateFromDateObject(dateObject);
            const existingEntry = filteredData.find((entry) => entry.date === current_date);

            if (!existingEntry) {
                filteredData.push({
                    date: current_date,
                    data: item,
                });
            } else {
                if (item.priority > existingEntry.data.priority) {
                    existingEntry.data = item;
                }
            }
        });

        console.log(filteredData);
        const newDates = [];
        const newIcons = [];
        const newWeathers = [];
        const newHtemperatures = [];
        const newLtemperatures = [];
        const newHumidities = [];
        const newSunriseTimes = [];
        const newSunsetTimes = [];

        filteredData?.forEach((item, range) => {
            newDates.push(item.data.dt_txt);
            newIcons.push(item.data.weather[0].icon);
            newWeathers.push(item.data.weather[0].main);
            newHtemperatures.push(item.data.main.temp_max);
            newLtemperatures.push(item.data.main.temp_min);
            newHumidities.push(item.data.main.humidity);
            newSunriseTimes.push(convertUnixTimestampToTime(forcust_data?.data?.city?.sunrise));
            newSunsetTimes.push(convertUnixTimestampToTime(forcust_data?.data?.city?.sunset));

            setDates(newDates);
            setIcons(newIcons);
            setWeathers(newWeathers);
            setHtemperatures(newHtemperatures);
            setLtemperatures(newLtemperatures);
            setHumidities(newHumidities);
            setSunriseTimes(newSunriseTimes);
            setSunsetTimes(newSunsetTimes);

        });
    }, [city, forcust_data]);

    const placeIcon=(ico_id,size="")=>{
        const icon_api = `https://openweathermap.org/img/wn/${ico_id}${size}.png`;
        return icon_api
    }

    function celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }
    function removeDecimalPart(number) {
        return Math.floor(number);
    }


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
                    <div className="text-sm text-center sm:text-xl font-bold text-2xl h-auto">{convertDateStringToFormattedDate(dates[index-1])}</div>
                    <div className="grid w-full text-white rounded-xl grid-row-6 bg-gradient-to-b from-[#464646] to-[#1D2540]">

                        <div className="flex flex-col xl:flex-row justify-center mt-2 mb-2 items-center">
                            {/*<img src={weather_ico} height={100} width={100} alt="weather_ico"/>*/}
                            <img className="shadow-gray-500 shadow-md rounded-full" src={placeIcon(icons[index-1],"@2x")}/>
                            <div className="text-3xl font-bold">
                                {/*{forecastData[index].weather}*/}
                                {weathers[index-1]}
                            </div>

                        </div>

                        <div className="text-xl text-center  font-bold">
                            <hr className="border-1 opacity-10 border-white w-full mb-4"/>
                            {/*{Htemperature}*/}
                            {removeDecimalPart(celsiusToFahrenheit(Htemperatures[index-1]-273.15))}° F/{removeDecimalPart(Htemperatures[index-1]-273.15)}° C
                        </div>
                        <div className="text-xl text-center  font-bold mt-2">
                            {/*{Ltemperature}*/}
                            {removeDecimalPart(celsiusToFahrenheit(Ltemperatures[index-1]-273.15))}° F/{removeDecimalPart(Ltemperatures[index-1]-273.15)}° C
                        </div>
                        <div className="text-xl text-center  font-bold mt-2">
                            {/*{forecastData[index].Humidity}*/}
                            {humidities[index-1]} %
                        </div>
                        <div className="text-xl text-center font-bold mt-2">
                            {/*{forecastData[index].SunriseTime} AM*/}
                            {SunriseTimes[index-1]} AM
                        </div>
                        <div className="text-xl text-center mb-4 font-bold mt-2">
                            {/*{forecastData[index].SunsetTime} PM*/}
                            {SunsetTimes[index-1]} PM
                        </div>
                    </div>
                </div>
            )
    ));


    return (
        <>
            <div className="mx-20 mt-16">
                <div className={`grid min-h-min grid-cols-6 justify-items-center ${window.innerWidth >= 768 ? 'overflow-y-auto max-h-screen' : ''}`}>
                    {repeatedForecasts}
                </div>
            </div>
        </>
    );
}

export default Forcust;
