import React from "react";
import "./App.css";
import ProConList from "./ProConList";
import { FaPlus } from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      listNameInput: "test",
      index: 0,
    };
  }

  addList = () => {
    let lists = this.state.lists;

    lists.push({ id: this.state.index });
    this.setState({ listNameInput: "" });
    this.setState({ lists: lists });
    this.setState({ index: this.state.index + 1 });
  };

  removeList = (id) => {
    this.setState({
      lists: this.state.lists.filter(function (list) {
        return list.id !== id;
      }),
    });
  };

  handleListNameInputChange = (event) => {
    this.setState({ listNameInput: event.target.value });
  };

  render() {
    return (
      <div className="the-page">
        <h1>WEIGHTED PRO VS. CON LIST!</h1>
        <h4>
          Ever want to decide if something is worth it? So you make a pro-con
          list only and tally up the pros and the cons and find that you have 10
          pros against only 5 cons but then you throw it all out because you
          realize how can you say that yea, maybe the job you are thinking of
          taking is 5 minutes closer (+1 pro) but it pays $40,000 dollars less(
          -1 con). You need an easy way to show that the money is 80x more
          important than the shorter commute!
        </h4>
        <div className="scrolling-wrapper">
          {this.state.lists.map((item) => {
            return (
              <div className="scroll-item" key={item.id}>
                <ProConList
                  className="scroll-item"
                  id={item.id}
                  name={item.name}
                  remove={this.removeList}
                />
              </div>
            );
          })}
          <button className="add-list-button" onClick={this.addList}>
            <FaPlus />
          </button>
        </div>
      </div>
    );
  }
}

export default App;
