import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./landingPage.css";
import { add, update, deleteCart } from "../redux/cartSlice";
import { fetchProducts } from "../redux/productSlice";

function LandingPage() {
  const [id, setId] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [del, setDel] = useState("");

  const dispatch = useDispatch();
  const list = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.users.carts);
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
    // if (input === "") {
    //   alert("Please Type Something...");
    //   document.getElementById("input").focus();
    // } else {
    // Call dispatch and pass add todo started method
    // dispatch(add_todo_started());
    fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // id: id,
        // quantity: quantity,
        userId: 1,
        products: [
          {
            id: id,
            quantity: quantity,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((val) => {
        // Call dispatch and pass add todo success
        console.log("ADD", val);
        dispatch(dispatch(add(val)));
      })
      .catch((err) => {
        // Call dispatch and pass add todo failure
        // dispatch(add_todo_failure(err.message));
      });

    // setInput("");
    // }

    let obj = {
      id: id,
      quantity: quantity,
    };
    dispatch(add(obj));
  };

  const deleteCartHandler = () => {
    dispatch(deleteCart());
    fetch("https://dummyjson.com/carts/1")
      .then((response) => response.json())
      .then((val) => {
        console.log(val);
        alert(JSON.stringify(val));
        setDel(val);
      });
  };

  const updateHandler = () => {
    dispatch(update());
    fetch("https://dummyjson.com/carts/1")
      .then((response) => response.json())
      .then((val) => {
        console.log(val);
        alert(JSON.stringify(val));
        setDel(val);
      });
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
                        <tbody key={val.id}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{val.title}</td>
                            <td>{val.quantity}</td>
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
