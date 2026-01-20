import { useState } from "react";
import productsData from "./data/products";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const cleanText = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]/g, "");

  // ✅ Currency formatter for Sri Lanka
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price);

  let filteredProducts = productsData.filter((product) =>
    cleanText(product.name).includes(cleanText(search))
  );

  if (sortOrder === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOrder === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="title">Product List</h2>

        {/* SEARCH + SORT */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-text">No matching items found</p>
        )}

        <div className="products">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <strong>{product.name}</strong>
              <p>Price: {formatPrice(product.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
