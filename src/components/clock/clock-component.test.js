import "./clock-component";

const CLOCK_COMPONENT_TAG = "clock-component";

describe("The clock component", () => {

    beforeEach(() => {
        givenAClockComponent();
    });

    describe('on creating', () => {
        it('creates the expected DOM structure', () => {
            expect(thenTheClockComponent().outerHTML).toMatchSnapshot();
        });
    });

    // given
    function givenAClockComponent() {
        // clean up
        document.body.innerHTML = '';

        // creates the component with the new greeting value
        const element = document.createElement(CLOCK_COMPONENT_TAG);
        // appends it to the DOM
        document.body.appendChild(element);
    };

    // then
    function thenTheClockComponent() {
        return getClockComponent();
    };

    // helper
    function getClockComponent() {
        return document.querySelector(CLOCK_COMPONENT_TAG);
    };

});