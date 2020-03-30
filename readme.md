


## Motivation

Custom elements (and friends) are here, and this repository is a place to experiment about how to test them. I created a component to let me play with some basic functionalities.

The test framework is Jest because it is the one I'd like to use in most of my projects.

The visual component should only deal with:

 1. Create a visual representation of the model
 2. Interact with the user
 3. Notify to the outside world what relevant actions happened

I'm interested in check three aspects of the components:

 1. DOM generation ( assuming it is private)
 2. The bindings are correctly set up and connected
 3. The events are raised on the right interactions

Everything ending up with a change in the DOM could be covered with snapshot/s.

To check the events, we should create specific tests.

To run the project:

 - Install the dependencies

    ```npm i```

 - Run the tests

    ```npm t```

 - To update the already generated snapshots:

     ```npm run test:update```

I'll evolve the repository with new interactions and use cases.

Any feedback is welcome.
