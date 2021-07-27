//changing into class based for update life cycle hook
import React, { Component } from "react";
import Person from "./Person/Person";

//details of changing are in person component

class Persons extends Component {
  //1lch: update
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Persons.js] getDerivedStateFromProps");
  //   return state;
  // } //need initial state therefore commented

  //oldLch: will not work
  // componentWillReceiveProps(props) {
  //   console.log("[Persons.js] comonentWillReceiveProps");
  // }

  //oldLch: will not work
  // componentWillUpdate() {

  // }

  //2lch: update
  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Persons.js] shouldComponentUpdate");

    //persons is reference type. changes main property. but this works cuz in nameChangeHandler we make a copy of it using spread and compare the copy
    if (nextProps.persons !== this.props.persons) {
      //if persons prop doesn't change no need to rerender!
      //SUPER IMPORTANT SAVES A LOT OF TIME
      return true;
    } else {
      return false;
    } //true if want to change false if not.
    //it'll run the next change through some condion and allow it to happen if the condition is met
  }

  //4lch: update
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return { messege: "Snapshot" }; //has to put something in return
  }

  //5lch: update
  componentDidUpdate(prevProps, prevState, Snapshot) {
    //most important. fetch new data from server when updated
    //Snapshot takes what in getSnapshotBeforeUpdate returns and stores in variable
    console.log("[Persons.js] componentDidUpdate");

    console.log(Snapshot);
  }

  //cleanup work
  componentWillUnmount() {
    //any code right before removal of the component (toggling)
    console.log("[Persons.js] componentWillUnmount");
  }

  //3lch: update
  render() {
    console.log("[Persons.js] rendering..");
    return this.props.persons.map((person, index) => {
      //useing this.props to call children
      return (
        <Person
          name={person.name}
          age={person.age}
          key={person.id}
          click={() => this.props.clicked(index)} //pass the methods by this.props
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
