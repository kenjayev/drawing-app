const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
/* window change size then change canvas element size */
window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

const ctx = canvas.getContext("2d");
ctx.lineCap = "round";
let drawing = false;
let drawX = null;
let drawY = null;

/* function which -- change stroke color */
document.querySelectorAll(".clr").forEach((clr) => {
  clr.addEventListener("click", (e) => {
    document.querySelector(".active").classList.remove("active");
    clr.classList.add("active");

    ctx.strokeStyle = clr.dataset.clr;
  });
});

/* Clear canvas element */
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

/* Save, download canvas element */
const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", () => {
  const url = canvas.toDataURL("imag/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = "sketch.png";
  a.click();
});

/* change background color */
const inputBgColor = document.querySelector("#bgColor__change");
inputBgColor.addEventListener("input", () => {
  document.body.style.background = inputBgColor.value;
});

/* Change stroke Width (bold) */
const ageInputChange = document.querySelector("#ageInputId");
ctx.lineWidth = ageInputChange.value;
ageInputChange.addEventListener("input", (e) => {
  ctx.lineWidth = ageInputChange.value;
});

function mouseDown(e) {
  drawing = true;
  drawingFunction(e);
}
function touchStartForMobile(e) {
  let drawingX = e.touches[0].clientX;
  let drawingY = e.touches[0].clientY;
  ctx.beginPath();
  ctx.moveTo(drawingX, drawingY);
  console.log(e);
}
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("touchstart", touchStartForMobile);

canvas.addEventListener("mouseup", (e) => (drawing = false));

canvas.addEventListener("mousemove", drawingFunction);
canvas.addEventListener("touchmove", drawingFunctionForMobile);

/* main drawing function. for mousemove */
function drawingFunctionForMobile(e) {
  let drawingX = e.touches[0].clientX;
  let drawingY = e.touches[0].clientY;

  ctx.lineTo(drawingX, drawingY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(drawingX, drawingY);
}
function drawingFunction(e) {
  if (drawX == null || drawY == null || !drawing) {
    drawX = e.clientX;
    drawY = e.clientY;
    return;
  }

  let drawingX = e.clientX;
  let drawingY = e.clientY;
  ctx.beginPath();
  ctx.moveTo(drawX, drawY);
  ctx.lineTo(drawingX, drawingY);
  ctx.stroke();
  drawX = drawingX;
  drawY = drawingY;
}
