import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { Textbox } from "./lib/Textbox";

ReactDOM.render(<Textbox name='test' initialValue='pear' values={[
  "apple",
  "some other value",
  "banana"
]} onBlur={e => console.log(e.target.value)}/>, document.getElementById("root"));
