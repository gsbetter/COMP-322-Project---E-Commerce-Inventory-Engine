"use client";

// this page appears when an unexpected error happens

export default function Error({ reset }) {
  return (
    <main>
      <section className="card">
        <h2>Something Went Wrong</h2>
        <p>The inventory could not be displayed.</p>

        <button onClick={function () {
          reset();
        }}>
          Try Again
        </button>
      </section>
    </main>
  );
}
