import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./landingPage.css";
import { add } from "../redux/cartSlice";
import { fetchProducts } from "../redux/productSlice";

function LandingPage() {
  const [id, setId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.data.carts);
  console.log("LIST", list);
  console.log("Products", products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const idHandler = (e) => {
    setId(e.target.value);
  };
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const addToCartHandler = () => {
    let obj = {
      id: id,
      quantity: quantity,
    };
    dispatch(add(obj));
  };
  return (
    <div>
      <section>
        <div className="containerDiv">
          <div>
            <h1>Add To Cart</h1>
            <hr></hr>
          </div>
          <div>
            <span className="inputLabel">Product Id:</span>
            <br></br>
            <input
              onChange={idHandler}
              className="inputBox"
              type={"number"}
              placeholder="Product Id"
            />
            <br></br>
            <span className="inputLabel">Quantity:</span>
            <br></br>
            <input
              onChange={quantityHandler}
              className="inputBox"
              type={"number"}
              placeholder="Quantity"
            />
            <br></br>
            <button onClick={addToCartHandler} className="addCartBtn">
              Add To Cart
            </button>
            <hr></hr>
            <br></br>
          </div>
        </div>
        <div>
          <center>
            {data.map((val) => (
              <div key={val.id}>
                <div>{val.id}</div>
                <div>{val.title}</div>
                <div>{val.quantity}</div>
                <div>{val.price}</div>
              </div>
            ))}
          </center>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
