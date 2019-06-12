import React from "react";

const Button = props => (
  <div id={props.keyId} data-key={props.keyData} onClick={props.onClick}>
    {props.keyText}
  </div>
);

export default Button;
