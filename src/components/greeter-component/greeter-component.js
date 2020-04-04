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

  static get observedAttributes() {
    return [GreeterComponent.nameToGreeteAttributeName];
  }

  #currentName = "...";

  connectedCallback() {
    this.appendTemplate();
    this.subscribeToEvents();
  }

  appendTemplate() {
    let templateContent = template.content.cloneNode(true);
    this.append(templateContent);
  }

  subscribeToEvents() {
    document.querySelector("#notice-button").addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent("greetingNoticed", { bubles: true, detail: { noticedName: this.#currentName} }))
    });
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.#currentName = newVal;
    this.updateGreeterText(newVal);
  }

  updateGreeterText(newGreeterName) {
    document.querySelector(".greeter-text").textContent = newGreeterName;
  }

}

customElements.define("greeter-component", GreeterComponent);