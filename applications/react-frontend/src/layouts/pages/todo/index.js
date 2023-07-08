import MKBadge from "components/MKBadge";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

function todo() {
  const [todos, setTodo] = useState([]),
    [inputValue, setInputValue] = useState(""),
    [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}api/v1/get-all-todos`)
      .then((response) => {
        console.log({
          url: baseUrl,
        });
        console.log(response);
        return response.json();
      })
      .then((data) => setTodo(data));
  }, [refresh]);

  const addTodo = () => {
    console.log("Adding todo ");
    fetch(`${baseUrl}api/v1/add-todo`, {
      method: "POST",
      body: JSON.stringify({ todo: inputValue }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setRefresh(!refresh);
      setInputValue("");
    });
  };

  const deleteTodo = (id) => {
    console.log("Deleting todo ");
    fetch(`${baseUrl}api/v1/delete-todo/${id}`, {
      method: "DELETE",
    }).then(() => {
      setRefresh(!refresh);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <MKTypography variant="h1">Todo</MKTypography>
        <MKInput
          label="Type here..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <MKButton
          variant="gradient"
          size="large"
          color="primary"
          onClick={() => {
            console.log("in click");
            addTodo();
          }}
        >
          Add Todo
        </MKButton>
      </div>

      <br />
      <MKTypography variant="h3">Following are the todos</MKTypography>
      {todos.map((todo, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          <MKTypography variant="h4">{todo.todo}</MKTypography>
          <MKButton onClick={() => deleteTodo(todo.id)}>
            <MKBadge badgeContent="X" container color="error" />
          </MKButton>
        </div>
      ))}
    </div>
  );
}

export default todo;
