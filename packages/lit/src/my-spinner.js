import { css, LitElement, LitUnstable } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";
import "wc-spinners";

export class MySpinner extends LitElement {
  static styles = css`
    .spinner-container {
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
    }
  `;

  constructor() {
    super();
    this.disabled = false;
    this.type = "atom";
  }

  static get properties() {
    return {
      disabled: { type: Boolean },
      type: { type: String },
      size: { type: Number },
      height: { type: Number },
      width: { type: Number },
      radius: { type: Number },
      margin: { type: Number },
      duration: { type: Number },
      count: { type: Number },
    };
  }

  render() {
    return html`
        <div class="spinner-container">
            <${unsafeStatic(this.type)}-spinner ${unsafeStatic(this.getAttr())}>
            </${unsafeStatic(this.type)}>
        </div>
    `;
  }

  getAttr() {
    let attr = "";
    this.constructor.elementProperties.forEach((value, key) => {
      if (!value.state && this[key] && value.type === Number) {
        attr += `${key}=${this[key]}`;
      }
    });
    return attr;
  }
}

window.customElements.define("my-spinner", MySpinner);
