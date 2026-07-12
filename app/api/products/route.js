// this file handles getting/adding products

import prisma from "../../../lib/prisma";

// get all products from the database
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc"
      }
    });

    return Response.json(products);
  } catch (error) {
    return Response.json(
      {
        error: "Could not get products"
      },
      {
        status: 500
      }
    );
  }
}

// add a new product to the database
export async function POST(request) {
  try {
    const productData = await request.json();

    const name = productData.name;
    const category = productData.category;
    const quantity = Number(productData.quantity);
    const price = Number(productData.price);

    // make sure the product information is valid
    if (!name || !category || quantity <= 0 || price < 0) {
      return Response.json(
        {
          error: "Please enter valid product information"
        },
        {
          status: 400
        }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        category: category,
        quantity: quantity,
        price: price
      }
    });

    return Response.json(newProduct, {
      status: 201
    });
  } catch (error) {
    return Response.json(
      {
        error: "Could not add product"
      },
      {
        status: 400
      }
    );
  }
}
