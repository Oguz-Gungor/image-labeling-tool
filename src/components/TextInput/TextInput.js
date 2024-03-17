import { Button, Input } from "antd";
import { useState } from "react";
import "./TextInput.scss";

export default function TextInput({ onClick, buttonText }) {
  const [text, setText] = useState("");

  return (
    <div className="text-input-container">
      <Input
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <Button
        className="add-button"
        disabled={text === "" || text === undefined}
        onClick={() => {
          onClick(text);
          setText("");
        }}
      >
        {buttonText ?? "Add"}
      </Button>
    </div>
  );
}
