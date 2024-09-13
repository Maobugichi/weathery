import React, {useState,useEffect} from "react";
import axios from "axios";
import location from "../assets/fluent_location-20-regular.png";
import sunny from "../assets/Sun.svg";
import partCloud from "../assets/Icon.svg";
import wind from "../assets/solar_wind-linear.svg";
import humidity from "../assets/carbon_humidity.svg";
import sunrise from "../assets/sunrise.svg";
import uv from "../assets/uv.svg";
import eye from "../assets/eye.svg";
import sundown from "../assets/sundown.svg";
import Upper from "./Upper";
import Tday from "./Tday";
import moon from "../assets/base Moon.png"
import moon2 from"../assets/partly-cloudy-night.svg"
import heavyrain from "../assets/heavy-shower.svg"
import lightShower from "../assets/light-shower.svg"
import storm from "../assets/thunder-storm.svg"
import fog from "../assets/fog.svg"
import clear from "../assets/clear-night.svg"
import prain from "../assets/path-rain.png"
import psnow from "../assets/patchy-snow.svg"
import stsnow from "../assets/heavy-snow.svg"
import exit from "../assets/exit.svg"
import ExtraDetails from "./ExtraDetails";

function InputArea() {
  const [imgSrc, updateImageSrc] = useState();
  const [modify, updateModify] = useState(false)
  const [change,trackChange] = useState("")
  const [resultt,updateResult] = useState("")
  const [render,updateRender] = useState(false)
  const [myUpper, updateUpper] = useState([ ])
  const [showDeet, updateShowDeet] = useState("")
  const [list,updateList] = useState({
    sunrise:"",
    avgTempC: "",
    condition:"",
    humidity:"",
    windSpeed: "",
    windDir:"",
    name:"",
    lat:"",
    lon: "",
    localTime:"",
    uvIndex: "",
    country:"",
    tempC:"",
    maxTemp: "",
    minTemp:"",
    sunset:"",
    forecast:"",
    hour:"",
    icon:"",
    vision:"",
    feels:""
    
  })
  const [day,updateDay] = useState("")
  const [date, updateDate] = useState()
  const [load,updateLoad] = useState(false)
  const [forecast,updateForecast] = useState([ ])
  const [hr,updateHr] = useState([ ])
  const [checkDay, updateCheckDay] = useState(false);
  const [isDay, updateIsDay] = useState()
  const [whichDay, updateWhichDay] = useState("")
  const [isHover, updateIsHover] = useState(false)
  const [isDisplay, updateIsDisplay] = useState(false)
  const [checkShowDeet, upDateCheckShowDeet] = useState(false)
  const today = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const month = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const randomCity = ["Lagos", "Japan", "Kenya", "Beijing","Seoul","Vancouver","Rome","Honolulu","Zurich","Umuahia"]

  const randomNumber = Math.floor(Math.random( ) * randomCity.length)

  useEffect(() => {
    getApi();
    window.addEventListener("load", getApi);
    return () => {
      window.removeEventListener("load", getApi);
    };
  }, []);

  function isChange(event) {
    const {name,value} = event.target;
    trackChange(value)
    updateRender(true)
  }

  function days(event) {
    updateDay(event.target.value)
  }



  async function run(event) {
    event.preventDefault()
   
    try {
      const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=a951354fb6a44badbb0161031240609&q=${change}&days=${day}`)
    render ? updateList((prev) => {
        return {
          ...prev, 
          sunrise:result.data.forecast.forecastday[0].astro.sunrise,
          avgTempC: result.data.forecast.forecastday[0].day.avgtemp_c,
          condition:result.data.current.condition.text,
          humidity:result.data.current.humidity,
          windSpeed: result.data.current.wind_kph,
          windDir:result.data.current.wind_dir,
          name:result.data.location.name,
          lat: result.data.location.lat,
          lon: result.data.location.lon,
          localTime:result.data.location.localtime,
          uvIndex: result.data.current.uv,
          country:result.data.location.country,
          tempC:result.data.current.temp_c,
          maxTemp: result.data.forecast.forecastday[0].day.maxtemp_c,
          minTemp:result.data.forecast.forecastday[0].day.mintemp_c,
          sunset:result.data.forecast.forecastday[0].astro.sunset,
          icon: result.data.current.condition.icon,
          hour: result.data.forecast.forecastday[0].hour,
          vision:result.data.current.vis_km,
          feels:result.data.current.feelslike_c
        }
      }) : list
     
      console.log(result.data.current.vis_km)
      trackChange("")
      updateCheckDay(true)
      const d = new Date(list.localTime.slice(0,10))
      updateDay(`${today[d.getUTCDay()]}`)
      updateDate(`${d.getUTCDate()} ${month[d.getUTCMonth()]}  ${d.getUTCFullYear()}`)
    } catch (err) {
      console.log(err.message)
    }
  }

 async function getApi() {
  try {
    updateLoad(true)
    const result = await axios.get("https://api.weatherapi.com/v1/forecast.json?key=a951354fb6a44badbb0161031240609&q=Lagos&days=5")

    //console.log(result.data.current.is_day)

    updateIsDay(result.data.current.is_day)
    updateList((prev) => {
      const forecastday = result.data.forecast.forecastday;

     return {
        ...prev,
        sunrise:result.data.forecast.forecastday[0].astro.sunrise,
        avgTempC: result.data.forecast.forecastday[0].day.avgtemp_c,
        condition:result.data.current.condition.text,
        humidity:result.data.current.humidity,
        windSpeed: result.data.current.wind_kph,
        windDir:result.data.current.wind_dir,
        name:result.data.location.name,
        lat: result.data.location.lat,
        lon: result.data.location.lon,
        localTime:result.data.location.localtime,
        uvIndex: result.data.current.uv,
        country:result.data.location.country,
        tempC:result.data.current.temp_c,
        maxTemp: result.data.forecast.forecastday[0].day.maxtemp_c,
        minTemp:result.data.forecast.forecastday[0].day.mintemp_c,
        sunset:result.data.forecast.forecastday[0].astro.sunset,
        forecast: result.data.forecast.forecastday,
        hour: result.data.forecast.forecastday[0].hour,
        vision:result.data.current.vis_km,
        feels:result.data.current.feelslike_c
        
      }
    })

    updateForecast((prev) => {
      return [...prev,
        result.data.forecast.forecastday
      ]
    })
      const results = await Promise.all(randomCity.map(async (item) => {
        const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=a951354fb6a44badbb0161031240609&q=${item}&days=5`)
        return result.data
      }))
      updateUpper(results)
      updateForecast(list.forecast)

     
     
  } catch (err) {
    console.log(err.message)
  }
 }

 function showDetails(id) {
    Array.isArray( list.hour) ? list.hour.find((item,index) => {
        if (id === index) {
          updateShowDeet(item)
          upDateCheckShowDeet(true)
        }
    }): null
 }

 
 const d = new Date()
 const myDay = d.getUTCDay()
 const myMonth = d.getMonth()
 const myYear = d.getUTCFullYear()
 const tDay = d.getUTCDate()
const jDay = `${tDay}, ${ month[myMonth]}, ${myYear}`
 console.log(isDay)


 
useEffect(() => {
  if (list.condition.toLowerCase().includes("partly cloudy".toLocaleLowerCase()) && isDay === 1) {
    updateModify(true)
    updateImageSrc(partCloud);
  } else if (list.condition.toLowerCase().includes("partly cloudy".toLocaleLowerCase()) && isDay === 0) {
      updateImageSrc(moon2)
      updateModify(true)
  } else if (list.condition.includes("Light rain") ) {
      updateImageSrc(lightShower)
      updateModify(true)
  } else if (list.condition.includes("Sun")) {
    updateImageSrc(sunny)
    updateModify(true)
    
  } else if (list.condition.toLowerCase().includes("heavy rain".toLowerCase())) {
    updateImageSrc(heavyrain)
    updateModify(true)
  } else if (list.condition.toLowerCase().includes("Mist".toLocaleLowerCase())) {
    updateImageSrc(fog)
    updateModify(true)
  } else if (list.condition.toLowerCase().includes("clear".toLocaleLowerCase())) {
    updateImageSrc(clear)
    updateModify(true)
  } else if (list.condition.toLowerCase().includes("patchy rain".toLocaleLowerCase())) {
    updateImageSrc(prain)
    updateModify(true)
  } else if (list.condition.toLowerCase().includes("patchy snow".toLocaleLowerCase())) {
    updateImageSrc(psnow)
    updateModify(true)
  } else if (list.condition.toLowerCase().includes("heavy snow".toLocaleLowerCase())) {
    updateImageSrc(stsnow)
    updateModify(true)
  } 
}, [list.condition])

checkDay ? console.log(day): console.log("day does not exist")


 

  return(

   <div className="home">
       <div className="weather">
      <form>
          <input className="border-gray-300 focus:border-blue-400" onChange={isChange} type="text" value={change} placeholder="Enter City"/>
         
          <button onClick={run} type="submit">click</button>
        </form>
       <div className="container">
       
        <div className="gridleft">
        <div className="grid-1">
          <div className="location">
            <img src={location} alt="" />
            <h2 className="loca-head">{list.country}, {list.name}</h2>
          </div>         
          <div className="lower-flex">
            <div className="ldl">
              <div className="date">
               
                <h1>{checkDay ? day : today[myDay]}</h1>
                <h3>{checkDay ? date : jDay}</h3>
              </div>

              <div className="latWind">
                <p className="lat">lat{list.lat} & lon{list.lon}</p>
                <p className="win">windDir{list.windDir}</p>
              </div>
              
            </div>

          
            <img className="sunny"  src={modify ?imgSrc : list.icon} alt="" />

            <div className="temp">
              <div className="tet">
              <p className="tempe"> {list.maxTemp} ° </p> <br />  <span className="list-span">/{list.minTemp} °</span>
            
              </div>
              
              <div className="tet">
              <p className="cond"> {list.condition}</p>
              <span className="win">
                Feels Like {list.feels}
              </span>
              </div>
          </div>
          </div>
        </div>

        <div className={isDisplay ? "anon-grid grow": null} style={isDisplay?null:{display:"none"}}>
          <img onClick={() => {
             updateIsDisplay(false)
          }} className="exit" src={exit} alt="" />
           <div>
              {myUpper.map((item,index) => {
                
                  return(
                    <Upper key={index} src={partCloud} src2={clear} items={item}/>
                  )
              })}
            </div>
        </div>
     
       
        <div className="grid-2">
          <div className="two-head">
            <h3>Others Countries</h3>
            <p className="see-all-click" onMouseOver={() => {
              updateIsHover(true)
            }} onMouseOut={() =>{
              updateIsHover(false)
            }}  onClick={() => {
              updateIsDisplay(true)
            }} style={isHover ? {color:"#B9B9B9"}: null}>See All</p>
          </div>

          
          <div className="flex-1">
            {myUpper.map(item => {
                return(
                  <Upper src={partCloud} src2={clear} items={item}/>
                )
            })}
           
            
          </div>
        </div>
        </div>
       

        <div className="gridRight">
          <div className="grid3">
            <h2>Todays Highlight</h2>
            <div className="lowerr">
              <div className="low-up">
              <div className="wind">
                <div className="ws">
                  <div className="wind-icon">
                    <img src={wind} alt="" />
                  </div>
                  
                  <h3 className="stat">Wind Status</h3>
              </div>
                
                  <p className="speed">{list.windSpeed} <span>km/h</span></p>
                  <p className="time">9:00AM</p>
              </div>

              <div className="humidity">
                <div className="hu">
                    <h3>Humidity</h3>
                    <div className="humidity-icon">
                      <img src={humidity} alt="" />
                      
                    </div>
                </div>
                  <p className="speed">{list.humidity}%</p>
                  <p>Humidity is good</p>
               

              </div>

              <div className="sunrise">
                  <img className="rise" src={sunrise} alt="" />

                  <div className="riseTime">
                    <p>sunrise</p>
                    <p className="speed">{list.sunrise}</p>
                  </div>
              </div>
              </div>

              <div className="low-up">
              <div className="uv">
                <div className="ws">
                  <div className="uv-icon">
                    <img  src={uv} alt="" />
                  </div>
                  
                  <h3 className="stat">UV Index</h3>
                 
                </div>
                
                  <p className="speed">{list.uvIndex} <span>UV</span></p>
                  <p className="time">Moderate UV</p>
              </div>

              <div className="humidity">
                <div className="hu">
                <div className="eye-icon">
                    <img className="eyelid" src={eye} alt="" />
                </div>
                    <h3>Visibility</h3>
                </div>
                  <p className="speed">{list.vision} <span>km/h</span> </p>
                  <p>9:00Am</p>
               

              </div>

              <div className="sunrise">
                  <img className="rise" src={sundown} alt="sundown" />


                  <div className="riseTime">
                    <p className="rs">sundown</p>
                    <p className="speed">{list.sunset}</p>
                  </div>
              </div>
              </div>
            
            </div>  
          </div>

         { checkShowDeet ? <ExtraDetails hr={showDeet} shouldShow={checkShowDeet} update={upDateCheckShowDeet}/> : null }

         
          <div className="grid4">
            <h2>24 hrsForecast</h2>

            <div className="days-list">
              
              {Array.isArray( list.hour) ? list.hour.map((item,index) => {
                return <Tday details={showDetails} id={index} key={index} src={partCloud} item={item}/> 
              }) : null}
           

            </div>
          </div>
        </div>
   
       
    </div>

  
       
    </div>
   </div>
   
    
  )

}  
   
export default InputArea
 


