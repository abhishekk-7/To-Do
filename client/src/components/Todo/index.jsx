import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import endpoints from "../endpoints";
import LoggedInChecker from "../LoggedInChecker";
import "./index.css";
//
const Todo = ({ loggedIn, setLoggedIn }) => {
  const history = useHistory();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get(endpoints.todo, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        setTodos(response.data);
      })
      .catch(function (error) {});
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        endpoints.todo,
        {
          task,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then(function (response) {
        setTodos([...todos, response.data]);
        console.log(response.data);
        setTask("");
      })
      .catch(function (error) {});
  };
  //
  const deleteTodo = (id) => {
    axios
      .delete(
        endpoints.todo + `${id}/`,

        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then(function (response) {
        setTodos(todos.filter((todo) => todo.id !== id));
        console.log(response.data);
        setTask("");
      })
      .catch(function (error) {});
  };
  return (
    <div className="container">
      <LoggedInChecker setLoggedIn={setLoggedIn} />
      <div className="row addtodo">
        <div className="col-4 offset-md-4">
          <form onSubmit={submitForm}>
            <input
              type="text"
              className="form-control"
              id="todoinput"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </form>
          {todos.map((todo) => (
            <TodoItem {...todo} deleteTodo={deleteTodo} key={todo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
const TodoItem = ({ id, task, done, deleteTodo }) => {
  const [checked, setChecked] = useState(done);
  const handleCheck = (id) => {
    axios
      .put(
        endpoints.todo + `${id}/`,
        {
          task,
          done: !checked,
        },

        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then(function (response) {})
      .catch(function (error) {});
    setChecked(!checked);
  };
  return (
    <div className={checked ? "card my-2 p-2 checked" : "card my-2 p-2"}>
      <div className="d-flex align-items-center">
        <div style={{ width: "80%" }}>
          <input
            className="form-check-input mx-2"
            type="checkbox"
            checked={checked}
            id={`${id}`}
            onChange={() => handleCheck(id)}
          />
          <label className="form-check-label " htmlFor={`${id}`}>
            {task}
          </label>
        </div>
        <div style={{ width: "20%" }}>
          <button
            type="button"
            className="btn btn-danger float-end"
            onClick={() => deleteTodo(id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Todo;
