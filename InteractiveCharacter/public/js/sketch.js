var socket;
var circles = [];
var index = 0;
var colorPicker;

 socket = io.connect('https://143.248.109.186:8080');
 // We make a named event called 'mouse' and write an
 // anonymous callback function
 socket.on('mouse',
   // When we receive data
   function(data) {
     console.log("Got: " + data.x + " " + data.y);
     fill(60, 250,255);
     noStroke();
     ellipse(data.x, data.y, 4, 4);

   }
 );

 function setup() {
   canvas = createCanvas(windowWidth, windowHeight);
   canvas.position(0,0);
   // canvas.style('z-index', '-1');
   // background(175);
   colorPicker = createColorPicker ('#ed225d');
   colorPicker.position(50, height + 5);
 }

  function draw() {
    stroke(colorPicker.color());
    fill(colorPicker.color());
   // if (mouseIsPressed === true) {
   //   line(mouseX, mouseY, pmouseX, pmouseY);
   // }

    if (keyIsPressed === true) {    //eraser tool - hold any key and drag mouse around to use eraser
      noStroke();
      fill(255);
      ellipse(mouseX,mouseY,30,30);
      x=mouseY;
      y=mouseX;
  }

  // background(220);
  while(index < circles.length) {
    ellipse(circles[index].x, circles[index].y, circles[index].d);
    index += 1;
  }
  if (mouseIsPressed) {
    // add a circle where the mouse is
    // not this: ellipse(mouseX, mouseY, 10);
    circles[circles.length] = { x: mouseX, y: mouseY, d: 10 };
  }

  }

  function mouseDragged() {
    // Draw some white circles
     // line(mouseX, mouseY, pmouseX, pmouseY);
    // Send the mouse coordinates
    sendmouse(mouseX,mouseY);
  }

  // function touchMoved() {
  //   stroke(102);
  //   fill(102);
  //   return false;
  // }

  // Function for sending to the socket
  function sendmouse(xpos, ypos) {
    // We are sending!
    console.log("sendmouse: " + xpos + " " + ypos);

    // Make a little object with  and y
    var data = {
      x: xpos,
      y: ypos
    };

    // Send that object to the socket
    socket.emit('mouse',data);
  }
