import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./landingPage.css";
import { add, update, deleteCart } from "../redux/cartSlice";
import { fetchProducts } from "../redux/productSlice";
import { deleteProducts } from "../redux/deleteSlice";
import { updateProducts } from "../redux/updateSlice";
import { addProducts } from "../redux/addSlice";

function LandingPage() {
  const [id, setId] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [del, setDel] = useState("");

  const dispatch = useDispatch();
  const list = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.users.carts);
  const deleteProduct = useSelector((state) => state.delete);
  const updateProduct = useSelector((state) => state.update);
  const addProduct = useSelector((state) => state.add);
  console.log("LIST", list);
  // console.log("Products", products);

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
    // fetch("https://dummyjson.com/carts/add", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     userId: 1,
    //     products: [
    //       {
    //         id: id,
    //         quantity: quantity,
    //       },
    //     ],
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((val) => {
    //     console.log("ADD", val);
    //     dispatch(dispatch(add(val)));
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    let obj = {
      id: id,
      quantity: quantity,
    };
    dispatch(addProducts(id,quantity));
    console.log("ADD PRODUCT", addProduct);
  };

  const deleteCartHandler = () => {
    dispatch(deleteProducts());
    console.log("Delete Product", deleteProduct);
  };

  const updateHandler = () => {
    let obj = {
      id: id,
      quantity: quantity,
    };
    dispatch(updateProducts(obj));
    console.log("Update", updateProduct);
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
                            <td><input value={val.quantity}/></td>
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
