import { ToastContainer } from "react-toastify";
import AppTodos from "./components/AppTodos";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-gray-100">
      <AppTodos />
      <ToastContainer />
    </div>
  );
}

export default App;

// <div className="flex items-center justify-center h-screen">
//   <div className="space-y-2">

//   </div>
// </div>
