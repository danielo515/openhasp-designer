import type { Component } from "solid-js";
import { Screen } from "./Screen";

const App: Component = () => {
  return (
    <div class="bg-gray-700 h-full w-full columns-2 text-white">
      <div class="w-full h-full p-4">
        <Screen height={300} width={400} />
      </div>
      <div class="w-full h-full border-l-2 border-cyan-700">
        <div class="h-1/2 p-4">top</div>
        <div class="h-1/2 p-4 border-cyan-700 border-t-2">bottom</div>
      </div>
    </div>
  );
};

export default App;
