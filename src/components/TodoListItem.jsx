import { useContext, useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import WhenEditTrue from "./WhenEditTrue";
import axios from "axios";
import { toast } from "react-toastify";
import { TodoContext } from "../Context/TodoContext";

export default function TodoListItem({ Todo }) {
   let { user, Todos, setTodos } = useContext(TodoContext);
   const [EditTime, setEditTime] = useState(false);

   let newToggleDone = async (idPrmtr) => {
      let newTodos = Todos.map((item) => {
         if (item.id == idPrmtr) {
            item.status = !item.status;
         }
         return item;
      });
      // let itemChanged = Todos.find((item) => item.id == idPrmtr);
      try {
         let res = await axios.put(`https://6624413d04457d4aaf9bf32a.mockapi.io/Posst/${idPrmtr}`, /*itemChanged*/ { status: Todo.status });
         console.log(res);

         setTodos(newTodos);
      } catch (error) {
         console.log(error);
      }
   };

   let deletHandler = async (idPrmtr) => {
      try {
         let res = await axios.delete(`https://6624413d04457d4aaf9bf32a.mockapi.io/Posst/${idPrmtr}`);
         console.log(res);
         setTodos((prev) => prev.filter((item) => item.id !== /*idPrmtr*/ res.data.id));

         toast.success("Todo Deleted !");
      } catch (error) {
         toast.error(error.message);
      }
   };

   return (
      <li className="relative flex items-center justify-between px-2 py-6 border-b">
         {EditTime == false ? (
            <>
               <div>
                  <input type="checkbox" checked={Todo?.status} onChange={() => newToggleDone(Todo.id)} className="" />
                  <p className={`inline-block mt-1 ml-2 text-gray-600 ${Todo?.status ? "line-through" : ""}`}>{Todo?.title}</p>
               </div>
               <button type="button" className="absolute right-0 flex items-center space-x-1">
                  <EditIcon onClick={() => setEditTime(true)} />
                  <DeleteIcon onClick={() => deletHandler(Todo.id)} />
               </button>
            </>
         ) : (
            <WhenEditTrue Todo={Todo} setEditTime={setEditTime} />
         )}
      </li>
   );
}
