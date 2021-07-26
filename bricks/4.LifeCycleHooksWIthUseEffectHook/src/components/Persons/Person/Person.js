//converting into class based component for update life cycle hook

import React, { Component } from "react";
import "./Person.css";

//for style
import Radium from "radium";

const style = {
  "@media(min-width: 600px)": {
    width: "500px",
  }, //but to use media we need to wrap app.js with StyleRoot
};

//remove function and add class named same with compnent extention
//add everything within render() {} method
//change all props to this.props
//change the export name
class Person extends Component {
  render() {
    console.log("[Person.js] person rendering..");

    return (
      <div className="Person" style={style}>
        <p onClick={this.props.click}>
          I'm <span className="changedText">{this.props.name}</span> and I am{" "}
          {this.props.age} years old
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          className="textInput"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </div>
    );
  }
}

export default Radium(Person);
