const path = require("path");
const { createCanvas, loadImage, registerFont } = require("canvas");

const socialBaseImagePromise = loadImage(
  path.join(__dirname, "./src/images/social-card-base.png")
);

registerFont("RobotoMono-Bold.ttf", { family: "Roboto Mono", weight: "bold" });

module.exports = async function generateCardImage(title) {
  const canvas = createCanvas(600, 314);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(await socialBaseImagePromise, 0, 0);

  ctx.font = "bold 36px 'Roboto Mono'";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#2D3748";
  const str = layoutString(title, 17);
  const lineCount = str.split("\n").length;
  ctx.fillText(str, 30, 314 / 2 - ((lineCount - 1) * 50) / 2);

  return canvas;
};

function layoutString(str, w) {
  const words = str.split(" ");
  let line = [];
  let lines = [];
  while (words.length > 0) {
    while (true) {
      line.push(words.shift());
      if (words.length === 0) {
        break;
      }
      if (line.join(" ").length + 1 + words[0].length > w) {
        break;
      }
    }
    lines.push(line.join(" "));
    line = [];
  }
  return lines.join("\n");
}
