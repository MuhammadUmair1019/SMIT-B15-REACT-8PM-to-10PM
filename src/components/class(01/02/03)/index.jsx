// ------------------------------------------------------------------------------------
// Tasks:
// 1) Show all products by sorting on price (low high)
// 2) Show only those products whose price is greater than 45000, sorted by price (high to low)
// 3) Show all products after increasing their price by 10%.
// 4) Show all products whose name starts with 'a' or 'A'
// 5) Show top 3 most expensive products
// 6) Show all products with price labeled as (Below average or Above average)

// import ProductInfo from "./components/ProductInfo";
// Show all products with price labeled as (Below average or Above average)
// let products = [
//   {
//     name: "Laptop",
//     price: 8000,
//     status: true,
//   },
//   {
//     name: "Mobile",
//     price: 5000,
//     status: false,
//   },
//   {
//     name: "AirPods",
//     price: 15000,
//     status: true,
//   },
// ];

// function average() {
//   let sum = products.reduce((sum, acc) => sum + acc.price, 0);

//   console.log(sum);

//   return sum / products.length;

//   // let sum = 0;
//   // for (let i = 0; i < products.length; i++) {
//   //   sum += products[i].price;
//   // }
//   // return sum / products.length;
// }

// function App() {
//   console.log(average());
//   let avg = average();
//   return (
//     <div>
//       {products.map((product, index) => (
//         <ProductInfo
//           key={index}
//           product={product}
//           isAboveAvg={product.price > avg}
//         />
//       ))}
//     </div>
//   );
// }

// Show all products after increasing their price by 10%.
// function App() {
//   let products = [
//     {
//       name: "Laptop",
//       price: 8000,
//       status: true,
//     },
//     {
//       name: "Mobile",
//       price: 5000,
//       status: false,
//     },
//     {
//       name: "AirPods",
//       price: 15000,
//       status: true,
//     },
//   ];

//   let modifyProducts = products.filter((product) => product.status);

//   console.log(modifyProducts);

//   return (
//     <div>
//       {products.map((product, index) => (
//         <ProductInfo
//           key={index}
//           product={{ ...product, price: product.price * 1.1 }}
//         />
//       ))}

//       {/* {products
//         .map((product) => ({ ...product, price: product.price * 1.1 }))
//         .map((product, index) => (
//           <ProductInfo key={index} product={product} />
//         ))} */}
//     </div>
//   );
// }

// -----------------------------------
// // show all products based on status
// function App() {
//   let products = [
//     {
//       name: "Laptop",
//       price: 8000,
//       status: true,
//     },
//     {
//       name: "Mobile",
//       price: 5000,
//       status: false,
//     },
//     {
//       name: "AirPods",
//       price: 15000,
//       status: true,
//     },
//   ];

//   // let modifyProducts = products.map((product) => {
//   //   if (product.status) {
//   //     return product;
//   //   }
//   // });

//   let modifyProducts = products.filter((product) => product.status);

//   console.log(modifyProducts);

//   return (
//     <div>
//       {products
//         .filter((product) => product.status)
//         .map((p, index) => (
//           <div key={index}>
//             <h1>{p.name}</h1>
//             <h3>{p.price}</h3>
//             <h3>{p.status ? "Available" : "Not Available"}</h3>
//             <hr />
//           </div>
//         ))}
//     </div>
//     // <div>
//     //   {products.map((product, index) => {
//     //     if (product.status) {
//     //       return (
//     //         <div key={index}>
//     //           <h1>{product.name}</h1>
//     //           <h3>{product.price}</h3>
//     //           <h3>{product.status ? "Available" : "Not Available"}</h3>
//     //           <hr />
//     //         </div>
//     //       );
//     //     }
//     //   })}
//     // </div>
//   );
// }

// show all products
// function App() {
//   let products = [
//     {
//       name: "Laptop",
//       price: 8000,
//       status: true,
//     },
//     {
//       name: "Mobile",
//       price: 5000,
//       status: false,
//     },
//     {
//       name: "AirPods",
//       price: 15000,
//       status: true,
//     },
//   ];

//   return (
//     <div>
//       {products.map((product, index) => (
//         <div key={index}>
//           <h1>{product.name}</h1>
//           <h3>{product.price}</h3>
//           <h3>{product.status ? "Available" : "Not Available"}</h3>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }

// string, boolean
// function App() {
//   let names = ["Ahmed", "Ali"];
//   let statuses = [true, false];

//   return (
//     <div>
//       {names.map((m) => (
//         <h3>{m}</h3>
//       ))}
//       {true}

//       {statuses.map((status) => (
//         <h3>{status === true ? " " : "Not Available"}</h3>
//       ))}
//     </div>
//   );
// }

export default App;

// numbers
// function App() {
//   let marks = [10, 50];

//   // marks.map(m => any expression)
//   let modifiedMarks = marks.map((m) => m + 10);
//   console.log(modifiedMarks);

//   let array = [<h3>{marks[0]}</h3>, <h3>{marks[1]}</h3>];

//   return (
//     <div>
//       {marks.map((m) => (
//         <h3>{m}</h3>
//       ))}

//       {/* <h4>{marks[0]}</h4>
//       <h4>{marks[1]}</h4>
//       <h4>{marks[2]}</h4>
//       <h4>{marks[3]}</h4>
//       <h4>{marks[4]}</h4> */}
//     </div>
//   );
// }

// export default App;

// ---------------------------------------------------------------
// import Result from "./components/Result";

// function App() {
//   let students = [
//     {
//       name: "Ahmed",
//       marks: 60,
//       color: "green",
//     },
//     {
//       name: "Ali",
//       marks: 40,
//       color: "blue",
//     },
//     {
//       name: "Zubair",
//       marks: 30,
//       color: "red",
//     },
//     {
//       name: "Mujtaba",
//       marks: 80,
//       color: "green",
//     },
//   ];

//   return (
//     <>
//       {students.map((student, index) => (
//         <Result
//           key={index}
//           marks={student.marks}
//           color={student.color}
//           name={student.name}
//         />
//       ))}
//     </>
//   );
// }

// export default App;
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

// export default App;

// Shoiab
// Abdul Rehman
// Mubashir
// Shariq
// Khizar
// Baeed
