//use to avoid chains of props
//have to wrap all the related parts of the component
import React from "react";

const authContext = React.createContext({
  authenticated: false,
  login: () => {},
});

export default authContext;
