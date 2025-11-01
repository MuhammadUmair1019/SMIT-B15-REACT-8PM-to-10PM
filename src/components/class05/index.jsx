import { useState } from "react";

function Class05() {
  const [city, setCity] = useState("Karachi");

  const handleChange = (e) => {
    setCity(e.target.value)
  };

  return (
    <>
      <label>Name: </label>
      <input type="text" value={city} onChange={handleChange} />
    </>
  );
}

// let user = {
//   city: "ali",
//   name: "",
// };

// // user.name = "Ahmed"
// user["name"] = "Ahmed";
// user["city"] = "Lahore";

// console.log(user);

// function Class05() {
//   let [user, setUser] = useState({
//     city: "",
//     name: "",
//   });

//   function handleUpdate({ target: { name, value } }) {
//     setUser({ ...user, [name]: value });
//   }

//   return (
//     <>
//       <label>Name: </label>
//       <input
//         type="text"
//         name="name"
//         value={user.name}
//         onChange={handleUpdate}
//       />
//       <br />
//       <br />
//       <label>City: </label>
//       <input
//         type="text"
//         name="city"
//         value={user.city}
//         onChange={handleUpdate}
//       />

//       {user.name && user.city && (
//         <p>
//           City = {user.city} Name = {user.name}
//         </p>
//       )}
//     </>
//   );
// }

// -------------------------------------------------------
// function Class05() {
//   let [user, setUser] = useState({
//     city: "",
//     name: "",
//   });

//   function handleUpdate({ target: { name, value } }) {
//     console.log(name, value);
//     name === "city"
//       ? setUser({ ...user, city: value })
//       : setUser({ ...user, name: value });
//   }

//   return (
//     <>
//       <label>Name: </label>
//       <input
//         type="text"
//         name="name"
//         value={user.name}
//         onChange={handleUpdate}
//       />
//       <br />
//       <br />
//       <label>City: </label>
//       <input
//         type="text"
//         name="city"
//         value={user.city}
//         onChange={handleUpdate}
//       />

//       {user.name && user.city && (
//         <p>
//           City = {user.city} Name = {user.name}
//         </p>
//       )}
//     </>
//   );
// }

// ---------------------------------------------------------
// function Class05() {
//   let [city, setCity] = useState("Karachi");
//   let [name, setName] = useState("Ahmed");

//   function handleUpdate({ target: { name, value } }) {
//     name === "city" ? setCity(value) : setName(value);
//   }

//   //   function handleUpdate({ target: { name, value } }) {
//   //     if (name === "city") {
//   //       setCity(value);
//   //     } else {
//   //       setName(value);
//   //     }
//   //   }

//   return (
//     <>
//       <label>Name: </label>
//       <input type="text" name="name" value={name} onChange={handleUpdate} />
//       <br />
//       <br />
//       <label>City: </label>
//       <input type="text" name="city" value={city} onChange={handleUpdate} />

//       {name && city && (
//         <p>
//           City = {city} Name = {name}
//         </p>
//       )}
//     </>
//   );
// }

// ---------------------------------------------------------
// function Class05() {
//   let [city, setCity] = useState("Karachi");
//   let [name, setName] = useState("Ahmed");

//   function handleUpdate(e) {
//     if (e.target.name === "city") {
//       setCity(e.target.value);
//     } else {
//       setName(e.target.value);
//     }
//   }

//   return (
//     <>
//       <label>Name: </label>
//       <input type="text" name="name" value={name} onChange={handleUpdate} />
//       <br />
//       <br />
//       <label>City: </label>
//       <input type="text" name="city" value={city} onChange={handleUpdate} />

//       {name && city && (
//         <p>
//           City = {city} Name = {name}
//         </p>
//       )}
//     </>
//   );
// }

// -------------------------------------
// function Class05() {
//   let [city, setCity] = useState("Karachi");
//   let [name, setName] = useState("Ahmed");

//   function handleUpdateCity(e) {
//     setCity(e.target.value);
//   }

//   function handleUpdateName(e) {
//     setName(e.target.value);
//   }

//   return (
//     <>
//       <label>Name: </label>
//       <input type="text" value={name} onChange={handleUpdateName} />
//       <br />
//       <br />
//       <label>City: </label>
//       <input type="text" value={city} onChange={handleUpdateCity} />

//       {name && city && (
//         <p>
//           City = {city} Name = {name}
//         </p>
//       )}
//     </>
//   );
// }

export default Class05;
