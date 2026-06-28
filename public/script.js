// products for beauty supply inventory

let products = [];

const productForm = document.getElementById("product-form");
const inventoryBody = document.getElementById("inventory-body");

const totalProducts = document.getElementById("total-products");
const totalItems = document.getElementById("total-items");
const totalValue = document.getElementById("total-value");

// load products from server
function loadProducts() {

  fetch("/api/products")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      products = data;

      displayProducts();
    })
    .catch(function (error) {
      console.log(error);
    });

}

// display products
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
      <td>
        <button onclick="deleteProduct(${product.id})">
          Delete
        </button>
      </td>
    `;

    inventoryBody.appendChild(row);
  }

  updateSummary();
}

// update summary
function updateSummary() {

  let itemCount = 0;
  let inventoryValue = 0;

  for (let i = 0; i < products.length; i++) {

    itemCount += products[i].quantity;

    inventoryValue +=
      products[i].quantity *
      products[i].price;
  }

  totalProducts.textContent = products.length;
  totalItems.textContent = itemCount;
  totalValue.textContent =
    "$" + inventoryValue.toFixed(2);
}

//add product
productForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const newProduct = {
    name: document.getElementById("product-name").value,
    category: document.getElementById("product-category").value,
    quantity: document.getElementById("product-quantity").value,
    price: document.getElementById("product-price").value
  };

  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct)
  })
    .then(function () {

      productForm.reset();

      loadProducts();
    });

});

// delete product
function deleteProduct(id) {

  fetch("/api/products/" + id, {
    method: "DELETE"
  })
    .then(function () {

      loadProducts();
    });

}

// start page
loadProducts();
