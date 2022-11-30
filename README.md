# Development

### Deployed Website: https://happykoala222.github.io/development/

### Goal and Value of the Application
The goal of this application was to practice developing iteractive interfaces that tie components to an internal data state. Users can browse this web application like any other shopping site, and use the filters and sorting to pick out rings they would like to add to their cart. The filters and sorting add value to the user by providing fine tuned results.

### Usability Principles Considered
When thinking about usability, I tried by best to apply hierarchy and visual design principles learned in class (ex: keeping spacing consistent on side navigation, and using a consistent color scheme.) I also chose to keep the cards consistent to help with learnability.

### Organization of Components
My components are organized into a main App component, a RingItem component, and a CartAggregator component (with mini checkbox and radio components declared in App.js). The App component contains the layout of the page and passes the ring data to the RingItem component. The App component also maintains the active filters that have been applied.

### How Data is Passed Down Through Components
The RingItem component takes in a ring item objet, the global cartItems state variable, and the global cartItem setter as props. 
The CartAggregator component also takes in the global cartItems state variables as a prop and calculates + displays the cart total.

### How the User Triggers State Changes
One way that the user can trigger state changes is by checking or unchecking filters. Another way is by adding/removing items from the shopping cart, and by pressing the reset button.

