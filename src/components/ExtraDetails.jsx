import React, {useState} from "react";
import exit from "../assets/exit.svg"

function ExtraDetails(props) {
  console.log(props)
    return(
      <div className={props.shouldShow ? "extra grow" : null} style={props.shouldShow ? {display: "block"} : {display: "none"}}>
         

        <div className="img-exit">
          <div className="sticky">
            <img  onClick={() => {
              console.log("hello")
              props.update(false)
            }}  src={exit} alt=""  className="extra-exit" />

            <img className="icons" src={props.hr.condition.icon} alt="" />
          </div>
           
          
        </div>
       
       

         
          <div className="up-c">
              <div className="up-p">
              <p>Chances of rain?  {props.hr.chance_of_rain}</p>
                <p>Chances of snow? {props.hr.chance_of_snow}</p>
              

              
                <p>Humidity: {props.hr.humidity}</p>

                <p>HeatIndex: {props.hr.heatindex_c}</p>
                
                  <p> UV: {props.hr.uv}</p>
            
                  <p>feels like:{props.hr.feelslike_c}</p>
                  <p>time: {props.hr.time}</p>
              </div>
               

          </div>
         
       
       

       
        
      </div>
    )
}

export default ExtraDetails