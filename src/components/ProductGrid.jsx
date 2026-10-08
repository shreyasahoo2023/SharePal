import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  wishlist,
  onToggleWishlist,
  onConfirmRental,
  searchTerm,
  onClearSearch,
}) {
  return (
    <section
      className="products-section"
      id="gaming"
    >
      <div className="products-heading">
        <div>
          <p className="section-label">
            OUR COLLECTION
          </p>

          <h2>
            {searchTerm
              ? `Search Results for "${searchTerm}"`
              : "Gaming Products"}
          </h2>
        </div>

        <span className="product-count">
          {products.length}{" "}
          {products.length === 1
            ? "product"
            : "products"}{" "}
          found
        </span>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <div className="no-products-icon">
            🔍
          </div>

          <h3>
            No products found
          </h3>

          <p>
            We couldn't find anything matching
            "{searchTerm}".
          </p>

          <button
            type="button"
            onClick={onClearSearch}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              onToggleWishlist={
                onToggleWishlist
              }
              onConfirmRental={
                onConfirmRental
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;