//converting into class based component for update life cycle hook

import React, { Component } from "react";
import "./Person.css";

//for higher order components hoc
import Aux from "../../../hoc/Auxiliary";
import withClass from "../../../hoc/withClass2";

//for style
import Radium from "radium";

//proptypes
import PropTypes from "prop-types";

// const style = {
//   "@media(min-width: 600px)": {
//     width: "500px",
//   }, //but to use media we need to wrap app.js with StyleRoot
// };

//remove function and add class named same with compnent extention
//add everything within render() {} method
//change all props to this.props
//change the export name

const styleClass = ["Person"];

class Person extends Component {
  //using constructor for ref. better way to do it
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  componentDidMount() {
    //focus on first input element it finds
    //document.querySelector("input").focus();

    //focus on last el
    //this.inputElement.focus();

    //focus using constructor ref
    this.inputElementRef.current.focus();
  }

  render() {
    console.log("[Person.js] person rendering..");

    //to use this without wrapping div. delete div, wrap them in 3rd brackets and put comma after every markup

    //or use higher order component Aux. it's not like wrapping div. now it is using multiple React.createElement calls

    //or use React.Fragment : exactly the same as Aux
    return (
      <Aux>
        <p onClick={this.props.click}>
          I'm <span className="changedText">{this.props.name}</span> and I am{" "}
          {this.props.age} years old
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          // ref={(inputEl) => {
          //   this.inputElement = inputEl;
          //   /**this is used to ref any part of jsx */
          // }}

          ref={this.inputElementRef /**better way */}
          className="textInput"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
}; //now if input is changed a error will occur in console

export default withClass(Radium(Person), styleClass.join(" "));
