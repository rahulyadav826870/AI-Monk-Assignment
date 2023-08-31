import React, { useState } from "react";
import "./TagView.css";

const TagView = ({ tag, onUpdate, onAddChild }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(tag.data || "");
  const [editingName, setEditingName] = useState(false);
  const [editedName, setEditedName] = useState(tag.name);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDataChange = (e) => {
    setEditedData(e.target.value);
  };

  const handleDataBlur = () => {
    setEditing(false);
    onUpdate({ ...tag, data: editedData });
  };

  const handleAddChild = () => {
    if (tag.data !== undefined) {
      onUpdate({
        ...tag,
        data: undefined,
        children: [{ name: "New Child", data: "Data" }],
      });
    } else {
      onAddChild(tag); // Pass the current tag as the parent
    }
  };

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setEditingName(false);
    tag.name = editedName;
  };

  return (
    <div className="tag">
      <span className="tagHeader">
        <div>
          <button onClick={handleCollapse} className="collapseButton">
            {collapsed ? ">" : "v"}
          </button>

          {editingName ? (
            <form onSubmit={handleNameSubmit}>
              <input
                className="headerEdit"
                type="text"
                value={editedName}
                onChange={handleNameChange}
                onBlur={handleNameSubmit}
              />
            </form>
          ) : (
            <span className="tagName" onClick={handleEditName}>
              {tag.name}
            </span>
          )}
        </div>
        <button
          onClick={handleAddChild}
          className="customBtn addChidButton"
        >
          <span>Add Child</span>
        </button>
      </span>
      {!collapsed && (
        <div className="tagContent">
          {editing ? (
            <>
              <label htmlFor="">Data</label>
              <input
                type="text"
                value={editedData}
                onChange={handleDataChange}
                onBlur={handleDataBlur}
                className="tagDataInput"
              />
            </>
          ) : (
            <span className="tagData" onClick={handleEdit}>
              {tag.data}
            </span>
          )}
          {tag.children && (
            <ul className="tagChildren">
              {tag.children.map((child) => (
                <li key={child.name} className="tagItem">
                  <TagView
                    tag={child}
                    onUpdate={(updatedTag) =>
                      onUpdate({
                        ...tag,
                        children: tag.children.map((c) =>
                          c.name === updatedTag.name ? updatedTag : c
                        ),
                      })
                    }
                    onAddChild={onAddChild}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TagView;
