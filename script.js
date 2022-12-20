document.addEventListener("DOMContentLoaded", myApp);

function myApp() {
  let mySvg = document.querySelector("#mySvg");
  let mainHeader = document.querySelector("#main-header");

  let square = document.querySelector("#square");
  let circle = document.querySelector("#circle");
  let line = document.querySelector("#line");

  let value = "square";
  let select = document.querySelector("#spinnerColor");
  let moving = false;

  elemente = document.querySelector("#elemente");
  let mx = 0,
    my = 0,
    x1 = 0,
    y1 = 0;

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
  function draw() {
    if (moving) {
      if (value === "square") {
        square.style.display = "block";
        square.setAttributeNS(null, "x", Math.min(x1, mx));
        square.setAttributeNS(null, "y", Math.min(y1, my));
        square.setAttributeNS(null, "width", Math.abs(mx - x1));
        square.setAttributeNS(null, "height", Math.abs(my - y1));
      } else if (value === "circle") {
        circle.style.display = "block";
        circle.setAttributeNS(null, "cx", x1);
        circle.setAttributeNS(null, "cy", y1);
        circle.setAttributeNS(
          null,
          "r",
          Math.max(Math.abs(mx - x1), Math.abs(my - y1))
        );
      } else if (value === "line") {
        line.style.display = "block";
        line.setAttributeNS(null, "x1", x1);
        line.setAttributeNS(null, "y1", y1);
        line.setAttributeNS(null, "x2", mx);
        line.setAttributeNS(null, "y2", my);
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
    mx = e.clientX - mySvg.getBoundingClientRect().left;
    my = e.clientY - mySvg.getBoundingClientRect().top;
  });

  mySvg.addEventListener("mousedown", (e) => {
    selectedColor();
    if (e.button !== 0) {
      return;
    }
    moving = true;
    x1 = mx;
    y1 = my;
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
      square.setAttributeNS(null, "x", Math.min(x1, mx));
      square.setAttributeNS(null, "y", Math.min(y1, my));
      square.setAttributeNS(null, "width", Math.abs(mx - x1));
      square.setAttributeNS(null, "height", Math.abs(my - y1));
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
        Math.max(Math.abs(mx - x1), Math.abs(my - y1))
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
      line.setAttributeNS(null, "x2", mx);
      line.setAttributeNS(null, "y2", my);
      elemente.append(line);

      line.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        selected.tip = e.target;
        selected.valoare = e.target.tagName;
      });
    }

    moving = false;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "d" && selected !== null) {
      selected.tip.remove();
      selected.tip = null;
    }
  });
}
