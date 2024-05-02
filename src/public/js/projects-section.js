const socket = io();


const icon = document.getElementById("iconplus");
const text = document.getElementById("textplus");
const icon2 = document.getElementById("icontime");
const text2 = document.getElementById("texttime");

icon.addEventListener("mouseenter", () => {
  icon.style.color = "white";
  text.style.color = "white";
  document.body.style.cursor = "pointer";
});

icon.addEventListener("mouseleave", () => {
  icon.style.color = "rgba(245, 245, 245, 0.5)";
  text.style.color = "rgba(245, 245, 245, 0.5)";
  document.body.style.cursor = "default";
});

text.addEventListener("mouseenter", () => {
  icon.style.color = "white";
  text.style.color = "white";
  document.body.style.cursor = "pointer";
});

text.addEventListener("mouseleave", () => {
  icon.style.color = "rgba(245, 245, 245, 0.5)";
  text.style.color = "rgba(245, 245, 245, 0.5)";
  document.body.style.cursor = "default";
});

icon2.addEventListener("mouseenter", () => {
  icon2.style.color = "white";
  text2.style.color = "white";
  document.body.style.cursor = "pointer";
});

icon2.addEventListener("mouseleave", () => {
  icon2.style.color = "rgba(245, 245, 245, 0.5)";
  text2.style.color = "rgba(245, 245, 245, 0.5)";
  document.body.style.cursor = "default";
});

text2.addEventListener("mouseenter", () => {
  icon2.style.color = "white";
  text2.style.color = "white";
  document.body.style.cursor = "pointer";
});

text2.addEventListener("mouseleave", () => {
  icon2.style.color = "rgba(245, 245, 245, 0.5)";
  text2.style.color = "rgba(245, 245, 245, 0.5)";
  document.body.style.cursor = "default";
});


