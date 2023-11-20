// import './App.css';
import './index.css';
import WeatherApp from "./Components/WeatherApp/WeatherApp";
import WeatherAppTemplate from "./Components/WeatherAppTemplate";
function App() {
  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-[#E0E8F1] to-[#BFCAD6]">
      {/*<WeatherApp/>*/}
        <WeatherAppTemplate/>
    </div>
  );
}

export default App;
