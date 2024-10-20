import { useState, useMemo } from "react";
import "./CharClass.css";

const CharClass = ({
  charClassName,
  charClassAttributes,
  currentAttributes,
}) => {
  const [isRequirementsVisible, setIsRequirementsVisible] = useState(false);

  const toggleRequirementsVisibility = () => {
    setIsRequirementsVisible((prev) => !prev);
  };

  const currentAttributesMap = useMemo(() => {
    return currentAttributes.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});
  }, [currentAttributes]);

  const doesMeetRequirements = useMemo(() => {
    return Object.entries(charClassAttributes).every(
      ([attr, requiredValue]) => {
        return currentAttributesMap[attr] >= requiredValue;
      }
    );
  }, [charClassAttributes, currentAttributesMap]);

  const requirementsDisplay = useMemo(() => {
    return Object.entries(charClassAttributes).map(([attr, requirement]) => (
      <div key={attr} className="requirement">
        <div className="attribute-name">{attr}</div>
        <div className="required-value">{requirement}</div>
      </div>
    ));
  }, [charClassAttributes]);

  return (
    <div className="char-class" style={{ margin: "5px 50px" }}>
      <h4
        className={`char-class-name ${
          doesMeetRequirements ? "meets-requirements" : ""
        }`}
        onClick={toggleRequirementsVisibility}
      >
        {charClassName}
      </h4>
      {isRequirementsVisible && (
        <div className="requirements-list">{requirementsDisplay}</div>
      )}
    </div>
  );
};

export default CharClass;
