"use client";

// this file contains the add product form

import { useState } from "react";

export default function ProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newProduct = {
      name: name,
      category: category,
      quantity: quantity,
      price: price
    };

    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Could not add product");
        }

        return response.json();
      })
      .then(function () {
        setName("");
        setCategory("");
        setQuantity("");
        setPrice("");
        setMessage("Product added.");

        onProductAdded();
      })
      .catch(function (error) {
        setMessage("Could not add product.");
        console.log(error);
      });
  }

  return (
    <section className="card">
      <h2>Add a Product</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          value={name}
          onChange={function (event) {
            setName(event.target.value);
          }}
          required
        />

        <label htmlFor="product-category">Category</label>
        <input
          type="text"
          id="product-category"
          value={category}
          onChange={function (event) {
            setCategory(event.target.value);
          }}
          required
        />

        <label htmlFor="product-quantity">Quantity</label>
        <input
          type="number"
          id="product-quantity"
          min="1"
          value={quantity}
          onChange={function (event) {
            setQuantity(event.target.value);
          }}
          required
        />

        <label htmlFor="product-price">Price</label>
        <input
          type="number"
          id="product-price"
          min="0"
          step="0.01"
          value={price}
          onChange={function (event) {
            setPrice(event.target.value);
          }}
          required
        />

        <button type="submit">Add Product</button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </section>
  );
}
