import { useState } from "react";
import "./Generator.style.scss";
import { FaTrashCan } from "react-icons/fa6";
const Generator = ({ onGradientChange }) => {
  const [type, setType] = useState("linear");
  const [degree, setDegree] = useState(90);
  const [colors, setColors] = useState([
    { value: "#ff0000", position: 0 },
    { value: "#0000ff", position: 100 },
  ]);
  const handleColorChange = (index, field, value) => {
    const newColors = [...colors];
    if (field === "position") {
      value = Math.max(0, Math.min(100, value));
      if (index > 0 && value < newColors[index - 1].position) {
        value = newColors[index - 1].position;
      }
      if (
        index < newColors.length - 1 &&
        value > newColors[index + 1].position
      ) {
        value = newColors[index + 1].position;
      }
    }
    newColors[index][field] = value;
    setColors(newColors);
    onGradientChange(gradientString(newColors));
  };

  const addColor = () => {
    const lastPosition = colors[colors.length - 1].position;
    const newColors = [...colors, { value: "#000000", position: lastPosition }];
    setColors(newColors);
    onGradientChange(gradientString(newColors));
  };

  const removeColor = (index) => {
    if (colors.length > 2) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
      onGradientChange(gradientString(newColors));
    } else {
      alert("Gradient must be have minimum 2 colors");
    }
  };

  const gradientString = (colorArray) => {
    const colorString = colorArray
      .map((c) => `${c.value} ${c.position}%`)
      .join(", ");
    return type === "linear"
      ? `linear-gradient(${degree}deg, ${colorString})`
      : `radial-gradient(${colorString})`;
  };

  return (
    <div className="gradient-generator">
      <h1>Gradient Generator</h1>
      <div className="controls">
        <div className="control">
          <label>Choose Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>
        {type === "linear" && (
          <div className="control">
            <label>Degree: </label>
            <input
              type="number"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
        )}
        <div className="colors">
          {colors.map((color, index) => (
            <div key={index} className="color-control">
              <div
                className="color"
                style={{ backgroundColor: color.value }}
              ></div>
              <input
                type="text"
                value={color.value}
                onChange={(e) =>
                  handleColorChange(index, "value", e.target.value)
                }
                placeholder="Color (HEX)"
              />
              <input
                type="number"
                value={color.position}
                onChange={(e) =>
                  handleColorChange(index, "position", parseInt(e.target.value))
                }
                min="0"
                max="100"
              />
              <FaTrashCan
                className="remove"
                onClick={() => removeColor(index)}
              />
            </div>
          ))}
          <button className="add" onClick={addColor}>
            Add Color
          </button>
        </div>
      </div>
      <div
        className="gradient-preview"
        style={{ background: gradientString(colors) }}
      ></div>
    </div>
  );
};

export default Generator;
