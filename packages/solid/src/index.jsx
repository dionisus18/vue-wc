// import { createSignal } from "solid-js";
import { customElement } from "solid-element";
import "wc-spinners";

const style = `.spinner-container {
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: rbga(50, 50, 50, 0.2);
  z-index: 1001;
}`;

customElement("my-counter", { type: "bar" }, (props, { element }) => {
  // const [count, setCount] = createSignal(0);
  return (
    <>
      <style>{style}</style>
      <div class="spinner-container">
        {props.type
          ? document.createElement(`${props.type}-spinner`)
          : document.createElement(`bar-spinner`)}
      </div>
    </>
  );
});
