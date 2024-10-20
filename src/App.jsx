import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import Attribute from "./components/Attribute";

function App() {
  const initialAttributes = useMemo(
    () => ATTRIBUTE_LIST.map((attribute) => ({ name: attribute, value: 10 })),
    []
  );

  const [currentAttributes, setCurrentAttributes] = useState(initialAttributes);

  const handleAttributeUpdate = useCallback((updatedAttribute) => {
    setCurrentAttributes((prevAttributes) =>
      prevAttributes.map((attr) =>
        attr.name === updatedAttribute.name ? updatedAttribute : attr
      )
    );
  }, []);

  const attributesObject = useMemo(
    () =>
      currentAttributes.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
      }, {}),
    [currentAttributes]
  );

  const totalAttributePoints = useMemo(
    () => Object.values(attributesObject).reduce((acc, val) => acc + val, 0),
    [attributesObject]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <section className="attributes-section">
          <h2>Attributes</h2>
          <h3>Total Attributes Allocated: {totalAttributePoints}</h3>
          {ATTRIBUTE_LIST.map((attribute) => (
            <Attribute
              key={attribute}
              attributeName={attribute}
              currentTotalAttributes={totalAttributePoints}
              onAttributeChange={handleAttributeUpdate}
            />
          ))}
        </section>
      </section>
    </div>
  );
}

export default App;
