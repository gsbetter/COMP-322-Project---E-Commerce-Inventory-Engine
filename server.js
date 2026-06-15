// this file creates the Express server

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// allow server to read JSON data
app.use(express.json());

// serve files from public folder
app.use(express.static(path.join(__dirname, "public")));

// product data stored on the server
let products = [
  {
    name: "Edge Control",
    category: "Hair Care",
    quantity: 25,
    price: 6.99
  },
  {
    name: "Hair Growth Oil",
    category: "Hair Care",
    quantity: 15,
    price: 12.99
  },
  {
    name: "Satin Bonnet",
    category: "Accessories",
    quantity: 20,
    price: 9.99
  }
];

// get all products
app.get("/api/products", function (req, res) {
  res.json(products);
});

// post a new product
app.post("/api/products", function (req, res) {
  const newProduct = {
    name: req.body.name,
    category: req.body.category,
    quantity: Number(req.body.quantity),
    price: Number(req.body.price)
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// delete a product
app.delete("/api/products/:index", function (req, res) {
  const index = Number(req.params.index);

  if (index < 0 || index >= products.length) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  products.splice(index, 1);

  res.json({
    message: "Product deleted"
  });
});

// 404 handling
app.use("/api", function (req, res) {
  res.status(404).json({
    error: "Route not found"
  });
});

app.listen(PORT, function () {
  console.log("Server running on http://localhost:3000");
});
