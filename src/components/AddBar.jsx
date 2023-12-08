import React, { useState, useReducer } from 'react'

const addItemReducer = (state, action)=> {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, {text: action.payload, completed: false}]

            case 'TOGGLE_COMPLETE':
                return state.map((item,index)=>
                index === action.payload ?
                {...item, completed: !item.completed}: item
                )
                case 'REMOVE_COMPLETED': 
                return state.filter((item)=> !action.payload.includes(item))
                default: return state
    }
}

const AddBar = ()=> {
    const[addValue, setaddValue] = useState('')
    const[items, dispatch] = useReducer(addItemReducer, [])
    const handleInputChange = (e)=> {
        setaddValue(e.target.value)
    }

    const handleAddItem = ()=> {
        if (addValue.trim() !== '') {
            dispatch({type: 'ADD_ITEM', payload: addValue})
            setaddValue('')
        }
    }

const handleToggleComplete = (index)=> {
    dispatch({type: 'TOGGLE_COMPLETE', payload:index})
}

const handleRemoveCompleted = ()=> {
    const completedItems = items.filter((item)=> item.completed)
    dispatch({type: 'REMOVE_COMPLETED', payload: completedItems})
}
    return (
        <div>
            <input
            type='text'
            value={addValue}
            onChange={handleInputChange}
            placeholder='Type item...'
            />
            <button className= "btn" onClick={handleAddItem}>List Checklist</button>
            <ul>
                {items.map((item, index)=> (
                    <li key= {index}>
                        <input
                        type='checkbox'
                        checked= {item.completed}
                        onChange={()=> handleToggleComplete(index)}
                        />
                        {item.text}
                    </li>
                ))}
            </ul>
            <button onClick={handleRemoveCompleted}>Remove When Completed</button>
        </div>
    )
}

export default AddBar