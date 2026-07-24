// this component displays the products in a table

export default function ProductList({ products, onDelete }) {
  return (
    <section className="card">
      <h2>Current Inventory</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(function (product) {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={function () {
                        onDelete(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <p>No products are currently in the inventory.</p>
      )}
    </section>
  );
}
