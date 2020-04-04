import "./greeter-component";

const GREETER_COMPONENT_TAG = "greeter-component";
const GREETING_VALUE = "dummy-test";

describe("The greeter component", () => {

    beforeEach(() => {
        givenAGreeterComponent(GREETING_VALUE);
    });

    describe('on creating', () => {
        it('creates the expected DOM structure', () => {
            // binding of the name to greete (attr -> memory -> DOM)
            expect(thenTheGreeterComponent().outerHTML).toMatchSnapshot();
        });
    });

    describe('notifying events', () => {
        it('raises a greetingNoticed event on changing the name to greete', () => {
            let raisedEvent;
            givenAGreeterComponentSubscription("greetingNoticed", event => raisedEvent = event);
            whenNoticeButtonIsClicked();

            expect(raisedEvent).toBeTruthy();
            expect(raisedEvent.detail).toBeTruthy();
            expect(raisedEvent.detail.noticedName).toBe(GREETING_VALUE);
        });
    });

    // given
    function givenAGreeterComponent(newGreetingValue) {
        // clean up
        document.body.innerHTML = '';

        // creates the component with the new greeting value
        const element = document.createElement(GREETER_COMPONENT_TAG);
        // appends it to the DOM
        document.body.appendChild(element);

        // set up the new value for the name to greete
        element.setAttribute("name-to-greete", newGreetingValue);
    };

    function givenAGreeterComponentSubscription(eventType, callback) {
        thenTheGreeterComponent().addEventListener(eventType, callback);
    };

    // when
    function whenNoticeButtonIsClicked() {
        document.querySelector("#notice-button").click();
    };

    // then
    function thenTheGreeterComponent() {
        return document.querySelector(GREETER_COMPONENT_TAG);
    };

});