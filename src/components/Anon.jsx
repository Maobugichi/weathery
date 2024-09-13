import React from "react";

function Anon(props) {
  console.log(props.items)
  return(
    <>
      <div className="ano2">
        <p>{props.items.current.condition.text}</p>
        <p>{props.items.current.temp_c}</p>
        <p>{props.items.location.name}</p>
        <p>{props.items.location.tz_id}</p>
      </div>
     
      
        
    </>
   
    
   
  )
}

export default Anon