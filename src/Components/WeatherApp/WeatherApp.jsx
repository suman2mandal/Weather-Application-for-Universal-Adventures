import React, {useState} from 'react';

import './WeatherApp.css'
import search_icon from "../Assets/search.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import {BsSearchHeart} from "react-icons/bs";
import {TiWeatherPartlySunny} from "react-icons/ti";
import {MdWindPower} from "react-icons/md";
import {WiHumidity} from "react-icons/wi";
import axios from "axios";

function WeatherApp(props) {
    const [ico_id,setIconId] = useState("03d");
    const [city,setCity] = useState("London");
    const [place,setPlace] = useState("");
    const [temperature, setTemperature] = useState(20);
    const [humidity,setHumidity] = useState(64);
    const [wind,setWind] = useState(13);
    const [forcust,setForcust] = useState();

    const api_key = process.env.REACT_APP_API_KEY;

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${api_key}`
    };
    let performSearch=async ()=>{
        let lat = 0;
        let long = 0;
        // const api__ = "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=c725443aacd06ebfc4b504abeba24283";
        const api__ = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
        let current_data = await axios.get(api__, {mode: 'no-cors'});
        const geo_api__ = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`;
        let geo_data = await axios.get(geo_api__, {mode: 'no-cors'});
        lat = geo_data.data[0].lat;
        long = geo_data.data[0].lon;
        const forcust_api__ = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api_key}`;
        let forcust_data = await axios.get(forcust_api__, {mode: 'no-cors'});
        setTemperature(current_data.data.main.temp);
        setIconId(current_data.data.weather[0].icon);
        setWind(current_data.data.wind.speed)
        setHumidity(current_data.data.main.humidity)
        setPlace(city);
        setForcust(forcust_data);

        console.log(current_data);
        console.log(forcust_data);
        console.log(geo_data);
    }

    // setInterval( performSearch(),100);


    const placeIcon=(ico_id,size="")=>{
        const icon_api = `https://openweathermap.org/img/wn/${ico_id}${size}.png`;
        return icon_api
        // console.log(ico_id)
    }
    function convertToAmPm(timeStr) {
        try {
            const [hours, minutes] = timeStr.split(':');
            let formattedTime = "";

            // Convert hours to 12-hour format
            let hours12 = parseInt(hours, 10);
            const amPm = hours12 >= 12 ? 'pm' : 'am';
            hours12 = hours12 % 12 || 12; // Convert 0 to 12 for noon/midnight

            formattedTime = `${hours12}:${minutes}`;

            return formattedTime;
        } catch (error) {
            return "Invalid time format";
        }
    }
    const showForcast=()=>{
        let img_list=[]
        if(forcust!=undefined) {
            for (let i = 0; i < 8; i++) {
                img_list.push(
                    <div className="flex w-full justify-evenly sm:w-1/4" key={i}>
                        <img src={placeIcon(forcust.data.list[i].weather[0].icon)}/>
                        <div className="flex text-white text-center items-center">
                            {convertToAmPm(forcust.data.list[i].dt_txt.slice(11, 16))}
                        </div>
                    </div>

                )
            }
        }
        return img_list
    }

    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <div className='bg-gradient-to-b from-blue-500 to-blue-800 w-full h-full sm:h-4/5 sm:w-2/5 p-3 rounded-xl'> {/* Adjusted height using inline style */}
               <div className='m-1 mt-5 w-full flex justify-center'>
                   <input type='text' className='bg-slate-700 text-2xl text-white rounded-2xl p-2 mr-2 w-3/5 sm:w-3/5' placeholder='country' onChange={(e)=>setCity(e.target.value)}/>

                   <div className=' text-3xl flex items-center justify-center rounded-full w-1/5 bg-white hover:bg-gray-200' onClick={performSearch}>
                        <BsSearchHeart />
                    </div>
               </div>
                <div className=" w-full flex justify-center items-center text-white">
                    <img src={placeIcon(ico_id,"@2x")}/>
                </div>
                <div className="flex w-full h-3/6 justify-center">
                    <div className=" w-5/6 h-full rounded-xl bg-opacity-60">
                        {/*Degree*/}
                        <div className="flex justify-center">
                            <p className="text-5xl text-white">{temperature}°c</p>
                        </div>
                        {/*location*/}
                        <div className="flex justify-center mt-2">
                            <p className="text-2xl text-white ">{place}</p>
                        </div>
                        <div className="flex justify-evenly mt-3">
                            {/*wind speed*/}
                            <div className="text-white">
                                <div className="flex text-white">
                                    <WiHumidity className="text-4xl"/>
                                    <div className="">
                                        <div className="text-xl">{humidity}%</div>
                                        <div>Humidity</div>
                                    </div>
                                </div>
                            </div>

                            {/*humidity*/}
                            <div className="text-white">
                                <div className="flex text-white">
                                        <MdWindPower className="text-3xl"/>
                                    <div className="">
                                        <div className="text-xl">{wind} km/h</div>
                                        <div>Wind Speed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-white">
                            <div className="font-bold hidden lg:block">
                                <div className="mb-5">AM</div>
                                <div>PM</div>
                            </div>

                            <div className="flex flex-wrap">
                                {showForcast()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default WeatherApp;