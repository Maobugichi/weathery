import React, { useState, useEffect } from "react";
import lightShower from "../assets/light-shower.svg"
import patch from "../assets/patches.png"

function Tday(props) {
 
const [showDeets, updateShowDeets] = useState(false)
  //console.log(props)
  /*useEffect(() => {
    if (props.item.condition.text.includes("Cloudy")) {
      updateImageSrc(props.src);
    } else if (props.item.condition.text.includes("Light rain")) {
        updateImageSrc(lightShower)
       
    } else if (props.item.condition.text.includes("rain")) {
        updateImageSrc(patch)
      console.log(props.item.condition.text);
    }
  }, [props.item.condition.text]); // Only run the effect when props.item.condition.text changes*/

  return (
    <div className="today" onClick={() => {
      props.details(props.id)
    }}>
      <div className="th">
        <h3>{props.item.time.slice(11, 18)}</h3>
      </div>
      <img src={props.item.condition.icon} alt="" />
      <p>{props.item.temp_c}</p>
      <p className="con">{props.item.condition.text}</p>
    </div>
  );
}

export default Tday