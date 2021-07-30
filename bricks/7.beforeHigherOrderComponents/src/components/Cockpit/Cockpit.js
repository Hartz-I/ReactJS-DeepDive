import React, { useEffect } from "react"; //use effect is like all lifecycle hooks mashed

import Radium from "radium";

import "./Cockpit.css";

const cockpit = (props) => {
  //useEffect lifecycle hook replacement for functional components
  //works every render
  //it's like component did update and component did mound compbined

  useEffect(() => {
    console.log("[Cockpit.js] useEffect");
    //http requests..

    const timer = setTimeout(() => {
      alert("Saved data from cloud");
    }, 1000);

    return () => {
      //run everytime cockpit is removed
      console.log("[Cockpit.js] cleanup work in use effect");

      //remove timer when no cockpit
      clearTimeout(timer);
    };
  }, []); //if put props.persons in [] then it only occurs if persons change
  //if [] is empty then only runs when page loads
  //put dependency in []

  //useEffect use it as many times needed

  //useEffect can also be to cleanup
  useEffect(() => {
    //this runs 2nd
    console.log("[Cockpit.js] 2nd useEffect");
    return () => {
      //this runs first
      //run every cycle or change as no dependecy 'that []' was passed
      console.log("[Cockpit.js] cleanup work in 2nd use effect");
    };
  }, []); //even executes when hovers on button

  const style = {
    backgroundColor: "green",
    color: "white",
    font: "inherit",
    border: "1px solid blue",
    padding: "8px",
    cursor: "pointer",

    ":hover": {
      //can use this for radium
      backgroundColor: "lightgreen",
      color: "black",
    },
  };

  if (props.showPersons) {
    //changing color if list if showing
    style.backgroundColor = "rgb(211, 31, 31)"; //could've put in the next if block. but just to show separately

    style[":hover"] = {
      //in quote cuz in object in quote
      backgroundColor: "salmon",
      color: "black",
    };
  }

  //dynamically changing classes
  const classes = ["para"];

  //putting the classes in array if conditions met
  if (props.personsLength <= 2) {
    //perosns.length isn't picked up by react. so it re renders all
    //so we directly pass the length instead of measuring it here
    classes.unshift("red");
  }

  if (props.personsLength <= 1) {
    classes.push("bold");
  }

  return (
    <div>
      <h1 className="title">{props.title}</h1>
      <p className={classes.join(" ") /**this joins the classes with space */}>
        This is really working!!
      </p>
      <button style={style} onClick={props.toggle}>
        Toggle Persons
      </button>
    </div>
  );
  //connect the methods and variables
};

//memo uses memorization: store snapshot of this component
//only re renders if input changes
//wrapping this will save time
export default React.memo(Radium(cockpit));
