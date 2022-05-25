import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>Prueba de cambios de text de SVG</h1>
  <object type="image/svg+xml" data="svg/ods1v1.svg"></object>
`;
const obj = document.querySelector("object");
obj.addEventListener("load", () => {
  const svgElement = obj.contentDocument.querySelector("svg text");
  console.log(obj.contentDocument, svgElement);
  svgElement.innerHTML = 'FIM <tspan x="0" y="180">DA POBREZA</tspan>';
});
