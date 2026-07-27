"use client";

// this component displays beauty products from the external API

export default function ProductSuggestions({ suggestions }) {
  return (
    <section className="card">
      <h2>Recommended Beauty Products</h2>

      {suggestions.length === 0 ? (
        <p>No suggestions available.</p>
      ) : (
        <ul>
          {suggestions.map(function (product) {
            return (
              <li key={product.id}>
                <strong>{product.name}</strong>
                <br />
                Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                <br />
                Price: ${product.price}
                <br />
                Stock: {product.stock}
                <br />
                {product.alreadyInInventory
                  ? "Already in inventory"
                  : "Not in inventory"}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
