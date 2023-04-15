![badge](https://img.shields.io/github/watchers/wdpedroborges/simple-dnd?style=social)
![badge](https://img.shields.io/github/stars/wdpedroborges/simple-dnd?style=social)
![badge](https://img.shields.io/github/license/wdpedroborges/simple-dnd)
![badge](https://img.shields.io/badge/powered%20by-vite-blue)
![badge](https://img.shields.io/badge/powered%20by-react.js-blue)
![badge](https://img.shields.io/badge/powered%20by-typescript-blue)

# Simple DnD
## A simple drag and drop made with React.js and Typescript

If you ever had to use react-beatiful-dnd, you know that it is way too complex and annoying. So, I made this simple dnd, that allows you to create a dnd with less than 20 lines of code.

## Live Demo

wdpedroborges.github.io/simple-dnd/

## How to use

All you need to do is to create a component called DndContext and give it its draggables. It will automatically create a few things:

- The necessary divs with the given content
- The container for the draggables
- The container in which the draggables will be put

And that's why you can send the objects with the style for each thing:

- The style for each draggable: draggableStyle
- The style for the container where the draggables will be put: droppableStyle
- The style for the container where the draggables are initially put: initialDraggingSpotStyle
- The style for the container that contains the other two containers: relationStyle

```javascript
const draggables = ['Draggable 1', 'Draggable 2', 'Draggable 3']

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
```

## Tech

- Vite
- React.js
- Typescript
- Sass

## Installation

Clone the repository:

```bash
git clone https://github.com/wdpedroborges/simple-dnd
```

For production:

```sh
cd simple-dnd
npm install
npm run dev
```

Debug in Typescript:

```bash
tsc --noEmit --watch
```

Build:

```bash
npm run build
```

## Deploy

- Add to vite.config.js:

```bash
base: "/<repo>/"
```

- Then:

```bash
npm install gh-pages --save-dev
```

- Add to package.json

```bash
 "homepage": "https://<username>.github.io/<repo>/",
  ...
  "scripts": {
...
"build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
...
```

## License

This project is licensed under the MIT License. Please see the LICENSE file for more details.
