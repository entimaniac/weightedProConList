import React, { useState, useEffect } from "react";

export default function Editable(props) {
  const [isEditing, setEditing] = useState(props.editing);

  useEffect(() => {
    if (props.childRef && props.childRef.current && isEditing === true) {
      props.childRef.current.focus();
    }
  }, [isEditing, props.childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

    /*
      - For textarea, check only Escape and Tab key and set the state to false
      - For everything else, all three keys will set the state to false
    */
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, props.type)}
        >
          {props.children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{props.text || props.placeholder}</span>
        </div>
      )}
    </section>
  );
}

// export default Editable;
