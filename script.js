document.addEventListener("DOMContentLoaded", myApp);

function myApp() {
  let mySvg = document.querySelector("#mySvg");
  let mainHeader = document.querySelector("#main-header");

  let square = document.querySelector("square");
  let circle = document.querySelector("#circle");
  let line = document.querySelector("#line");

  let value = "square";
  let select = document.querySelector("#spinnerColor");

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
    console.log("Erased button");
  }

  function selectedColor() {
    let x = select.value;
    console.log("Selected color");
  }

  btnSquare.addEventListener("click", drawSquare);
  btnCircle.addEventListener("click", drawCircle);
  btnLine.addEventListener("click", drawLine);
  btnEraseAll.addEventListener("click", eraseAll);
}
