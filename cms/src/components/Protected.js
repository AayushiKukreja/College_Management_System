import React from "react";
import { useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";

function Protected({ authUser, children }) {
  let navigate = useNavigate();
  if (!authUser) {
    return (
      <h1>
        <center>ERROR!!!!Please Login First</center>
      </h1>
    );
  } else {
    return children;
  }
}

export default Protected;
