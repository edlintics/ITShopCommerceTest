import React, { Fragment, useEffect } from "react";

import MetaData from "./layout/MetaData"; // library to set title
import Product from "../components/product/Product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";

const Home = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );

  // hook to call the products api
  useEffect(() => {
    // show Error if there is any problem occur
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy best product online"} />
          <h1 id="products_heading">Lastest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
