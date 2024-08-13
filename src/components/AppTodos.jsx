import { useEffect, useState } from "react";
import BoxTodoList from "./BoxTodoList";
import InputAddTodo from "./InputAddTodo";
import axios from "axios";
import { TodoContext } from "../Context/TodoContext";

export default function AppTodos() {
   //--------------------------------------State
   const [Todos, setTodos] = useState([]);
   const user = { name: "Hossein", family: "Khalili" };
   //---------------------------------------------------Api
   const getDATA = async () => {
      try {
         let res = await axios.get("https://6624413d04457d4aaf9bf32a.mockapi.io/Posst");

         setTodos(res.data);
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      getDATA();
   }, []);

   // console.log(Todos);
   //-----------------------------------------------------
   return (
      <TodoContext.Provider value={{ user, Todos, setTodos }}>
         <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto bg-white shadow lg:w-1/3">
               <div className="flex items-center mb-6">
                  <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
               </div>
               <div className="relative">
                  <InputAddTodo />
               </div>
               <BoxTodoList />
            </div>
         </div>
      </TodoContext.Provider>
   );
}
