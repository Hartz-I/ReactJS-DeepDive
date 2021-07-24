import React from "react";

import Person from "./Person/Person";
//now we don't need to worry about persons render logic or don't have to write it if needed more

const persons = (
  props //no first second or return needed as we are writting a line of JS
) =>
  props.persons.map((person, index) => {
    return (
      <Person
        name={person.name}
        age={person.age}
        key={person.id}
        click={() => props.clicked(index)} //pass the methods by props
        changed={(event) => props.changed(event, person.id)}
      />
    );
  }); //if used in one line

export default persons;
