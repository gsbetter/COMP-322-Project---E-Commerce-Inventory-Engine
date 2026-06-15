// Products for the beauty supply inventory
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
    name: "Pink Bonnet",
    category: "Accessories",
    quantity: 20,
    price: 9.99
  }
];

// Get elements from the HTML page
const productForm = document.getElementById("product-form");
const productName = document.getElementById("product-name");
const productCategory = document.getElementById("product-category");
const productQuantity = document.getElementById("product-quantity");
const productPrice = document.getElementById("product-price");
const inventoryBody = document.getElementById("inventory-body");

const totalProducts = document.getElementById("total-products");
const totalItems = document.getElementById("total-items");
const totalValue = document.getElementById("total-value");

// Load saved products when the page opens
function loadProducts() {
  const savedProducts = localStorage.getItem("gbeautyProducts");

  if (savedProducts) {
    products = JSON.parse(savedProducts);
  }
}

// Save products to localStorage
function saveProducts() {
  localStorage.setItem("gbeautyProducts", JSON.stringify(products));
}

// Display products in the table
function displayProducts() {
  inventoryBody.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.quantity}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td><button class="delete-btn" onclick="deleteProduct(${i})">Delete</button></td>
    `;

    inventoryBody.appendChild(row);
  }

  updateSummary();
}

// Update the inventory numbers
function updateSummary() {
  let itemCount = 0;
  let inventoryValue = 0;

  for (let i = 0; i < products.length; i++) {
    itemCount += products[i].quantity;
    inventoryValue += products[i].quantity * products[i].price;
  }

  totalProducts.textContent = products.length;
  totalItems.textContent = itemCount;
  totalValue.textContent = "$" + inventoryValue.toFixed(2);
}

// Add a new product from the form
productForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const newProduct = {
    name: productName.value,
    category: productCategory.value,
    quantity: Number(productQuantity.value),
    price: Number(productPrice.value)
  };

  products.push(newProduct);

  saveProducts();
  displayProducts();

  productForm.reset();
});

// Delete a product by its position in the array
function deleteProduct(index) {
  products.splice(index, 1);

  saveProducts();
  displayProducts();
}

// Start the page
loadProducts();
displayProducts();
