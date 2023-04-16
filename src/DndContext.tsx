import { useState, useRef } from 'react'
import Draggable from './Draggable'
import Droppable from './Droppable'

type isThereCollisionReturnType = [number, boolean]
const isThereCollision = (obj1: any, obj2: any, horizontal = true, availableSpace = 3): isThereCollisionReturnType => {
	const rect1 = obj1.getBoundingClientRect()
	const rect2 = obj2.getBoundingClientRect()

	const percentualPosition = horizontal ? (rect1.left - rect2.left) / rect2.width : (rect1.top - rect2.top) / rect2.height
	const positionToPut = Math.floor(percentualPosition * availableSpace) > 0 ? Math.floor(percentualPosition * availableSpace) : 0

	return [positionToPut, rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top]
}

type DndContextProps = {
	draggables: string[]
	isHorizontal: boolean
	draggableStyle: any
	droppableStyle: any
	initialDraggingSpotStyle: any
	relationStyle: any
}

type DraggableType = {
	id: number
	value: string
	dragged: boolean
	affectedLeft: boolean
	affectedRight: boolean
	affectedTop: boolean
	affectedBottom: boolean
}

function DndContext({draggables, isHorizontal, draggableStyle, droppableStyle, initialDraggingSpotStyle, relationStyle}: DndContextProps) {
	const [draggableElements, setDraggableElements] = useState<DraggableType[]>(draggables.map((elem, index) => ({id: index, value: elem, dragged: false, affectedLeft: false, affectedRight: false, affectedTop: false, affectedBottom: false})))
	const [elementsInOrder, setElementsInOrder] = useState<DraggableType[]>([])
	const droppableRef = useRef<HTMLDivElement>(null)

	const handlePossiblePlacing = (obj: any, id: number) => {
		console.log('handling possible placing . . .')
	}

	const handleCollision = (obj: any, id: number) => {
		const [positionToPut, collided] = isThereCollision(obj, droppableRef.current, isHorizontal, draggableElements.length)
		const newDraggableElements = JSON.parse(JSON.stringify(draggableElements))
		const updatedObject = newDraggableElements.find((obj: any) => obj.id === id)

		if (collided) {
			updatedObject.dragged = true

			let alreadyThere = false
			let itsPosition = null
			for (let i = 0; i < elementsInOrder.length; i++) {
				if (elementsInOrder[i].id === updatedObject.id) {
					alreadyThere = true
					itsPosition = i
					break
				}
			}

			let newElementsInOrder = JSON.parse(JSON.stringify(elementsInOrder))
			newElementsInOrder.forEach((elem: DraggableType, index: number) => {
				elem.affectedLeft = false
				elem.affectedRight = false
				elem.affectedTop = false
				elem.affectedBottom = false
			})

			if (newElementsInOrder.length > 0) {
				if (alreadyThere) {
					newElementsInOrder.splice(itsPosition, 1)
					newElementsInOrder.splice(positionToPut, 0, updatedObject)
				} else {
					newElementsInOrder.splice(positionToPut, 0, updatedObject)					
				}

				setElementsInOrder(newElementsInOrder)
			} else {
				setElementsInOrder(prevElements => [... prevElements, updatedObject])
			}

		} else {
			updatedObject.dragged = false
			setElementsInOrder(JSON.parse(JSON.stringify(elementsInOrder.filter(e => e.id !== updatedObject.id))))
		}

		setDraggableElements(newDraggableElements)
	}

	return (
		<div style={relationStyle}>
			<div style={initialDraggingSpotStyle}>
				{draggableElements.filter(elem => !elem.dragged).map((element, index) => (
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
			<Droppable
				items={elementsInOrder}
				droppableRef={droppableRef}
				handleCollision={handleCollision}
				handlePossiblePlacing={handlePossiblePlacing}
				droppableStyle={droppableStyle}
				draggableStyle={draggableStyle}
			/>
		</div>
	)
}

export default DndContext