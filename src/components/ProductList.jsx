import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Anime Store</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;