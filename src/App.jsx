import { useState } from 'react'
import React from 'react'
import AddBar from './components/AddBar'
import './app.css'

function App() {
  return (
    <div>
      <h1 className='Header'>To Do List</h1>
      <AddBar/>
      </div>
  )
}

export default App
