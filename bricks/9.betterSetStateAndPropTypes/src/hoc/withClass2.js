import React from "react";

const withClass2 = (WrapperComponent, className, style) => {
  return (props) => (
    <div className={className} style={style}>
      <WrapperComponent {...props} />
    </div>
  );
};
// {...props} add all the property of the wraped component

export default withClass2;
