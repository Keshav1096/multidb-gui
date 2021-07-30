import { Input } from "antd";
import { useState } from "react";
import { getDocumentsByQuery } from "../services/api";

const { Search } = Input;

export default function SearchBox() {
  const [input, setInput] = useState("");

  function onSearch(event) {
    console.log(event);
    getDocumentsByQuery(event).then((resp) => {
      console.log(resp);
    });
  }
  function handleOnChange(event) {
    setInput(event.target.value);
  }
  return (
    <Search
      placeholder={`{ "key": "value" }`}
      onChange={handleOnChange}
      onSearch={onSearch}
      enterButton
      value={input}
    />
  );
}
