
import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed bottom-10 left-0 right-0 flex justify-center gap-3">
        <button
          onClick={() => setColor("red")}
          className="bg-red-500 px-4 py-2 rounded-full text-white"
        >
          Red
        </button>

        <button
          onClick={() => setColor("blue")}
          className="bg-blue-500 px-4 py-2 rounded-full text-white"
        >
          Blue
        </button>

        <button
          onClick={() => setColor("green")}
          className="bg-green-500 px-4 py-2 rounded-full text-white"
        >
          Green
        </button>
      </div>
    </div>
  );
}

export default App;
