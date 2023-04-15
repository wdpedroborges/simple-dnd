import { useState, useRef } from 'react'
import Draggable from './Draggable'
import Droppable from './Droppable'
import DndContext from './DndContext'
import './App.css'

const draggableStyle = {
  width: '100px',
  height: '100px',
  backgroundColor: '#fff',
  padding: '1rem',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bolder',
  border: '3px solid #fff',
  borderRadius: '1rem',
  transition: 'padding .5s'
}

const droppableStyle = {
  padding: '1rem',
  minHeight: '150px',
  width: '600px',
  marginTop: '5rem',
  borderRadius: '1rem',
  marginRight: '1rem',
  border: '5px solid #555',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around'
}

const initialDraggingSpotStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center'
}

const relationStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  minWidth: '50vw'
}

const draggables = ['https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg', 'https://github.com/devicons/devicon/raw/master/icons/nodejs/nodejs-original.svg']

function App() {
  return (
    <DndContext 
      draggables={draggables}
      isHorizontal={true}
      draggableStyle={draggableStyle}
      droppableStyle={droppableStyle}
      initialDraggingSpotStyle={initialDraggingSpotStyle}
      relationStyle={relationStyle}
    />
  )
}

export default App
