import React from "react";
import classNames from "classnames";

import "./Loader.css";

function Loader({ className, ...props }) {
  return (
    <div className={classNames(
        'lds-roller',
        className
      )} {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
