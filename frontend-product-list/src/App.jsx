import { useState } from "react";
import productsData from "./data/products";
import { Input, Select, Card } from "antd";
import "./App.css";

const { Option } = Select;

function App() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const cleanText = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Currency formatter for Sri Lanka
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

        {/* SEARCH + SORT (Ant Design) */}
        <div className="controls">
          <Input
            placeholder="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
            placeholder="Sort by price"
          >
            <Option value="">Sort by price</Option>
            <Option value="low">Low to High</Option>
            <Option value="high">High to Low</Option>
          </Select>
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-text">No matching items found</p>
        )}

        <div className="products">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card">
              <strong>{product.name}</strong>
              <p>Price: {formatPrice(product.price)}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
