import { useState, useEffect, useRef } from 'react'
import Draggable from './Draggable'

type DraggableType = {
	id: number
	value: string
	dragged: boolean
	affectedLeft: boolean
	affectedRight: boolean
	affectedTop: boolean
	affectedBottom: boolean
}

type DroppableProps = {
	items: DraggableType[]
	droppableRef: any
	handleCollision: (obj: any, id: number) => void
	handlePossiblePlacing: (obj: any, id: number) => void
	droppableStyle: any
	draggableStyle: any
}

function Droppable({items, droppableRef, handleCollision, handlePossiblePlacing, droppableStyle, draggableStyle}: DroppableProps) {
	return (
		<div ref={droppableRef} style={droppableStyle}>
			{items.map((element, index) => (
				<Draggable
					key={index}
					value={element.value}
					id={element.id}
					
					affectedLeft={element.affectedLeft}
					affectedRight={element.affectedRight}
					affectedTop={element.affectedTop}
					affectedBottom={element.affectedBottom}

					onCollision={handleCollision}
					onPossiblePlacing={handlePossiblePlacing}
					draggableStyle={draggableStyle}
				/>
			))}
		</div>
	)
}

export default Droppable