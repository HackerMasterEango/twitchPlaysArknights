const robot = require('robotjs')

while (true) {
    var mouse = robot.getMousePos();
    console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
} 