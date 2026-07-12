// this displays the inventory totals

export default function InventorySummary({ products }) {
  let totalItems = 0;
  let totalValue = 0;

  for (let i = 0; i < products.length; i++) {
    totalItems += products[i].quantity;
    totalValue += products[i].quantity * products[i].price;
  }

  return (
    <section className="card">
      <h2>Inventory Summary</h2>

      <div className="summary-grid">
        <article>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </article>

        <article>
          <h3>Total Items</h3>
          <p>{totalItems}</p>
        </article>

        <article>
          <h3>Total Value</h3>
          <p>${totalValue.toFixed(2)}</p>
        </article>
      </div>
    </section>
  );
}
