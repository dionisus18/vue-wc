// import { createSignal } from "solid-js";
import { customElement } from "solid-element";
import { createMemo, createSignal, createEffect } from "solid-js";
import { template } from "solid-js/web";
function readMore(props) {
  const [readMore, setReadMore] = createSignal(false);
  console.log(props);
  const LocalTemplate = createMemo(() =>
    template(readMore() ? props?.text : props.text.slice(0, props["max-len"]))
  );
  createEffect(() => console.log("template", LocalTemplate()));
  return (
    <>
      <LocalTemplate />
      <a href="#" onClick={() => setReadMore(!readMore())}>
        {readMore()
          ? props["read-less"] || "Leer Menos..."
          : props["read-more"] || "Leer Más..."}
      </a>
    </>
  );
}

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

customElement("my-counter", { maxLen: "1" }, (props, { element }) => {
  // const [count, setCount] = createSignal(0);
  console.log("props", { props });
  return (
    <>
      {/* <style>{style}</style> */}
      <div class="spinner-container">{readMore(props)}</div>
    </>
  );
});
