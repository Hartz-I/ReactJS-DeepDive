import React from "react";
import "./Person.css";

//for style
import Radium from "radium";

const style = {
  "@media(min-width: 500px)": {
    width: "450px",
  }, //but to use media we need to wrap app.js with StyleRoot
};

const person = (props) => {
  return (
    <div className="Person" style={style}>
      <p onClick={props.click}>
        I'm {props.name} and I am {props.age} years old
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default Radium(person);
