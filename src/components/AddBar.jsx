import React, { useState, useReducer } from "react";

const addItemReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, { text: action.payload, completed: false }];

    case "TOGGLE_COMPLETE":
      return state.map((item, index) =>
        index === action.payload
          ? { ...item, completed: !item.completed } : item
      );

case 'EDIT_ITEM':
    return state.map((item, index) =>
    index === action.payload.index ? 
    {...item, text: action.payload.newText} : item 
);

    case "REMOVE_COMPLETED":
      return state.filter((item) => !item.completed);
    default:
      return state;
  }
};

const AddBar = () => {
  const [addValue, setaddValue] = useState("");
  const [items, dispatch] = useReducer(addItemReducer, []);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setaddValue(e.target.value);
  };

const handleAddItem =() => {
if (addValue.trim() !== "") {
    dispatch({type: "ADD_ITEM", payload:addValue});
    setaddValue("");
}
}; 

  const handleToggleComplete = (index) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: index });
  };

  const handleEditedItem = (index, newText) => {
    dispatch({type: "Edit_ITEM", payload: {index, newText}})
    setEditIndex(null);
  };

  const handleRemoveCompleted = () => {
    dispatch({ type: "REMOVE_COMPLETED" });
  };

  const handleStartEdit = (index) => {
    setEditIndex(index);
  };
  return (
    <div>
      <input
        type="text"
        value={addValue}
        onChange={handleInputChange}
        placeholder="Type item..."
      />
    <button className="btn" onClick={handleAddItem}>List Checklist
    {editIndex !== null ? "Save Edit" : "Add"}
    </button>
      <ul> 
        {items.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleComplete(index)}
            />
            {editIndex === index ? ( 
                <>
                <input 
                type="text"
                value={item.text}
                onChange={(e)=>
                handleEditedItem(index, e.target.value)}
                />
                <button onClick={() =>
                handleEditedItem(index, item.text)}>Save</button>
                </>
            ) : (
                <>
                {item.text}
                <button onClick={() =>
                handleStartEdit(index)}>Edit</button>
                </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleRemoveCompleted}>Remove When Completed</button>
    </div>
  );
};

export default AddBar;
