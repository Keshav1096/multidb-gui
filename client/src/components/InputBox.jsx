import { Input } from "antd";
import { useState } from "react";

export const InputBox = () => {
  const [value, setValue] = useState("");
  function handleOnChange(e) {
    console.log(e);
  }
  return (
    <Input placeholder="Basic usage" onChange={handleOnChange} value={value} />
  );
};
