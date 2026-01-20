import { useState } from 'react';
import products from './data/products';

function App() {
  const [searchText, setSearchText] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Product List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search product"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {/* Results */}
      {searchText === '' ? null : filteredProducts.length === 0 ? (
        <p>No matching items found</p>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '12px',
              marginBottom: '10px',
              borderRadius: '4px',
            }}
          >
            <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
