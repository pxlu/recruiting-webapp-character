import { useState } from "react";
import { SKILL_LIST } from "../../consts";

const Skills = ({ currentAttributes }) => {
  const calculateModifier = (attributeValue) =>
    Math.floor((attributeValue - 10) / 2);
  const calculateAvailablePoints = (intelligence) =>
    10 + 4 * calculateModifier(intelligence);

  const [allocatedPoints, setAllocatedPoints] = useState(
    SKILL_LIST.reduce((acc, skill) => {
      acc[skill.name] = 0; // Start with 0 points allocated for each skill
      return acc;
    }, {})
  );

  const availablePoints = calculateAvailablePoints(
    currentAttributes.Intelligence
  );

  const handleIncrement = (skillName) => {
    if (totalAllocatedPoints() < availablePoints) {
      setAllocatedPoints({
        ...allocatedPoints,
        [skillName]: allocatedPoints[skillName] + 1,
      });
    }
  };

  const handleDecrement = (skillName) => {
    if (allocatedPoints[skillName] > 0) {
      setAllocatedPoints({
        ...allocatedPoints,
        [skillName]: allocatedPoints[skillName] - 1,
      });
    }
  };

  const totalAllocatedPoints = () => {
    return Object.values(allocatedPoints).reduce(
      (acc, points) => acc + points,
      0
    );
  };

  return (
    <div style={{ margin: "5px 100px", border: "3px solid white" }}>
      <h2>Skills</h2>
      <h4>
        Total Skill Points Available: {availablePoints - totalAllocatedPoints()}
      </h4>
      {SKILL_LIST.map((skill) => {
        const modifier = calculateModifier(
          currentAttributes[skill.attributeModifier]
        );
        const total = allocatedPoints[skill.name] + modifier;
        return (
          <div key={skill.name} style={{ margin: "5px 10px 5px 10px" }}>
            <strong>{skill.name}</strong> (Modifier {skill.attributeModifier}:{" "}
            {modifier})<br />
            Points: {allocatedPoints[skill.name]}{" "}
            <button onClick={() => handleIncrement(skill.name)}>+</button>{" "}
            <button onClick={() => handleDecrement(skill.name)}>-</button>
            <br />
            Total Skill Value: {total}
          </div>
        );
      })}
    </div>
  );
};

export default Skills;
