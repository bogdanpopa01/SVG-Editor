function myApp() {
  let mySvg = document.querySelector("#mySvg");
  let mainHeader = document.querySelector("#main-header");

  let line = document.querySelector("#line");
  // it is actually a rectangle
  let square = document.querySelector("#square");
  let circle = document.querySelector("#circle");
  let color = document.querySelector("#spinnerColor");

  let btnLine = document.querySelector("#btnLine");
  let btnSquare = document.querySelector("#btnSquare");
  let btnCircle = document.querySelector("#btnCircle");
  let btnEraseAll = document.querySelector("#btnEraseAll");
  let elements = document.querySelector("#elements");

  function drawSquare() {
    console.log("Rectangle");
    value = "square";
  }

  function drawCircle() {
    console.log("Circle");
    value = "circle";
  }

  function drawLine() {
    console.log("Line");
    value = "line";
  }

  function selectedColor() {
    console.log("Selected color");
    let value = color.value;
  }

  function eraseAll() {
    console.log("EraseAll button");
    while (elements.children.length > 0) {
      elements.children[0].remove();
    }
  }

  btnLine.addEventListener("click", drawLine);
  btnSquare.addEventListener("click", drawSquare);
  btnCircle.addEventListener("click", drawCircle);
  btnEraseAll.addEventListener("click", eraseAll);

  let value = "square";
  let obj = { val: value, type: null };
  let mouseMovement = false;
  let x1 = 0,
    y1 = 0,
    myX = 0,
    myY = 0;

  function draw() {
    if (mouseMovement) {
      if (value === "line") {
        line.style.display = "block";
        line.setAttributeNS(null, "x1", x1);
        line.setAttributeNS(null, "x2", myX);
        line.setAttributeNS(null, "y1", y1);
        line.setAttributeNS(null, "y2", myY);
      } else if (value === "square") {
        square.style.display = "block";
        square.setAttributeNS(null, "x", Math.min(x1, myX));
        square.setAttributeNS(null, "y", Math.min(y1, myY));
        square.setAttributeNS(null, "width", Math.abs(myX - x1));
        square.setAttributeNS(null, "height", Math.abs(myY - y1));
      } else if (value === "circle") {
        circle.style.display = "block";
        circle.setAttributeNS(null, "cx", x1);
        circle.setAttributeNS(null, "cy", y1);
        circle.setAttributeNS(
          null,
          "r",
          Math.max(Math.abs(myX - x1), Math.abs(myY - y1))
        );
      }
    } else {
      line.style.display = "none";
      square.style.display = "none";
      circle.style.display = "none";
    }
    requestAnimationFrame(draw);
  }
  draw();

  mySvg.addEventListener("mousemove", (e) => {
    myX = e.clientX - mySvg.getBoundingClientRect().left;
    myY = e.clientY - mySvg.getBoundingClientRect().top;
  });

  mySvg.addEventListener("mousedown", (e) => {
    selectedColor();
    if (e.button !== 0) {
      return;
    }
    mouseMovement = true;
    x1 = myX;
    y1 = myY;
  });

  mySvg.addEventListener("mouseup", (e) => {
    if (e.button !== 0) {
      return;
    }

    if (value === "line") {
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.style.display = "block";
      line.setAttributeNS(null, "x1", x1);
      line.setAttributeNS(null, "x2", myX);
      line.setAttributeNS(null, "y1", y1);
      line.setAttributeNS(null, "y2", myY);
      elements.append(line);

      line.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        obj.val = e.target.tagName;
        obj.type = e.target;
      });
    } else if (value === "square") {
      let square = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      square.style.fill = color.value;
      square.setAttributeNS(null, "x", Math.min(x1, myX));
      square.setAttributeNS(null, "y", Math.min(y1, myY));
      square.setAttributeNS(null, "height", Math.abs(myY - y1));
      square.setAttributeNS(null, "width", Math.abs(myX - x1));
      elements.append(square);

      square.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        obj.val = e.target.tagName;
        obj.type = e.target;
      });
    } else if (value === "circle") {
      let circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.style.fill = color.value;
      circle.setAttributeNS(null, "cx", x1);
      circle.setAttributeNS(null, "cy", y1);
      circle.setAttributeNS(
        null,
        "r",
        Math.max(Math.abs(myX - x1), Math.abs(myY - y1))
      );

      elements.append(circle);

      circle.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        obj.val = e.target.tagName;
        obj.type = e.target;
      });
    }
    mouseMovement = false;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "d" && obj !== null) {
      obj.type.remove();
      obj.type = null;
    }
  });
}

document.addEventListener("DOMContentLoaded", myApp);
