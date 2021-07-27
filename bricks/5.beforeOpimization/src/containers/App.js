import React, { Component } from "react";
import "./App.css";
//import Person from "../components/Persons/Person/Person"; //after reforming the parts

import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import Radium, { StyleRoot } from "radium"; //need styleroot of media and keyframes. wrap main div

//deep dive!!!
//let us reArrage the parts

//lifecyclehooks. run to see which comes after which

//UPDATE LIFE CYCLE HOOKS ARE IN PERSONS COMPONENT

class App extends Component {
  //with lifecyclehooks: creation

  //lch: creation
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
    showCockpit: true,
  };

  //lch: creation
  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  //lch: creation: not used
  // componentWillMount() {
  //   console.log("[App.js] componentWillMount");
  // }

  //lch:: creation: after render it will run
  componentDidMount() {
    console.log("[App.js] componentDidMount ");
  }

  //lch: for internal changes (and update)
  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] should component update");

    return true; //has to return otherwise fail
    //if false then any update wont happen and persons will not render
  }

  //lch: for internal changes (and update)
  componentDidUpdate() {
    //most important. fetch new data from server when updated
    console.log("[App.js] component did update");
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

  toggleCockpitHandler = () => {
    const doesShow = this.state.showCockpit;
    this.setState({
      showCockpit: !doesShow,
    });
  };

  //lch: creation
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

    let cockpit = null;

    if (this.state.showCockpit) {
      cockpit = (
        <Cockpit
          title={this.props.appTitle}
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          toggle={this.togglePersonsHandler}
        />
      );
    }

    return (
      <StyleRoot>
        <div className="App">
          <button onClick={this.toggleCockpitHandler}>Remove Cockpit</button>
          {cockpit}
          {persons}
        </div>
      </StyleRoot>
    );
    //connect the state and methods with component
    //in case of method the variable input should be in the component itself not in ref
  }
}

export default Radium(App); //wrap to add extra functionality to css in code
