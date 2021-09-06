// Move the mouse across the screen as a sine wave.
const robot = require('robotjs')
const { DOWN, RIGHT, UP, LEFT } = require('./operatorDirectionEnum')
const operatorPositions = require('./operatorPositions')

const deployOperator = (opNumber, placementTile, opDirection, map) => {
  const [column, row] = placementTile
  // Ensure valid row column entered before processing.
  if (!map[column] || !map[column][row]) {
    return
  }

  robot.setMouseDelay(200)
  robot.moveMouse(...operatorPositions[opNumber])
  robot.mouseToggle('down')

  const [x, y] = map[column][row]

  // Get appropriate offset based off the column letter. This is cringe actually.
  const xOffset =
    {
      a: 165,
      b: 165,
      c: 150,
      d: 100,
      e: 100,
      f: 100,
      g: 100,
      h: 100
    }[[column]] || 0

  robot.dragMouse(x + xOffset, y + map['yOffset'])
  robot.mouseToggle('up')

  // move operator correct orientation
  robot.mouseToggle('down')
  const mouse = robot.getMousePos()
  switch (opDirection) {
    case DOWN:
      robot.dragMouse(mouse.x, mouse.y + 300)
      break
    case RIGHT:
      robot.dragMouse(mouse.x + 300, mouse.y)
      break
    case UP:
      robot.dragMouse(mouse.x, mouse.y - 300)
      break
    case LEFT:
      robot.dragMouse(mouse.x - 300, mouse.y)
      break
  }

  robot.mouseToggle('up')
}

const activateOperator = (placementTile, map) => {
  const [column, row] = placementTile
  // Ensure valid row column entered before processing.
  if (!map[column] || !map[column][row]) {
    return
  }

  robot.setMouseDelay(200)
  // Click operator
  robot.moveMouse(...map[column][row])
  robot.mouseClick()

  // Activate ability
  robot.moveMouse(1259, 599)
  robot.mouseClick()

  // To prevent spam slowing gmae down click off game screen every time we try to activate ability.
  robot.moveMouse(0, 61)
  robot.mouseClick()
}

const undeployOperator = (placementTile, map) => {
  const [column, row] = placementTile
  // Ensure valid row column entered before processing.
  if (!map[column] || !map[column][row]) {
    return
  }

  robot.setMouseDelay(200)

  // click operator
  robot.moveMouse(...map[column][row])
  robot.mouseClick()

  // click the undeploy button
  robot.moveMouse(905, 337)
  robot.mouseClick()

  // To prevent spam slowing gmae down click off game screen every time we try to activate ability.
  robot.moveMouse(0, 61)
  robot.mouseClick()
}

module.exports = {
  deployOperator,
  activateOperator,
  undeployOperator
}
