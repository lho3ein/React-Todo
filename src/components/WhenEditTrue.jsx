import { useContext, useState } from "react";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import axios from "axios";
import { toast } from "react-toastify";
import { TodoContext } from "../Context/TodoContext";

export default function WhenEditTrue({ Todo, setEditTime }) {
   let { Todos, setTodos } = useContext(TodoContext);

   const [valueInput, setValueInput] = useState(Todo.title);

   let editHandler = async (idPrmtr) => {
      let newTodos = Todos.map((item) => {
         if (item.id == idPrmtr) {
            item.title = valueInput;
         }
         return item;
      });
      let itemChanged = Todos.find((item) => item.id == idPrmtr);

      try {
         let res = await axios.put(`https://6624413d04457d4aaf9bf32a.mockapi.io/Posst/${idPrmtr}`, itemChanged);
         if (res.statusText == "OK") {
            setTodos(newTodos);
            toast.success("Todo Edited");
         }
      } catch (err) {
         toast.error(err.message);
      }
   };

   const onClickHandler = () => {
      editHandler(Todo.id);
      setEditTime(false);
   };

   const keyDownHandler = (e) => {
      if (e.key === "Enter" /*&& valueInput !== ""*/) {
         editHandler(Todo.id);
         setEditTime(false);
      }
   };

   return (
      <>
         <div className="flex items-center w-full">
            <input type="text" className="w-4/5 px-4 py-2 border border-gray-200 rounded" onKeyDown={keyDownHandler} value={valueInput} onChange={(e) => setValueInput(e.target.value)} />
         </div>
         <button type="button" className="relative right-0 ml-2 flex-column">
            <EditIcon onClick={onClickHandler} />
            <DeleteIcon onClick={() => setEditTime(false)} />
         </button>
      </>
   );
}
