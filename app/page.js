"use client";

// this is the main page for GBeauty Inventory Manager

import { useEffect, useState } from "react";
import ProductForm from "../components/productform";
import InventorySummary from "../components/InventorySummary";
import ProductList from "../components/ProductList";
import ProductSuggestions from "../components/ProductSuggestions";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("Loading products...");
  const [suggestions, setSuggestions] = useState([]);

  // get products from the database API
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

  // get product suggestions from the external API
  function loadSuggestions() {
    fetch("/api/suggestions")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Could not load suggestions");
        }

        return response.json();
      })
      .then(function (data) {
        setSuggestions(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // load products and suggestions when the page first opens
  useEffect(function () {
    loadProducts();
    loadSuggestions();
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

        <ProductSuggestions suggestions={suggestions} />
      </main>
    </>
  );
}
