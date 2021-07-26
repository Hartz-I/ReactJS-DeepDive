import React, { Component } from "react";
import "./App.css";
//import Person from "../components/Persons/Person/Person"; //after reforming the parts

import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import Radium, { StyleRoot } from "radium"; //need styleroot of media and keyframes. wrap main div

//deep dive!!!
//let us reArrage the parts

//lifecyclehooks. run to see which comes after which

class App extends Component {
  //with lifecyclehooks
  constructor(props) {
    super(props); //used to setup correctly. must do if custom constructor

    console.log("[App.js] constructor");

    // this.state = {
    //   //state can be done in constructor
    //   persons: [
    //     { id: "123", name: "Max", age: 28 },
    //     { id: "456", name: "Manu", age: 29 },
    //     { id: "789", name: "Stephnie", age: 26 },
    //   ],
    //   showPersons: false,
    // };
  }

  state = {
    persons: [
      { id: "123", name: "Max", age: 28 },
      { id: "456", name: "Manu", age: 29 },
      { id: "789", name: "Stephnie", age: 26 },
    ],
    showPersons: false,
  };

  //lch
  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  //lch: not used
  // componentWillMount() {
  //   console.log("[App.js] componentWillMount");
  // }

  //lch: after render it will run
  componentDidMount() {
    console.log("[App.js] componentDidMount ");
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: "Manu", age: 29 },
        { name: "Stephnie", age: 27 },
      ],
    });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState({
      persons: persons,
    });
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);

    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow,
    });
  };

  //lch
  render() {
    console.log("[App.js] render");
    //adding style dynamically

    let persons = null;

    if (this.state.showPersons) {
      //all the mapping are in the Persons component
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <StyleRoot>
        <div className="App">
          <Cockpit
            title={this.props.appTitle}
            persons={this.state.persons}
            showPersons={this.state.showPersons}
            toggle={this.togglePersonsHandler}
          />
          {persons}
        </div>
      </StyleRoot>
    );
    //connect the state and methods with component
    //in case of method the variable input should be in the component itself not in ref
  }
}

export default Radium(App); //wrap to add extra functionality to css in code
