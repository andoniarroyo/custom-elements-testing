const templateString = `
    <style>
        .clock {
          font-size: 250px;
        }
    </style>
    <div class="clock">
      <span id="hours" class="hours"></span>
      <span id="minutes" class="minutes"></span>
      <span id="seconds" class="seconds"></span>
    </div>
`;
const template = document.createElement('template');
template.innerHTML = templateString;

export class ClockComponent extends HTMLElement {
  static tag = "clock-component";

  #shadowRoot = this.attachShadow({ mode: "open" }); // document;

  connectedCallback() {
     this.appendTemplate();
  }

  appendTemplate() {
    let templateContent = template.content.cloneNode(true);
    this.shadowRoot.append(templateContent);
    this.connectClock();
  }

  connectClock() {
    setInterval(() => {
      const newDate = new Date();
      this.#shadowRoot.querySelector("#hours").innerText = newDate.getHours();
      this.#shadowRoot.querySelector("#minutes").innerText = newDate.getMinutes();
      this.#shadowRoot.querySelector("#seconds").innerText = newDate.getSeconds();
    }, 1000);
  }

}

customElements.define(ClockComponent.tag, ClockComponent);