import { useContext } from "react";
import TodoListItem from "./TodoListItem";
import { TodoContext } from "../Context/TodoContext";

export default function BoxTodoList() {
  const { Todos } = useContext(TodoContext);
  return (
    <ul className="list-reset">
      {Todos.map((item, index) => (
        <TodoListItem key={index} Todo={item} />
      ))}
    </ul>
  );
}
