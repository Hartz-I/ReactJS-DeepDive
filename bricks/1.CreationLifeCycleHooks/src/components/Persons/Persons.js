import React from "react";

import Person from "./Person/Person";
//now we don't need to worry about persons render logic or don't have to write it if needed more

const persons = (props) => {
  //no first second or return needed as we are writting a line of JS
  console.log("[Persons.js] rendering..");
  return props.persons.map((person, index) => {
    //now we need return cuz adding second work
    return (
      <Person
        name={person.name}
        age={person.age}
        key={person.id}
        click={() => props.clicked(index)} //pass the methods by props
        changed={(event) => props.changed(event, person.id)}
      />
    );
  });
}; //if used in one line

export default persons;
