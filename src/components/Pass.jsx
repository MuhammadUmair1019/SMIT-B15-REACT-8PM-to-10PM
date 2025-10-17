function Pass({ name = "Unkown", color = "green", marks }) {
  return (
    <div>
      <h1 style={{ color: color }}>Pass!</h1>
      <p>
        Mr/Mrs {name} your marks are {marks}{" "}
      </p>
    </div>
  );
}

export default Pass;
