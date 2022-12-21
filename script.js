function myApp() {
  let mySvg = document.getElementById("mySvg");
  // used not to let the user right-click onto the svg area
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  let elements = document.getElementById("elements");

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
  let btnDownload = document.getElementById("btnDownload");

  let value = "line";
  let obj = { val: value, type: null };

  btnLine.addEventListener("click", (e) => {
    value = "line";
  });
  btnSquare.addEventListener("click", (e) => {
    value = "square";
  });
  btnCircle.addEventListener("click", (e) => {
    value = "circle";
  });

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

  btnEraseAll.addEventListener("click", eraseAll);
  btnErase.addEventListener("click", eraseElement);
  btnHelp.addEventListener("click", (e) => {
    alert(
      "To delete an element use the forth button (the eraser). First, right-click the element you want to erase, then press the button. The fifth button(the bin) is used to automatically delete one or more elements."
    );
  });

  btnDownload.addEventListener("click", (e) => {
    console.log("Download button");
    let svg = document.getElementById("mySvg");
    let data = new XMLSerializer().serializeToString(svg);
    let svgBlob = new Blob([data], {
      type: "image/svg+xml;charset=utf-8",
    });
    let url = URL.createObjectURL(svgBlob);
    let img = new Image();
    img.src = url;
    img.addEventListener("load", () => {
      let bbox = svg.getBoundingClientRect();
      let canvas = document.createElement("canvas");
      canvas.width = bbox.width;
      canvas.height = bbox.height;
      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, bbox.width, bbox.height);
      URL.revokeObjectURL(url);

      let a = document.createElement("a");
      a.download = "image.png";
      document.body.appendChild(a);
      a.href = canvas.toDataURL();
      a.click();
      a.remove();
    });
  });

  let mouseMovement = false;
  let x1 = 0,
    y1 = 0,
    myX = 0,
    myY = 0;

  // function to display the outline of the elements
  function drawOutline() {
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
        square.setAttributeNS(null, "width", Math.abs(x1 - myX));
        square.setAttributeNS(null, "height", Math.abs(y1 - myY));
      } else if (value === "circle") {
        circle.style.display = "block";
        circle.setAttributeNS(null, "cx", x1);
        circle.setAttributeNS(null, "cy", y1);
        circle.setAttributeNS(
          null,
          "r",
          Math.max(Math.abs(x1 - myX), Math.abs(y1 - myY))
        );
      }
    } else {
      line.style.display = "none";
      square.style.display = "none";
      circle.style.display = "none";
    }
    requestAnimationFrame(drawOutline);
  }
  drawOutline();

  mySvg.addEventListener("mousemove", (e) => {
    myX = e.clientX - mySvg.getBoundingClientRect().left;
    myY = e.clientY - mySvg.getBoundingClientRect().top;
  });

  function selectedColor() {
    console.log("Selected color");
    let value = color.value;
  }

  mySvg.addEventListener("mousedown", (e) => {
    selectedColor();
    // if the user doesn't left-click
    if (e.button !== 0) {
      return;
    }
    mouseMovement = true;
    x1 = myX;
    y1 = myY;
  });

  mySvg.addEventListener("mouseup", (e) => {
    // if the user doesn't left-click
    if (e.button !== 0) {
      return;
    }

    // functions to display the elements when the user releases the left-click
    function drawTheFroms() {
      if (value === "line") {
        let line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
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
        square.setAttributeNS(null, "width", Math.abs(x1 - myX));
        square.setAttributeNS(null, "height", Math.abs(y1 - myY));
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
          Math.max(Math.abs(x1 - myX), Math.abs(y1 - myY))
        );

        elements.append(circle);

        circle.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          obj.val = e.target.tagName;
          obj.type = e.target;
        });
      }
    }
    drawTheFroms();
    mouseMovement = false;
  });
}

document.addEventListener("DOMContentLoaded", myApp);
