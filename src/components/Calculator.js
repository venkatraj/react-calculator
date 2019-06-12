import React from "react";
import Button from "./Button";
import * as math from "mathjs";

class Calculator extends React.Component {
  buttons = [
    {
      keyId: "clear",
      keyText: "AC",
      keyData: "clear"
    },
    {
      keyId: "divide",
      keyText: "/",
      keyData: "/"
    },
    {
      keyId: "multiply",
      keyText: "X",
      keyData: "*"
    },
    {
      keyId: "seven",
      keyText: "7",
      keyData: "7"
    },
    {
      keyId: "eight",
      keyText: "8",
      keyData: "8"
    },
    {
      keyId: "nine",
      keyText: "9",
      keyData: "9"
    },
    {
      keyId: "subtract",
      keyText: "-",
      keyData: "-"
    },
    {
      keyId: "four",
      keyText: "4",
      keyData: "4"
    },
    {
      keyId: "five",
      keyText: "5",
      keyData: "5"
    },
    {
      keyId: "six",
      keyText: "6",
      keyData: "6"
    },
    {
      keyId: "add",
      keyText: "+",
      keyData: "+"
    },
    {
      keyId: "one",
      keyText: "1",
      keyData: "1"
    },
    {
      keyId: "two",
      keyText: "2",
      keyData: "2"
    },
    {
      keyId: "three",
      keyText: "3",
      keyData: "3"
    },
    {
      keyId: "equals",
      keyText: "=",
      keyData: "="
    },
    {
      keyId: "zero",
      keyText: "0",
      keyData: "0"
    },
    {
      keyId: "decimal",
      keyText: ".",
      keyData: "."
    }
  ];
  actions = ["+", "-", "/", "*", "="];
  state = {
    inputs: []
  };

  validate = input => {
    const lastInput = this.state.inputs[this.state.inputs.length - 1]
      ? this.state.inputs[this.state.inputs.length - 1]
      : 0;
    if (!this.isValidZero(lastInput, input)) return false;
    if (!this.isValidDecimal(input)) return false;
    this.storeOrCalculate(input);
    return true;
  };

  isValidZero = (lastInput, input) => {
    if (this.state.inputs.length == 0 && lastInput == 0 && input == 0) {
      return false;
    }
    return true;
  };

  isValidDecimal = input => {
    const lastNumber = this.getLastNumber();
    if (lastNumber.indexOf(".") != -1 && input == ".") {
      return false;
    }
    return true;
  };

  storeOrCalculate = input => {
    if (input === "=") {
      const total = this.state.inputs.toString().replace(/,/g, "");
      this.setState(prevState => {
        if (prevState.inputs.indexOf(input) === -1) {
          return { inputs: [...prevState.inputs, "=", math.eval(total)] };
        } else {
          return { inputs: prevState.inputs };
        }
      });
    } else {
      if (this.actions.indexOf(input) != -1) {
        this.setState(prevState => {
          if (prevState.inputs.indexOf("=") !== -1) {
            return {
              inputs: [this.getLastNumber(), input]
            };
          } else {
            const prevInput = prevState.inputs[prevState.inputs.length - 1];

            if (this.actions.indexOf(prevInput) != -1) {
              prevState.inputs[prevState.inputs.length - 1] = input;
              return {
                inputs: [...prevState.inputs]
              };
            } else {
              return {
                inputs: [...prevState.inputs, input]
              };
            }
          }
        });
      } else {
        this.setState(prevState => ({ inputs: [...prevState.inputs, input] }));
      }
    }
  };

  toDisplay = () => {
    if (this.state.inputs.length === 0) {
      return 0;
    } else {
      return this.getLastNumber();
    }
  };

  getLastNumber = () => {
    const inputsCopy = [...this.state.inputs];
    inputsCopy.reverse();
    let lastAction;
    this.actions.forEach(action => {
      let actionIndex = inputsCopy.indexOf(action);
      if (actionIndex !== -1 && typeof lastAction === "undefined") {
        lastAction = actionIndex;
      } else if (actionIndex !== -1 && actionIndex < lastAction) {
        lastAction = actionIndex;
      }
    });
    if (lastAction !== -1 && lastAction !== 0) {
      const lastNumber = inputsCopy.slice(0, lastAction);
      lastNumber.reverse();
      return [...lastNumber];
    } else {
      return this.state.inputs[this.state.inputs.length - 1];
    }
  };

  onClick = e => {
    e.preventDefault();
    const input = e.target.dataset.key;
    if (input === "clear") {
      this.setState(() => ({ inputs: [] }));
      return;
    }

    if (!this.validate(input)) return;
  };

  render() {
    const display = this.toDisplay();
    return (
      <div id="calculator">
        <div id="inputs">{[...this.state.inputs]}</div>
        <div id="display">{display}</div>
        <div id="buttons">
          {this.buttons.map((btn, index) => {
            return <Button key={index} {...btn} onClick={this.onClick} />;
          })}
        </div>
      </div>
    );
  }
}

export default Calculator;
