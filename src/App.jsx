import React, { useState } from "react";
import "./App.css";
import TagView from "./component/TagView";

const initialTree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" }
      ]
    },
    { name: "child2", data: "c2 World" }
  ]
};

function App() {
  const [tree, setTree] = useState(initialTree);
  const [showJSONData, SetShowJSONData] = useState([]);
  const updateTree = (newTree) => {
    setTree(newTree);
  };

  const handleExport = () => {
    const exportedData = JSON.stringify(tree);
    SetShowJSONData(exportedData);
    // console.log(exportedData, tree);
  };

  const handleAddChild = (parent) => {
    let newChildName = "";
    if (parent.name === "root") {
      // If adding child to root, use childX naming
      newChildName = `child${parent.children.length + 1}`;
    } else {
      // If adding child to child, use childY-childZ naming
      const parentName = parent.name;
      const parentCount = parent.children ? parent.children.length : 0;
      newChildName = `${parentName}-child${parentCount + 1}`;
    }
    const newChild = {
      name: newChildName,
      data: "Data"
    };
    const updatedTree = recursivelyAddChild(tree, parent, newChild);
    updateTree(updatedTree);
  };
  const recursivelyAddChild = (currentNode, parentToFind, newChild) => {
    if (currentNode === parentToFind) {
      // Found the parent, add the new child
      return {
        ...currentNode,
        children: [...(currentNode.children || []), newChild]
      };
    } else if (currentNode.children) {
      // Recurse through children
      const updatedChildren = currentNode.children.map((child) =>
        recursivelyAddChild(child, parentToFind, newChild)
      );
      return { ...currentNode, children: updatedChildren };
    }
    return currentNode;
  };

  
  return (
    <div className="App">
      <h2>Nested Tags Tree</h2>
      <TagView tag={tree} onUpdate={updateTree} onAddChild={handleAddChild} />
    
      <button onClick={handleExport} className="customBtn exportButton">Export</button>

      <p className="showJsonData">{showJSONData}</p>
    </div>
  );
}

export default App;
