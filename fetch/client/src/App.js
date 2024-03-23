import React, { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState(null);

  const fetchData = () => {
    // 함수로 만들기
    fetch("http://localhost:4000/api/todo")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  };

  useEffect(() => {
    fetchData(); // 여기서 쓰기
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    const done = e.target.done.checked;

    fetch("http://localhost:4000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        done,
      }),
    }).then(() =>
      fetch("http://localhost:4000/api/todo")
        .then((response) => response.json())
        .then((data) => setTodoList(data))
    );
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="text"></input>
        <input name="done" type="checkbox"></input>
        <button type="submit" value="추가">
          추가
        </button>
      </form>

      {todoList === null ? (
        <div>Loading...</div>
      ) : (
        todoList.map((todo) => (
          <div key={todo.id}>
            <div>{todo.id}</div>
            <div>{todo.text}</div>
            <div>{todo.done ? "Y" : "N"}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
