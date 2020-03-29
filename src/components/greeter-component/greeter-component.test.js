import { Window } from 'happy-dom';
import { GreeterComponent } from "./greeter-component";

const window = new Window();
const document = window.document;

const greeterComponentTag = "greeter-component";
window.customElements.define(greeterComponentTag, GreeterComponent);

describe("The greeter component", () => {
    let element, shadowRoot;
    beforeEach(() => {
        element = document.createElement(greeterComponentTag);
        shadowRoot = element.shadowRoot;
        document.body.appendChild(element);
    });
    
    // A visual component should only deal with:
    // 1 - Create a visual representation of the model
    // 2 - Interact with the user 
    // 3 - Notify to the outside world what relevant actions heppened
    // 
    // I'm interested on check three aspects of the components:
    // 1- DOM generation (it is private)
    // 2- The bindings are properly connected
    // 3- The proper events are raised on the right interactions
    //
    // Everything ending up with a change in the DOM could be covered with snapshot/s
    // To check the events we should create specific tests
    
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