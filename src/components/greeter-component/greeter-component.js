const templateString = `
    <style>
        .greeter-text {
          font-size: 250px;
        }
    </style>
    <div>
      <span class="greeter-text"></span>
      <button id="notice-button">Notice!</button>
    </div>
`;
const template = document.createElement('template');
template.innerHTML = templateString;

export class GreeterComponent extends HTMLElement {
  static nameToGreeteAttributeName = "name-to-greete";
  static tag = "greeter-component";

  static get tag() {
    return tag;
  }

  static get observedAttributes() {
    return [GreeterComponent.nameToGreeteAttributeName];
  }

  #currentName = "...";

  constructor() {
    super();

    this.appendTemplate();
    this.updateGreeterText();
  }

  connectedCallback() {
    this.subscribeToEvents();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.#currentName = this.getAttribute(GreeterComponent.nameToGreeteAttributeName);
    this.updateGreeterText();
  }

  appendTemplate() {
    let templateContent = template.content;
    document.body.appendChild(templateContent);
  }

  updateGreeterText() {
    document.querySelector(".greeter-text").innerHTML = this.#currentName;
  }

  subscribeToEvents() {
    document.querySelector("#notice-button").addEventListener('click', ()=> {
      this.dispatchEvent(
        new CustomEvent("greetingNoticed", { bubles: true, detail: { noticedName: this.#currentName} }))
    });
  }

}

customElements.define("greeter-component", GreeterComponent);