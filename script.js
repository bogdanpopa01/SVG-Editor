document.addEventListener("DOMContentLoaded", myApp);

function myApp() {
  let mySvg = document.querySelector("#mySvg");
  let mainHeader = document.querySelector("#main-header");

  // it is actually a rectangle
  let square = document.querySelector("#square");
  let circle = document.querySelector("#circle");
  let line = document.querySelector("#line");

  let value = "square";
  let select = document.querySelector("#spinnerColor");

  elemente = document.querySelector("#elemente");
  let btnSquare = document.querySelector("#btnSquare");
  let btnCircle = document.querySelector("#btnCircle");
  let btnLine = document.querySelector("#btnLine");
  let btnEraseAll = document.querySelector("#btnEraseAll");

  function drawSquare() {
    value = "square";
    console.log("Square");
  }

  function drawCircle() {
    value = "circle";
    console.log("Circle");
  }

  function drawLine() {
    value = "line";
    console.log("Line");
  }

  function eraseAll() {
    while (elemente.children.length > 0) {
      elemente.children[0].remove();
    }
    console.log("EraseAll button");
  }

  function selectedColor() {
    let x = select.value;
    console.log("Selected color");
  }

  btnSquare.addEventListener("click", drawSquare);
  btnCircle.addEventListener("click", drawCircle);
  btnLine.addEventListener("click", drawLine);
  btnEraseAll.addEventListener("click", eraseAll);

  mySvg.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  let selected = { valoare: value, tip: null };
  let mouseMovement = false;
  let x1 = 0,
    y1 = 0,
    myX = 0,
    myY = 0;
  function draw() {
    if (mouseMovement) {
      if (value === "square") {
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
      } else if (value === "line") {
        line.style.display = "block";
        line.setAttributeNS(null, "x1", x1);
        line.setAttributeNS(null, "y1", y1);
        line.setAttributeNS(null, "x2", myX);
        line.setAttributeNS(null, "y2", myY);
      }
    } else {
      square.style.display = "none";
      circle.style.display = "none";
      line.style.display = "none";
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

    if (value === "square") {
      let square = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      square.style.fill = select.value;
      square.setAttributeNS(null, "x", Math.min(x1, myX));
      square.setAttributeNS(null, "y", Math.min(y1, myY));
      square.setAttributeNS(null, "width", Math.abs(myX - x1));
      square.setAttributeNS(null, "height", Math.abs(myY - y1));
      elemente.append(square);

      square.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        selected.tip = e.target;
        selected.valoare = e.target.tagName;
      });
    } else if (value === "circle") {
      let circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.style.fill = select.value;
      circle.setAttributeNS(null, "cx", x1);
      circle.setAttributeNS(null, "cy", y1);
      circle.setAttributeNS(
        null,
        "r",
        Math.max(Math.abs(myX - x1), Math.abs(myY - y1))
      );

      elemente.append(circle);

      circle.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        selected.tip = e.target;
        selected.valoare = e.target.tagName;
      });
    } else if (value === "line") {
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.style.display = "block";
      line.setAttributeNS(null, "x1", x1);
      line.setAttributeNS(null, "y1", y1);
      line.setAttributeNS(null, "x2", myX);
      line.setAttributeNS(null, "y2", myY);
      elemente.append(line);

      line.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        selected.tip = e.target;
        selected.valoare = e.target.tagName;
      });
    }

    mouseMovement = false;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "d" && selected !== null) {
      selected.tip.remove();
      selected.tip = null;
    }
  });
}
