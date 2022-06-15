import { createMemo, createSignal, createEffect } from "solid-js";
import { template } from "solid-js/web";
function readMore(props) {
  const [readMore, setReadMore] = createSignal(false);
  console.log(props);
  const LocalTemplate = createMemo(() =>
    template(readMore() ? props.text : props.text.slice(0, props["max-len"]))
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
export default readMore;
