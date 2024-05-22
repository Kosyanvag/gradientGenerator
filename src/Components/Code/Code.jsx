import "./Code.style.scss";
import { IoCopy } from "react-icons/io5";

const Code = ({ gradient }) => {
  const handleCopy = () => {
    const textToCopy = `background: ${gradient};`;
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div className="code-container">
      <pre className="gradient-code">background: {gradient};</pre>
      <IoCopy className="copy" onClick={handleCopy} />
    </div>
  );
};

export default Code;
