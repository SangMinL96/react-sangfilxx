import React, { useState } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (ev) => {
    setValue(ev.target.value);
  };
  return { value, onChange };
}
export default useInput;
