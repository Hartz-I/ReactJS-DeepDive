import React from "react";

import Radium from "radium";

import "./Cockpit.css";

const cockpit = (props) => {
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
  if (props.persons.length <= 2) {
    classes.unshift("red");
  }

  if (props.persons.length <= 1) {
    classes.push("bold");
  }

  return (
    <div>
      <h1>Hi, I'm a react app!</h1>
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

export default Radium(cockpit);
