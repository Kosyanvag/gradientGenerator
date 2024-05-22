import { useState } from "react";
import "./App.scss";
import Generator from "./Components/Generator/Generator";
import Code from "./Components/Code/Code";

function App() {
  const [gradient, setGradient] = useState(
    "linear-gradient(90deg, #ff0000 0%, #0000ff 100%)"
  );

  const handleGradientChange = (newGradient) => {
    setGradient(newGradient);
  };

  return (
    <>
      <div className="result" style={{ background: gradient }}></div>
      <Generator onGradientChange={handleGradientChange} />
      <Code gradient={gradient} />
    </>
  );
}

export default App;
