function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + "CC";
}
function rgbIntervalValue() {
  return Math.round(Math.random() * 256);
}
function generateRandomColor() {
  const r = rgbIntervalValue();
  const g = rgbIntervalValue();
  const b = rgbIntervalValue();
  return rgbToHex(r, g, b);
}

export function getColor(existingColors) {
  let color = "#88888866";
  let tryCount = 100;
  let counter = 1;
  while (true) {
    color = generateRandomColor();
    if (!existingColors.includes(color)) {
      break;
    }
    if (counter >= tryCount) {
      break;
    }
    tryCount++;
  }
  return color;
}
