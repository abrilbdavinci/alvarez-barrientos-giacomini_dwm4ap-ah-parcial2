import { useState } from "react";
import Button from "./Button";

const ProductsContainer = ({ children }) => {
  const [count, setCount] = useState(0);

  const sumarProducto = () => setCount(count + 1);
  const restarProducto = () => setCount(count - 1);

  return (
    <div className="bg-blue">
      <h2>Lista de Productos</h2>
      <p>Carrito {count}</p>
      <hr />

      <Button text="Sumar" handleClick={sumarProducto} />
      <Button text="Restar" color="red" handleClick={restarProducto} />

      <div className="row">{children}</div>
    </div>
  );
};

export default ProductsContainer;
