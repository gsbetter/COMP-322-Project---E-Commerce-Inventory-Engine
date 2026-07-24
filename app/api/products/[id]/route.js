// this file handles deleting one product

import prisma from "../../../../lib/prisma";

// deletes a product using the database id
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const id = Number(params.id);

    await prisma.product.delete({
      where: {
        id: id
      }
    });

    return Response.json({
      message: "Product deleted"
    });
  } catch (error) {
    return Response.json(
      {
        error: "Product not found"
      },
      {
        status: 404
      }
    );
  }
}
