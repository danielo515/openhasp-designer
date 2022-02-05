import type { Component } from "solid-js";
import { Button } from "./Button";
import { ButtonsBottom } from "./ButtonsBottom";
import { Screen } from "./Screen";

const App: Component = () => {
  return (
    <div class="main-wrapper">
      <main class="w-full h-full p-4">
        <Screen height={300} width={400} />
        <ButtonsBottom>
          <Button label="Import" />
          <Button label="Export" />
        </ButtonsBottom>
      </main>
      <div class="w-full h-full border-l-2 border-cyan-700">
        <div class="h-1/2 p-4">top</div>
        <div class="h-1/2 p-4 border-cyan-700 border-t-2 bg-gray-600">
          bottom
        </div>
      </div>
    </div>
  );
};

export default App;
