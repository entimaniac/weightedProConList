import React from "react";
import ProConItem from "./ProConItem";
import "./ProConList.css";
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Editable from "./Editable";

export default class ProConList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "New List",
      pros: [],
      cons: [],
      defaultMessage: "",
      defaultScore: 1,
      index: 0,
      total: 0,
    };
  }

  messageRef = React.createRef();

  addItem = (listName) => {
    let deepCopy = JSON.parse(JSON.stringify(this.state[listName]));

    deepCopy.push({
      message: this.state.defaultMessage,
      score: this.state.defaultScore,
      id: this.state.index,
    });

    this.setState({ [listName]: deepCopy });
    this.setState({ index: this.state.index + 1 }, () => this.calculateScore());
  };

  removeItem = (listName, id, score) => {
    let deepCopy = JSON.parse(JSON.stringify(this.state[listName]));
    let filteredList = deepCopy.filter(function (item) {
      return item.id !== id;
    });
    this.setState({ [listName]: filteredList }, () => this.calculateScore());
  };

  addPro = () => {
    this.addItem("pros");
  };

  removePro = (id, score) => {
    this.removeItem("pros", id, score);
  };

  addCon = () => {
    this.addItem("cons");
  };

  removeCon = (id, score) => {
    this.removeItem("cons", id, score);
  };

  editItem = (listName, id, key, value) => {
    let deepCopy = JSON.parse(JSON.stringify(this.state[listName]));

    deepCopy.find((item, i) => {
      if (item.id === id) {
        deepCopy[i][key] = value;
        return true;
      }
      return false;
    });
    this.setState({ [listName]: deepCopy }, () => this.calculateScore());
  };

  editMessage = (event, id, proConType) => {
    let listName = proConType + "s";
    this.editItem(listName, id, "message", event.target.value);
  };

  editScore = (event, id, proConType) => {
    let score = event.target.value;
    let listName;
    if (proConType === "pro") {
      listName = "pros";
    } else {
      listName = "cons";
    }
    this.editItem(listName, id, "score", score);
  };

  calculateScore = () => {
    let prosScore = 0;
    let consScore = 0;
    for (let pro of this.state.pros) {
      prosScore += parseInt(pro.score) || 0;
    }
    for (let con of this.state.cons) {
      consScore += parseInt(con.score) || 0;
    }
    this.setState({ total: prosScore - consScore });
  };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div className="list-container">
        <div className="title">
          <h3>
            <Editable
              text={this.state.name}
              type="input"
              childRef={this.messageRef}
              placeholder="Enter text"
              editing={false}
            >
              <input
                className="text-input"
                ref={this.messageRef}
                type="text"
                name="task"
                value={this.state.name}
                onChange={(e) => this.handleChangeName(e)}
              />
            </Editable>
          </h3>
        </div>
        <div>
          TOTAL: {this.state.total}
          <button
            className="remove-list-button"
            onClick={() => this.props.remove(this.props.id)}
          >
            <FaTrashAlt />
          </button>
        </div>

        <div className="list">
          <div>PROS</div>
          {this.state.pros.map((item) => {
            return (
              <div key={item.id}>
                <ProConItem
                  id={item.id}
                  message={item.message}
                  score={item.score}
                  proConType={"pro"}
                  editMessage={this.editMessage}
                  editScore={this.editScore}
                  remove={this.removePro}
                />
              </div>
            );
          })}
          <button className="add-list-item-button" onClick={this.addPro}>
            <FaPlus />
          </button>
        </div>
        <div className="list">
          <div>CONS</div>
          {this.state.cons.map((item, index) => {
            return (
              <ProConItem
                key={item.id}
                id={item.id}
                message={item.message}
                score={item.score}
                proConType={"con"}
                editMessage={this.editMessage}
                editScore={this.editScore}
                remove={this.removeCon}
              />
            );
          })}
          <button className="add-list-item-button" onClick={this.addCon}>
            <FaPlus />
          </button>
        </div>
      </div>
    );
  }
}
