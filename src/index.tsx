import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import PropViewer from "./lib/PropViewer";

let prop = {
  test1: "test1",
  ob: {
    test2: "test2",
    test3: "test3"
  },
  arr: [1, 2, 3, "v2"]
};
ReactDOM.render(<PropViewer test={prop} />, document.getElementById("root"));
