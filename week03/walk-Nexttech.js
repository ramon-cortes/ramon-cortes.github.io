
let balls = [];
let xDirection = [true, true, true]; //I could use a for, but its just 3
let yDirection = [true, true, true];
// No need to change the following code
// The area object defines the div in which the balls will be created
const area = {
  element: document.getElementById('area'),
  width: 600,
  height: 400,
};

// No need to change the following code
// The initialize function creates the area div on the Html page
function initialize() {
  area.element.style.width = area.width + 'px';
  area.element.style.height = area.height + 'px';
  document.body.appendChild(area.element);
}

// No need to change the following code
// The moveTo function moves a given ball to a set x and y coordinates on the page
function moveTo(ball, x, y) {
  ball.element.style.left = x + 'px';
  ball.element.style.top = y + 'px';
}

// No need to change the following code
// The changeDirectionIfNecessary function reverses the ball direction when it hits the area borders
function changeDirectionIfNecessary(ball, x, y) {
  if (x < 0 || x > area.width - ball.width) {
    ball.dx = -ball.dx;
  }
  if (y < 0 || y > area.height - ball.height) {
    ball.dy = -ball.dy;
  }
}

// TODO: implement the create function
function create(color, dx, dy) {
  const newBall = Object.create(this);
  
  // TODO: set the newBall.element property and initialize it to a Html element "div"
  newBall.element = document.createElement("div");
  // TODO: set the backgroundColor, width and height style properties for newBall.element
  newBall.element.style.backgroundColor = color;
  newBall.element.style.width = '30px';
  newBall.element.style.height = '30px';
  newBall.element.style.left = dx + 'px';
  newBall.element.style.top = dy + 'px';
  // This line set the CSS class for newBall.element. No need to change this line
  newBall.element.className = 'ball';
  //console.log(newBall.element);

  // TODO: set the width and height of newBall based on newBall.element
  // Hint: use the Javascript parseInt() function to convert a string value to integer

  // TODO: use the Javascript appendChild() function to add newBall.element to the area element
  document.body.appendChild(newBall.element);
  return newBall;
}

// TODO: implement the update function
function move() {
  // TODO: use the moveTo() function to move the ball
  // TODO: use the Javascript setTimeout() method to call changeDirectionIfNecessary() and update() every 16ms
  for (let i = 0; i < 3; i++) {
    let xPosition = balls[i].element.style.left;
    //console.log(ball1.element.style.left);
    let yPosition = balls[i].element.style.top;  
    xPosition = parseInt(xPosition.replace('px', ''), 10);
    yPosition = parseInt(yPosition.replace('px', ''), 10);
    if (xDirection[i]) {
      if (xPosition < 570) {
        xPosition++
      } else {
        xDirection[i] = false;
        xPosition--;
      }
    } else {
      if (xPosition > 0) {
        xPosition--;
      } else {
        xDirection[i] = true;
        xPosition++;
      }
    }

    if (yDirection[i]) {
      if (yPosition < 385) {
        yPosition++
      } else {
        yDirection[i] = false;
        yPosition--;
      }
    } else {
      if (yPosition > 14) {
        yPosition--;
      } else {
        yDirection[i] = true;
        yPosition++;
      }
    }

    balls[i].element.style.left = xPosition + 'px';
    //console.log(ball1.element.style.left);
    balls[i].element.style.top = yPosition + 'px';
  }
  setTimeout(move, 8);
}

// Uncomment these lines for step 1 of the activity
// This is expected to create 3 balls within the area div

initialize();
const ball1 = create('blue', 4, 3);
const ball2 = create('red', 1, 5);
const ball3 = create('green', 2, 2);
moveTo(ball1, 70, 1);
moveTo(ball2, 20, 200);
moveTo(ball3, 300, 330);

// Uncomment these lines for step 2 of the activity
// This is expected to make the 3 balls move around the area div

balls.push(ball1);
balls.push(ball2);
balls.push(ball3);
move();
//setInterval(move(ball1), 75);

//move(ball2, 20, 200);
//move(ball3, 300, 330);






// Do not change code past this point
if (typeof module !== 'undefined') {
  module.exports = { update, create, changeDirectionIfNecessary, moveTo, area };
}