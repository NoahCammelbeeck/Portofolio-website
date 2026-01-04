const svg = document.getElementById("eye");
const pupil = document.getElementById("pupil");

// Eye movement limits (ellipse)
const MAX_X = 105;
const MAX_Y = 30;

// Get pupil center
const pupilBBox = pupil.getBBox();
const center = {
  x: pupilBBox.x + pupilBBox.width / 2,
  y: pupilBBox.y + pupilBBox.height / 2,
};

// Convert mouse position to SVG space
function getSVGPoint(evt) {
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

// Track mouse everywhere
window.addEventListener("mousemove", (e) => {
  const mouse = getSVGPoint(e);

  let dx = mouse.x - center.x;
  let dy = mouse.y - center.y;

  dx *= 3;

  dx = Math.max(-MAX_X, Math.min(MAX_X, dx));
  dy = Math.max(-MAX_Y, Math.min(MAX_Y, dy));

  pupil.setAttribute("transform", `translate(${dx}, ${dy})`);
});

// Reset pupil when mouse leaves the window
window.addEventListener("mouseleave", () => {
  pupil.setAttribute("transform", "translate(0, 0)");
});

// // Get all links
// const links = document.querySelectorAll("a");

// // Add event listeners for glow
// links.forEach((link) => {
//   link.addEventListener("mouseenter", () => {
//     pupil.classList.add("glow");
//   });
//   link.addEventListener("mouseleave", () => {
//     pupil.classList.remove("glow");
//   });
// });
