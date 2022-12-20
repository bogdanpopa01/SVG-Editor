function myApp() {
  let mySvg = document.getElementById("mySvg");
  let mainHeader = document.getElementById("main-header");

  let line = document.getElementById("line");
  // it is actually a rectangle
  let square = document.getElementById("square");
  let circle = document.getElementById("circle");
  let color = document.getElementById("spinnerColor");

  let btnLine = document.getElementById("btnLine");
  let btnSquare = document.getElementById("btnSquare");
  let btnCircle = document.getElementById("btnCircle");
  let btnErase = document.getElementById("btnErase");
  let btnEraseAll = document.getElementById("btnEraseAll");
  let btnHelp = document.getElementById("btnHelp");
  let elements = document.getElementById("elements");

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
    if (elements.children.length > 0) {
      while (elements.children.length > 0) {
        elements.children[0].remove();
      }
    } else {
      alert("There are no elements to erase!");
    }
  }

  function eraseElement() {
    console.log("Erase element button");
    if (elements.children.length > 0) {
      if (obj !== null) {
        obj.type.remove();
        obj.val = null;
        obj.type = null;
      }
    } else {
      alert("There is no element to erase!");
    }
  }

  btnLine.addEventListener("click", drawLine);
  btnSquare.addEventListener("click", drawSquare);
  btnCircle.addEventListener("click", drawCircle);
  btnEraseAll.addEventListener("click", eraseAll);
  btnErase.addEventListener("click", eraseElement);
  btnHelp.addEventListener("click", (e) => {
    alert(
      "To delete an element use the forth button (the eraser). First, right-click the element you want to erase, then press the button. The fifth button(the bin) is used to automatically delete one or more elements."
    );
  });

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

  // so that you can't right-click in the svg area
  document.addEventListener("contextmenu", (e) => e.preventDefault());

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
}

document.addEventListener("DOMContentLoaded", myApp);
