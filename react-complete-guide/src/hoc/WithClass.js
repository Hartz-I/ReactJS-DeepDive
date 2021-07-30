//it wraps another components: hence higher order

import React from "react";

const withClass = (props) => {
  return <div className={props.classes}>{props.children}</div>;
};

export default withClass;
