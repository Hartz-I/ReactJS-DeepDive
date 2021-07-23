import React, { Component } from "react";
import "./App.css";
import Person from "../components/Persons/Person/Person"; //after reforming the parts

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

    //adding style dynamically
    if (this.state.showPersons) {
      //changing color if list if showing
      style.backgroundColor = "rgb(211, 31, 31)"; //could've put in the next if block. but just to show separately

      style[":hover"] = {
        //in quote cuz in object in quote
        backgroundColor: "salmon",
        color: "black",
      };
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                key={person.id}
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
    }

    //dynamically changing classes
    const classes = [];

    //putting the classes in array if conditions met
    if (this.state.persons.length <= 2) {
      classes.push("red");
    }

    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a react app!</h1>
          <p
            className={
              classes.join(" ") /**this joins the classes with space */
            }
          >
            This is really working!!
          </p>
          <button style={style} onClick={this.togglePersonsHandler}>
            Toggle Persons
          </button>

          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App); //wrap to add extra functionality to css in code
