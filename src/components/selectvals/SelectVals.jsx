import React from "react";

export default function SelectVals({ vals, change, val }) {
  return (
    <select value={val} onChange={change}>
      {vals.map((item) => {
        return (
          <option key={item.id} value={item.lang}>
            {item.idioma}
          </option>
        );
      })}
    </select>
  );
}
