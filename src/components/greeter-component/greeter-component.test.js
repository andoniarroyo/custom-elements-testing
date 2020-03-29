import { Window } from 'happy-dom';
import { GreeterComponent } from "./greeter-component";

const window = new Window();
const document = window.document;

const greeterComponentTag = "greeter-component";
window.customElements.define(greeterComponentTag, GreeterComponent);

describe("The greeter component", () => {
    let element;
    
    beforeEach(() => {
        element = document.createElement(greeterComponentTag);
        document.body.appendChild(element);
    });
    
    describe('on creating', () => {
        it('creates the expected DOM structure', () => {
            // binding of the name to greete (attr -> memory -> DOM)
            const newGreetingValue = "Mr test";
            element.setAttribute("name-to-greete", newGreetingValue);
            expect(document.documentElement.innerHTML).toMatchSnapshot();
        });
    });

    describe('notifying to the outer scope', () => {
        it('on greeting noticed the event is raised including the name of the moment', () => {
            element.addEventListener("greetingNoticed", (payload) => {
                expect(payload).toBeTruthy();
                expect(payload.detail).toBeTruthy();
                expect(payload.detail.noticedName).toBe(newGreetingValue);
            });      

            const newGreetingValue = "Mr test";
            element.setAttribute("name-to-greete", newGreetingValue);
            document.querySelector("#notice-button").click();
        })
    })

})