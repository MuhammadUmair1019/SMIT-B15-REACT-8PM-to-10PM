function ProductInfo(props) {
  const { product, isAboveAvg } = props;
  return (
    <div>
      <h1>{product.name}</h1>
      <h3>{product.price}</h3>
      <h3>{product.status ? "Available" : "Not Available"}</h3>
      <h3> {isAboveAvg ? "Above" : "Below"}</h3>
      <hr />
    </div>
  );
}

export default ProductInfo;
