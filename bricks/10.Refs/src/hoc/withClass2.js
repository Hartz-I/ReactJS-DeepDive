import React from "react";

const withClass2 = (WrapperComponent, className) => {
  return (props) => (
    <div className={className}>
      <WrapperComponent {...props} />
    </div>
  );
};
// {...props} add all the property of the wraped component

export default withClass2;
