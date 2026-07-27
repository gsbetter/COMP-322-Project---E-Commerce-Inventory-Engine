// this route gets beauty products from an outside API and compares them to products already in the database

import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    // get the products currently stored in Neon
    const inventoryProducts = await prisma.product.findMany();

    // get beauty products from the external DummyJSON API
    const response = await fetch(
      "https://dummyjson.com/products/category/beauty?limit=5",
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error("Could not get external products");
    }

    const externalData = await response.json();

    // compare each outside product with our inventory
    const suggestions = externalData.products.map(function (product) {
      const matchingProduct = inventoryProducts.find(function (inventoryItem) {
        return (
          inventoryItem.name.toLowerCase() ===
          product.title.toLowerCase()
        );
      });

      return {
        id: product.id,
        name: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: product.thumbnail,
        alreadyInInventory: Boolean(matchingProduct)
      };
    });

    return Response.json(suggestions);
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Could not load product suggestions"
      },
      {
        status: 500
      }
    );
  }
}
