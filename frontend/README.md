# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


<!-- structuredClone -  -->
<!-- timeStamp = 3:28:00 -->
structuredClone is a built-in JavaScript function that creates a deep copy of a value. It can handle complex data types such as objects, arrays, and even more specialized types like Date, Map, Set, ArrayBuffer, and more.

Basic Example
Here's a simple example demonstrating how structuredClone works:

javascript
Copy code
const original = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "gaming"],
  address: {
    city: "Wonderland",
    zip: "12345"
  }
};

// Create a deep copy of the original object
const clone = structuredClone(original);

// Modify the clone
clone.name = "Bob";
clone.hobbies.push("hiking");
clone.address.city = "Dreamland";

// Check the original object
console.log(original); // { name: "Alice", age: 30, hobbies: ["reading", "gaming"], address: { city: "Wonderland", zip: "12345" } }
console.log(clone);    // { name: "Bob", age: 30, hobbies: ["reading", "gaming", "hiking"], address: { city: "Dreamland", zip: "12345" } }

Key Points
Deep Copy: Unlike Object.assign or the spread operator, which create shallow copies, structuredClone creates a deep copy. This means nested objects and arrays are also cloned, not just their references.
Handling Special Types: structuredClone can correctly clone special JavaScript types, such as:
Date
Map
Set
Blob
ArrayBuffer

Example with Special Types
javascript
Copy code
const date = new Date();
const map = new Map([[1, "one"], [2, "two"]]);
const set = new Set([1, 2, 3]);

const complexData = {
  date,
  map,
  set
};

// Clone the complex object
const clonedData = structuredClone(complexData);

// Modify the clone
clonedData.date.setFullYear(2025);
clonedData.map.set(1, "uno");
clonedData.set.add(4);

// Check the original object
console.log(complexData);
console.log(clonedData);
In this example, changes to the cloned object do not affect the original, illustrating the deep cloning behavior.

Browser Support
structuredClone is widely supported in modern browsers, but be sure to check compatibility if you're targeting older environments.




<!-- Toastify       -->
<!-- timeStamp = 3:36:33  -->

To use Toastify in a React application, you can use the popular react-toastify library, which makes it easy to display toast notifications. Here’s a step-by-step guide to get you started:

Step 1: Install react-toastify
You can install the library using npm or yarn:

bash
Copy code
npm install react-toastify
or

bash
Copy code
yarn add react-toastify
Step 2: Import ToastContainer and Toastify CSS
In your main application file (usually App.js or index.js), import the ToastContainer component and the CSS for styling:

javascript
Copy code
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './App.css'; // Your custom styles

const App = () => {
  return (
    <div>
      <h1>My React App</h1>
      {/* Other components */}
      <ToastContainer />
    </div>
  );
};

export default App;
Step 3: Use Toast Notifications
Now you can trigger toast notifications anywhere in your components. First, import the toast function from react-toastify:

javascript
Copy code
import { toast } from 'react-toastify';
You can then call toast() to show a notification. Here’s an example of a button that triggers a toast when clicked:

javascript
Copy code
const NotifyButton = () => {
  const notify = () => {
    toast("Wow! A simple toast notification!");
  };

  return (
    <button onClick={notify}>Notify Me!</button>
  );
};
Step 4: Customizing Toast Notifications
You can customize the toast notifications with various options. Here’s an example of how to use different types and options:

javascript
Copy code
const NotifyButton = () => {
  const notify = () => {
    toast.success("Success message!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <button onClick={notify}>Notify Me!</button>
  );
};
Step 5: Display Multiple Toasts
You can trigger multiple toasts in a single action:

javascript
Copy code
const NotifyButton = () => {
  const notifyMultiple = () => {
    toast("This is the first toast!");
    toast.success("This is a success toast!");
    toast.error("This is an error toast!");
  };

  return (
    <button onClick={notifyMultiple}>Notify Me!</button>
  );
};
Complete Example
Here’s a complete example with a button to trigger a toast:

javascript
Copy code
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const notify = () => {
    toast("Wow! A simple toast notification!");
  };

  return (
    <div>
      <h1>My React App</h1>
      <button onClick={notify}>Notify Me!</button>
      <ToastContainer />
    </div>
  );
};

export default App;
Conclusion
With these steps, you can easily implement toast notifications in your React application using react-toastify. You can customize the notifications further based on your requirements. Happy coding!




<!-- useNavigate hook -->
<!-- timestamp  4:16:51-->


The useNavigate hook in React Router is used to programmatically navigate between routes in your application. It's a convenient way to change the URL and move users to different pages without relying on link clicks.

Example Usage:
javascript
Copy code
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the "/home" route
    navigate('/home');
  };

  return (
    <button onClick={handleButtonClick}>
      Go to Home
    </button>
  );
}

export default MyComponent;
How It Works:
useNavigate returns a function that allows you to navigate to a different route.
You call the function (like navigate('/home')) with the path you want to go to.
The URL is updated, and React Router switches to the specified route.
Options:
You can also use navigate(-1) to go back in history, similar to the browser’s back button.
You can pass an optional second argument with options like replace: true, which replaces the current route in the history stack rather than pushing a new one.
Example with options:

javascript
Copy code
navigate('/login', { replace: true }); // Replaces current page with login
This is useful when you want more control over navigation, such as after form submissions or custom buttons.