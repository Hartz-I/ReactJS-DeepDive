import React, { Component } from "react";
import "./App.css";
//import Person from "../components/Persons/Person/Person"; //after reforming the parts

import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import Radium, { StyleRoot } from "radium"; //need styleroot of media and keyframes. wrap main div

//setting state correctly here on app.js
//setting PropTypes on Person.js

//importing hoc: as a component
import WithClass from "../hoc/WithClass";

//context
import AuthContext from "../context/auth-context";

//more on this on the peroson component
//2nd way of using hoc: as a functio
//import withclass2 from "../hoc/withClass2";
//need to wrap in Aux first
//import Aux from "../hoc/Auxiliary";

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
    changeCounter: 0,
    isAuth: false,
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

    //when depending on the previous state we should use the functional form
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
        //this is a better way if dependent on previous state
      };
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

  //handling login
  //context is a way to avoid chains
  loginHandler = () => {
    this.setState({
      isAuth: true,
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
          //isAuthenticated={this.state.isAuth} not needed cuz of context
        />
      );
    }

    let cockpit = null;

    if (this.state.showCockpit) {
      cockpit = (
        <Cockpit
          title={this.props.appTitle}
          personsLength={this.state.persons.length}
          showPersons={this.state.showPersons}
          toggle={this.togglePersonsHandler}
          //authenticate={this.loginHandler} not needed cuz of context
        />
      );
    }

    return (
      //withclass higer order component instead of div passes the property classes as class
      <StyleRoot>
        <WithClass classes="App">
          <button onClick={this.toggleCockpitHandler}>Remove Cockpit</button>
          <AuthContext.Provider
            value={{
              authenticated: this.state.isAuth,
              login: this.loginHandler,
            }}
          >
            {cockpit}
            {persons}
          </AuthContext.Provider>
        </WithClass>
      </StyleRoot>
    );
    //connect the state and methods with component
    //in case of method the variable input should be in the component itself not in ref
  }
}

export default Radium(App); //wrap to add extra functionality to css in code
//to use withClass2 function we need to remove Withclass component and wrap it with Aux and then
//export default withClass2(Radium(App), 'App')
