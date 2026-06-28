// this file creates the Express server

const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

// allow server to read JSON data
app.use(express.json());

// serve files from public folder
app.use(express.static(path.join(__dirname, "public")));

// get all products from the database
app.get("/api/products", async function (req, res) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc"
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Could not get products"
    });
  }
});

// post a new product to the database
app.post("/api/products", async function (req, res) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        category: req.body.category,
        quantity: Number(req.body.quantity),
        price: Number(req.body.price)
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({
      error: "Could not add product"
    });
  }
});

// delete a product from the database
app.delete("/api/products/:id", async function (req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({
      where: {
        id: id
      }
    });

    res.json({
      message: "Product deleted"
    });
  } catch (error) {
    res.status(404).json({
      error: "Product not found"
    });
  }
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
