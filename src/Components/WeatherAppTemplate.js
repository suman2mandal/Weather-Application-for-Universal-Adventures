import React, {useState} from 'react';
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Forcust from "./Forcust";
import axios from "axios";
function WeatherAppTemplate(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [city,setCity] = useState("London");
    const [location,setLocation] = useState("27°10'36'' N & 78°0'29'' E");
    const [forcust_data,setForcust_data] = useState("");
    const [state,setState] = useState("England");


    const api_key = process.env.REACT_APP_API_KEY;
    console.log(startDate);
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${api_key}`
    };

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
        setState(geo_data.data[0].state);
        const forcust_api__ = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api_key}`;
        setForcust_data( await axios.get(forcust_api__, {mode: 'no-cors'}));
        // console.log(current_data);
        // console.log(geo_data);
    }
    console.log(forcust_data,"setForcust_data");

    const api__ = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
    return (
        <div>
            <NavBar setStartDate={setStartDate} setState={setState} setCity={setCity} setLocation={setLocation}/>
            <SearchBar location={location} state={state} setLocation={setLocation} city={city} setCity={setCity} performSearch={performSearch} />
            <Forcust startDate={startDate} city={city} setStartDate={setStartDate} forcust_data={forcust_data}/>
        </div>
    );
}

export default WeatherAppTemplate;