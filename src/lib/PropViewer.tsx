import * as React from "react";
import "../index.css";

export class PropViewer extends React.Component<any> {
  render() {
    return (
      <div className="App">
        <header className="App-header">{this.renderValue(this.props)}</header>
      </div>
    );
  }

  renderValue = value => {
    // Order matters - arrays are also objects.
    return this.renderSimple(value) || this.renderArray(value) || this.renderObject(value);
  };

  renderArray = values => {
    if (!Array.isArray(values)) return false;

    let first = true;
    return values.map(value => {
      let out = (first ? "" : ", ") + this.renderValue(value);
      first = false;
      return out;
    });
  };

  renderSimple = value => {
    if (value === null) return "null";
    if (typeof value === "string" || typeof value === "number") return value;
  };

  renderObject = (ob: any) => {
    if (typeof ob !== "object") return null;

    let keys = Object.keys(ob);
    let rendered = keys.map(key => {
      let value = ob[key];
      return (
        <table key={key + '-table'}>
          <tbody>
            <tr>
              <td className="cell">{key}</td>
              <td className="cell">{this.renderValue(value)}</td>
            </tr>
          </tbody>
        </table>
      );
    });
    return rendered;
  };
}
