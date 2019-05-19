import * as React from "react";
import { TextareaHTMLAttributes } from "react";

export interface TextboxProps {
  name: string;
  placeholder?: string;
  valuesOnly?: boolean;
  initialValue?: string;
  values?: string[];
}

export interface TextboxState {
  value: string;
  placeholder: string;
}

export class Textbox extends React.Component<
  TextboxProps & TextareaHTMLAttributes<HTMLInputElement>,
  TextboxState
> {
  private static acId = 0;
  private instanceKey = Textbox.acId++;
  private box: HTMLInputElement;

  componentWillMount() {
    this.setState({
      value: this.props.initialValue || "",
      placeholder: this.props.placeholder || ""
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.initialValue || "",
      placeholder: props.placeholder || ""
    });
  }

  handleOnBlur = (newValue: string) => {
    let p = this.props;
    let values = p.values || [];
    let value;
    newValue = newValue.trim();
    let validValue = !newValue || !p.valuesOnly || values.includes(newValue);
    if (validValue) {
      value = newValue;
    } else {
      let nvu = newValue.toUpperCase();
      value = "";

      for (let i in values) {
        let v = values[i];
        let vu = v.toUpperCase();
        if (vu === nvu || vu.indexOf(nvu) !== -1) {
          value = v;
          validValue = true;
          break;
        }
      }
    }

    let newState = validValue
      ? { value, placeholder: this.props.placeholder || "" }
      : { value: "", placeholder: `${newValue} is not a valid value.` };
    this.setState(newState);

    return false;
  };

  getInput(htmlProps, listId) {
    return (
      <input
        key={"input" + listId}
        type="text"
        placeholder={this.state.placeholder}
        list={listId}
        onBlur={ev => this.handleOnBlur(ev.target.value)}
        value={this.state.value || ""}
        onChange={ev => {
          this.setState({ value: ev.target.value });
        }}
        onFocus={e => e.target.select()}
        {...htmlProps}
      />
    );
  }

  render() {
    let {
      name,
      placeholder,
      valuesOnly,
      initialValue,
      values,
      value,
      ...htmlProps
    } = this.props;
    let listId = "listId-" + this.instanceKey;

    values = values || [];
    let keyId = 0;
    placeholder = placeholder || "";
    // console.log(values);
    let datalist = values.length ? (
      <datalist id={listId} key={"datalist" + listId}>
        {values.map(value => (
          <option key={`${listId}-${keyId++}`} value={value} />
        ))}
      </datalist>
    ) : null;

    let input = this.getInput(htmlProps, listId);
    return [input, datalist];
  }
}
