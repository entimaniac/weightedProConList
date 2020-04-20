import React from "react";
import "./ProConItem.css";
import { FaTrashAlt } from "react-icons/fa";
import Editable from "./Editable";

export default function ProConItem(props) {
  const messageRef = React.useRef();
  const scoreRef = React.useRef();

  return (
    <div className={`${props.proConType} pro-con-item grid-container`}>
      <span>
        <Editable
          text={props.message}
          type="input"
          childRef={messageRef}
          placeholder="Enter text"
          editing={true}
        >
          <input
            className="text-input"
            ref={messageRef}
            type="text"
            name="task"
            value={props.message}
            onChange={(e) => props.editMessage(e, props.id, props.proConType)}
          />
        </Editable>
      </span>
      <span className={"score"}>
        <Editable text={props.score} type="input" childRef={scoreRef}>
          <input
            className="score-input"
            ref={scoreRef}
            type="number"
            min={0}
            name="task"
            value={props.score}
            onChange={(e) => props.editScore(e, props.id, props.proConType)}
          />
        </Editable>
      </span>
      <span>
        <button
          className={"remove-button"}
          onClick={() => props.remove(props.id, props.score)}
        >
          <FaTrashAlt />
        </button>
      </span>
    </div>
  );
}
