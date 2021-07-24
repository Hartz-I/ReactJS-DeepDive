import React, { Component } from "react";
import "./App.css";
import Person from "../components/Persons/Person/Person"; //after reforming the parts

import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import Radium, { StyleRoot } from "radium"; //need styleroot of media and keyframes. wrap main div

//deep dive!!!
//let us reArrage the parts

class App extends Component {
  state = {
    persons: [
      { id: "123", name: "Max", age: 28 },
      { id: "456", name: "Manu", age: 29 },
      { id: "789", name: "Stephnie", age: 26 },
    ],
    showPersons: false,
  };

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

  render() {
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
