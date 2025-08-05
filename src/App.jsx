import {useState}from "react";

 function App() {
  const [color,setColor] = useState("green");
  return (
    <div className= "w-full h-screen  "
    style = {{backgroundColor : color}}>
      <div class = " flex flex-wrap justify-center bg-white shadow-2xl gap-3 px-2 py-2 " >
       <button onClick={() => setColor("red")} 
       className = "bg-red-600 text-white font-bold py-2 px-8 rounded-full " >
            Red
       </button>
       <button onClick={() => setColor("Green")} className = "bg-green-600 text-white font-bold py-2 px-8 rounded-full " >
            Green
       </button>
       <button onClick={() => setColor("Blue")} className = "bg-blue-600 text-white font-bold py-2 px-8 rounded-full " >
            Blue
       </button>
      </div>
  </div>
   
  );
}
export default App;

//<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
//   Button
// </button>