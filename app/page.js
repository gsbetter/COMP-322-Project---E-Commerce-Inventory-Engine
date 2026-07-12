"use client";

// this is the main page for GBeauty Inventory Manager

import { useEffect, useState } from "react";
import ProductForm from "../components/productform";
import InventorySummary from "../components/InventorySummary";
import ProductList from "../components/ProductList";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("Loading products...");

  // get products from the API
  function loadProducts() {
    fetch("/api/products")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Could not load products");
        }

        return response.json();
      })
      .then(function (data) {
        setProducts(data);
        setMessage("");
      })
      .catch(function (error) {
        setMessage("Could not load products.");
        console.log(error);
      });
  }

  // load products when the page first opens
  useEffect(function () {
    loadProducts();
  }, []);

  // delete a product using its database id
  function deleteProduct(id) {
    fetch("/api/products/" + id, {
      method: "DELETE"
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Could not delete product");
        }

        return response.json();
      })
      .then(function () {
        loadProducts();
      })
      .catch(function (error) {
        setMessage("Could not delete product.");
        console.log(error);
      });
  }

  return (
    <>
      <header className="site-header">
        <h1>GBeauty Inventory Manager</h1>
        <p>A simple inventory tracker for a beauty supply store.</p>
      </header>

      <main>
        {message && (
          <p className="status-message">{message}</p>
        )}

        <ProductForm onProductAdded={loadProducts} />

        <InventorySummary products={products} />

        <ProductList
          products={products}
          onDelete={deleteProduct}
        />
      </main>
    </>
  );
}
