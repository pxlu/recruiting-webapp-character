import { useState, useMemo } from "react";
import "./Attribute.css";

const Attribute = ({
  attributeName,
  currentTotalAttributes,
  onAttributeChange,
}) => {
  const [currentAttribute, setCurrentAttribute] = useState(10);

  const modifier = useMemo(
    () => Math.floor((currentAttribute - 10) / 2),
    [currentAttribute]
  );

  const updateAttribute = (change) => {
    setCurrentAttribute((prevAttribute) => {
      const newAttribute = prevAttribute + change;
      onAttributeChange({ name: attributeName, value: newAttribute });
      return newAttribute;
    });
  };

  const attributeDisplay = `${attributeName}: ${currentAttribute} (Modifier: ${modifier})`;

  return (
    <div className="attribute">
      <div>{attributeDisplay}</div>
      <button
        disabled={currentTotalAttributes >= 70}
        onClick={() => updateAttribute(1)}
      >
        +
      </button>
      <button
        disabled={currentAttribute <= 0}
        onClick={() => updateAttribute(-1)}
      >
        -
      </button>
    </div>
  );
};

export default Attribute;
