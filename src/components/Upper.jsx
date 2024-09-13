import React, { useState, useEffect } from "react";
import lightShower from "../assets/light-shower.svg"
import patch from "../assets/patches.png"
import sun from "../assets/Sun.svg"
import moon from "../assets/base Moon.png"
import moon2 from"../assets/partly-cloudy-night.svg"
import heavyrain from "../assets/heavy-shower.svg"


function Upper(props) {
  const [imgSrc, updateImageSrc] = useState();
  const [modify, updateModify] = useState(false)
  console.log(props.items)
  useEffect(() => {
    if (props.items.current.condition.text.toLowerCase().includes("partly cloudy".toLocaleLowerCase()) && props.items.current.is_day === 1) {
      updateModify(true)
      updateImageSrc(props.src);
    } else if (props.items.current.condition.text.toLowerCase().includes("partly cloudy".toLocaleLowerCase()) && props.items.current.is_day === 0) {
        updateImageSrc(moon2)
        updateModify(true)
    } else if (props.items.current.condition.text.includes("Light rain") && props.items.current.is_day === 1) {
        updateImageSrc(lightShower)
        updateModify(true)
    } else if (props.items.current.condition.text.includes("Sun") && props.items.current.is_day === 1) {
      updateImageSrc(sun)
      updateModify(true)
      console.log(props.items.current.condition.text);
    } else if (props.items.current.condition.text.toLowerCase().includes("heavy rain".toLowerCase()) && props.items.current.is_day === 1) {
      updateImageSrc(heavyrain)
      updateModify(true)
    } else if (props.items.current.condition.text.toLowerCase().includes("clear".toLowerCase()) && props.items.current.is_day === 0) {
      updateImageSrc(props.src2)
      updateModify(true)
    }
  }, [props.items.current.condition.text])
 //console.log(props.items.current.condition.icon)
  return(
  <div className="upper">
    <div className="country">
      <span className="count-nme">{props.items.location.country}</span>
      <h2 className="cityName">{props.items.location.name}</h2>
      <p className="con">{props.items.current.condition.text}</p>
    </div>
    
    <div className="grim-div">
    <img className="grimg" src={modify ? imgSrc : props.items.current.condition.icon}  alt="" />
    </div>

   
  
    <div className="tet2">
      <p className="tempe2">{props.items.forecast.forecastday[0].day.maxtemp_c} °</p>   <span className="list-span2">/{props.items.forecast.forecastday[0].day.mintemp_c} °</span>
    
    </div>
    
  </div>
  )
 
}

export default Upper