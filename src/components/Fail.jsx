function Fail({ name = "Unkown", color = "red", marks }) {
  return (
    <div>
      {marks === undefined ? (
        <h1>Marks are not uploaded yet!</h1>
      ) : (
        <div>
          <h1 style={{ color: color }}>Fail!</h1>
          <p>
            Mr/Mrs {name} your marks are {marks}{" "}
          </p>
        </div>
      )}
    </div>
  );
}

// function Fail({ name = "Unkown", color = "red", marks }) {

//   if (marks === undefined) {
//     return <h1>Marks are not uploaded yet!</h1>;
//   }

//   return (
//     <div>
//       <h1 style={{ color: color }}>Fail!</h1>
//       <p>
//         Mr/Mrs {name} your marks are {marks}{" "}
//       </p>
//     </div>
//   );
// }

export default Fail;
