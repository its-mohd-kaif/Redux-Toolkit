import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./landingPage.css";
import { fetchProducts } from "../redux/reduxSlice";
import { addProducts } from "../redux/reduxSlice";
import { updateProducts } from "../redux/reduxSlice";
import { deleteProducts } from "../redux/reduxSlice";

function LandingPage() {
  // UseState For Input Values
  const [id, setId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  // UseState For Alert Message
  const [success, setSuccess] = useState("hideSuccess");
  const [error, setError] = useState("hideError");
  // UseDispatch
  const dispatch = useDispatch();
  // UseSelect For State Value
  const products = useSelector((state) => state.product.items.carts);
  const deleteProduct = useSelector((state) => state.product);
  const updateProduct = useSelector((state) => state.product.values);
  const addProduct = useSelector((state) => state.product);

  useEffect(() => {
    // /dispatch Action
    dispatch(fetchProducts());
    dispatch(deleteProducts());
    dispatch(updateProducts());
  }, []);

  //Id Input Box Handler
  const idHandler = (e) => {
    setId(e.target.value);
  };
  // Quantity Input Box Handler
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };
  // Add To Cart Function
  const addToCartHandler = () => {
    dispatch(addProducts({ id: id, quantity: quantity }));
    // Check Validation
    if (addProduct.error !== "" || id === 0 || quantity === 0) {
      setSuccess("hideSuccess");
      setError("visibleError");
    } else if (addProduct.error === "" && (id !== 0 || quantity !== 0)) {
      setSuccess("visibleSuccess");
      setError("hideError");
    }
  };
  // Delete Cart Function
  const deleteCartHandler = () => {
    alert(JSON.stringify(deleteProduct.remove));
  };
  // Update Cart Function
  const updateHandler = () => {
    alert(JSON.stringify(updateProduct));
  };
  // Popup Alert Hide Function
  const hidePopupSuccess = () => {
    setSuccess("hideSuccess");
  };
  // Popup Alert Hide Function
  const hidePopupError = () => {
    setError("hideError");
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
            <div className="alertMessage">
              <div className={success}>
                <div className="success">
                  <span className="closebtn" onClick={hidePopupSuccess}>
                    &times;
                  </span>
                  <strong>Success!</strong> items added successfully
                </div>
              </div>
              <div className={error}>
                <div className="error">
                  <span className="closebtn" onClick={hidePopupError}>
                    &times;
                  </span>
                  <strong>Error!</strong> Error in adding to cart
                </div>
              </div>
            </div>
          </div>
          <div>
            <center>
              <div>
                <h1>Shoping Cart</h1>
                <hr></hr>
                <button onClick={deleteCartHandler} className="deleteBtn">
                  Delete Cart
                </button>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Action</th>
                    <th>Price</th>
                  </tr>
                </thead>

                {products
                  ? products[0].products.map((val, index) => (
                      <>
                        <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{val.title}</td>
                            <td>
                              <input value={val.quantity} />
                            </td>
                            <td>
                              <button
                                onClick={updateHandler}
                                className="updateBtn"
                              >
                                Update
                              </button>
                            </td>
                            <td>{val.price}</td>
                          </tr>
                        </tbody>
                      </>
                    ))
                  : null}
              </table>
            </center>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
