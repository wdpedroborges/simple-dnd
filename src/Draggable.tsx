import { useState, useEffect, useRef } from 'react'

type DraggableProps = {
	value: string
	id: number
	affectedLeft: boolean
	affectedRight: boolean
	affectedTop: boolean
	affectedBottom: boolean
	onCollision: (obj: any, id: number) => void
	onPossiblePlacing: (obj: any, id: number) => void
	draggableStyle: any
}

type StyleType = {
	position: string
	top: string
	left: string
	cursor: string
	transform: string
	userSelect: string
}

function Draggable({value, id, affectedLeft, affectedRight, affectedTop, affectedBottom, onCollision, onPossiblePlacing, draggableStyle}: DraggableProps) {
	const [style, setStyle] = useState<StyleType>({
		position: 'static',
		top: '0',
		left: '0',
		cursor: 'grab',
		transform: 'none',
		userSelect: 'none'
	})
	const [followCursor, setFollowCursor] = useState(false)
	const thisElementRef = useRef<any>(null)

	const handleMouseMove = (event: any) => {
		if (followCursor)  {
			setStyle(prevState => ({
				... prevState,
				top: `${event.pageY}px`,
				left: `${event.pageX}px`,
			}))
		}

		if (followCursor) {
			onPossiblePlacing(thisElementRef.current, id)
		}
	}

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove)
		return () => document.removeEventListener('mousemove', handleMouseMove)
	}, [followCursor])

	const handleMouseDown = (event: any) => {
		setStyle(prevState => ({
			... prevState,
			position: 'absolute',
			cursor: 'grabbing',
			top: `${event.clientY}px`,
			left: `${event.clientX}px`,
			transform: 'translate(-50%, -50%)'
		}))
		setFollowCursor(true)
	}
	const handleMouseUpOrTouchEnd = () => {
		setStyle(prevState => ({
			... prevState,
			position: 'static',
			cursor: 'grab',
			transform: 'none'
		}))

		onCollision(thisElementRef.current, id)
		setFollowCursor(false)
	}

	const handleTouchMove = (event: any) => {
		setStyle(prevState => ({
			... prevState,
			position: 'absolute',
			cursor: 'grabbing',
			top: `${event.touches[0].clientY}px`,
			left: `${event.touches[0].clientX}px`,
			transform: 'translate(-50%, -50%)'
		}))
		setFollowCursor(true)

		if (followCursor) {
			onPossiblePlacing(thisElementRef.current, id)
		}
	}

	const checkTypeOfValue = () => {
		if (value.search('.jpg') !== -1 || value.search('.png') !== -1 || value.search('.jpeg') !== -1 || value.search('.gif') !== -1 || value.search('.svg') !== -1) {
			return <img src={value} style={{pointerEvents: 'none'}}/>
		} else {
			return value
		}
	}

	const lookForHovering = (type: string) => {
		if (style.cursor !== 'grab') return 0

		const valueInRem = '150px'
		switch (type) {
			case 'left':
				if (affectedLeft) {
					return `${valueInRem}`
				} else {
					return 0
				}
				break
			case 'right':
				if (affectedRight) {
					return `${valueInRem}`
				} else {
					return 0
				}
				break
			case 'top':
				if (affectedTop) {
					return `${valueInRem}`
				} else {
					return 0
				}
				break
			case 'bottom':
				if (affectedBottom) {
					return `${valueInRem}`
				} else {
					return 0
				}
				break
			default:
				return 0
		}
	}

	return (
		<div	
			ref={thisElementRef}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUpOrTouchEnd}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleMouseUpOrTouchEnd}
			style={{... style, ...draggableStyle, marginLeft: lookForHovering('left'), marginRight: lookForHovering('right'), marginTop: lookForHovering('top'), marginBottom: lookForHovering('bottom')}}
		>
				{checkTypeOfValue()}
		</div>
	)
}

export default Draggable