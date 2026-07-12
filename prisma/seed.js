// this file adds the starting products to the database

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  // remove any products already in the database
  await prisma.product.deleteMany();

  // add the starting products
  await prisma.product.createMany({
    data: [
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
    ]
  });

  console.log("Database seeded.");
}

main()
  .catch(function (error) {
    console.error(error);
  })
  .finally(async function () {
    await prisma.$disconnect();
  });
