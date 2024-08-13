import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
// import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../Context/TodoContext";

export default function InputAddTodo() {
   let { setTodos } = useContext(TodoContext);

   const [ValueInputAdd, setValueInputAdd] = useState("");

   let addTodo = async () => {
      let data = { /*id: uuidv4(),*/ title: ValueInputAdd, status: false }; //به شکل اتوماتیک آیدی میده

      try {
         let res = await axios.post("https://6624413d04457d4aaf9bf32a.mockapi.io/Posst", data);
         setTodos((prev) => [...prev, res.data]);
         // console.log(res);

         setValueInputAdd("");
         toast.success("Todo Created");
      } catch (error) {
         toast.error(error.message);
      }
   };

   const keySubmitHandler = (e) => {
      if (e.key === "Enter" && ValueInputAdd !== "") {
         addTodo();
      }
   };
   return (
      <input
         type="text"
         placeholder="What needs to be done today?"
         className="w-full px-2 py-3 border rounded outline-none border-grey-600"
         value={ValueInputAdd}
         onChange={(e) => setValueInputAdd(e.target.value)}
         onKeyDown={keySubmitHandler}
      />
   );
}
