import Pass from './components/Pass';
import Fail from './components/Fail'

// component
function App() {
  let marks = 80;

  if (marks > 50) {
    return <Pass />;
  } else {
    return <Fail />;
  }
}

// --------------------------------------

// function sum(a, b) {
//   return a + b;
// }

// function Pass() {
//   return (
//     <div>
//       <h1 style={{ color: "green" }}>Pass!</h1>
//       <p>Your position in class is 3 </p>
//     </div>
//   );
// }

// function Fail() {
//   return (
//     <div>
//       <h1 style={{ color: "red" }}>Fail</h1>
//       <p>Better luck next time :)</p>
//     </div>
//   );
// }
// function App() {
//   let marks = 40;

//   if (marks > 50) {
//     return (
//       <div>
//         <h1 style={{ color: "green" }}>Pass!</h1>
//         <p>Your position in class is 3 </p>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <h1 style={{ color: "red" }}>Fail</h1>
//         <p>Better luck next time :(</p>
//       </div>
//     );
//   }
// }

// -------------------------------
// function App() {
//   let x = 10;

//   return (
//     <div>
//       <h1 style={{ color: "green", backgroundColor: "red" }}>Hello</h1>
//       <h2>x={x + 40}</h2>
//       <h2>sum={sum(10, 20)}</h2>
//     </div>
//   );
// }

// -----------------------
// function App() {
//   return (
//     <div>
//       <h1>Hello, world</h1>
//       <p>
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut
//         quisquam magni ea assumenda fuga ullam beatae, quo praesentium iste, ad
//         tempore inventore consectetur voluptatibus animi obcaecati ducimus
//         voluptatum? Beatae.
//       </p>
//     </div>
//   );
// }

// function App() {
//   return <React.Fragment>
//       <h1>Hello, world</h1>
//       <p>
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut
//         quisquam magni ea assumenda fuga ullam beatae, quo praesentium iste, ad
//         tempore inventore consectetur voluptatibus animi obcaecati ducimus
//         voluptatum? Beatae.
//       </p>
//     </React.Fragment>
// }

// style="color: 'red'; background-color: 'green'";
// JSX
// function App() {
//   return React.createElement("h1", null, "Hello, world")
// }

// function App() {
//   return (
//     <ul>
//       <li>Ali</li>
//       <li>Ahmed</li>
//       {/* <li>Mujtaba</li> */}
//     </ul>
//   )
// }

export default App;
