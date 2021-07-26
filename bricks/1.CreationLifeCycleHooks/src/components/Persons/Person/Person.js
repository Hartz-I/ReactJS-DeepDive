import React from "react";
import "./Person.css";

//for style
import Radium from "radium";

const style = {
  "@media(min-width: 600px)": {
    width: "500px",
  }, //but to use media we need to wrap app.js with StyleRoot
};

const person = (props) => {
  console.log("[Person.js] person rendering..");
  return (
    <div className="Person" style={style}>
      <p onClick={props.click}>
        I'm <span className="changedText">{props.name}</span> and I am{" "}
        {props.age} years old
      </p>
      <p>{props.children}</p>
      <input
        type="text"
        className="textInput"
        onChange={props.changed}
        value={props.name}
      />
    </div>
  );
};

export default Radium(person);
