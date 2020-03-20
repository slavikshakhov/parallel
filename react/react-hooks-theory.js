import React, { useState } from "react";
import "./App.css";

function El({ el, i, updateEl, removeEl }) {
            return (
                <div>
                    <div className="todo" style={{ textDecoration: el.isCompleted ? "line-through" : "" }}>
                            {el.text}
                    </div>
                    <button onClick={() => updateEl(i)}>Update</button>
                    <button onClick={() => removeEl(i)}>Remove</button>
                </div>
            );
}

function ElForm({ addEl }) {
            const [value, setValue] = useState("");

            const handleSubmit = e => {
                e.preventDefault();
                if (!value) return;
                addEl(value);
                setValue("");
            };

            return (
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                </form>
            );
}

function App() {
            const [arr, setArr] = useState([
                {text: "Learn about React", isCompleted: false},
                {text: "Meet friend for lunch", isCompleted: false},
                {text: "Build really cool todo app", isCompleted: false}
            ]);

            const addEl = text => {
                const newArr = [...arr, { text }];
                setArr(newArr);
            };

            const updateEl = i => {
                const newArr = [...arr];
                newArr[i].isCompleted = true;
                setArr(newArr);
            };

            const removeEl = i => {
                const newArr = [...arr];
                newArr.splice(i, 1);
                setArr(newArr);
            };

            return (
                <div>
                    {arr.map((el, i) => (
                        <El key={i} i={i} el={el} updateEl={updateEl} removeEl={removeEl} />
                    ))}
                    <ElForm addEl={addEl} />
                </div>
            );
}

export default App;

/* ******************** COMPONENT'S STATE W/O HOOKS VS WITH HOOKS

class Count extends React.Component {
  state = {
    count: 0
  };

  add = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.add}>Add</button>
      </div>
    );
  }
}
******************************************************

const Count = () => {
  // state variable, initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
};
***********************************************************
***********************************************************

*/