import { useCallback, useState } from "react";
import {
  Gamepad2,
  Headset,
  Joystick,
  Monitor,
  Package,
  Trophy,
  CircleDot,
} from "lucide-react";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";

const filters = [
  { label: "All", icon: Package },
  { label: "GTA VI", icon: Trophy },
  { label: "PS5 Console", icon: Gamepad2 },
  { label: "Xbox Console", icon: CircleDot },
  { label: "VR", icon: Headset },
  { label: "Racing Wheel", icon: Joystick },
  { label: "Big Screen Gaming", icon: Monitor },
  { label: "PS5 Games", icon: Trophy },
];

function ProductGrid({
  products,
  wishlist,
  onToggleWishlist,
  onConfirmRental,
  searchTerm,
  onClearSearch,
  selectedCategory,
  setSelectedCategory,
  startDate,
  endDate,
  datesConfirmed,
  rentalDays,
}) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);
  const quickViewLiked = quickViewProduct
    ? wishlist.some((item) => item.id === quickViewProduct.id)
    : false;

  return (
    <>
    <section className="products-section" id="gaming">
      <div className="products-heading">
        <div>
          <p className="section-label">OUR COLLECTION</p>
          <h2>{searchTerm ? `Search Results for “${searchTerm}”` : "Gaming Products"}</h2>
        </div>
        <span className="product-count">
          {products.length} {products.length === 1 ? "product" : "products"} found
        </span>
      </div>

      <div className="product-browser">
        <aside className="gaming-sidebar" aria-label="Gaming product categories">
          <h3>Gaming categories</h3>
          <div className="gaming-sidebar-list">
            {filters.map(({ label, icon: Icon }) => (
              <button
                type="button"
                key={label}
                className={selectedCategory === label ? "gaming-filter active" : "gaming-filter"}
                aria-pressed={selectedCategory === label}
                onClick={() => setSelectedCategory(label)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="product-results">
          {products.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon" aria-hidden="true">⌕</div>
              <h3>No products found</h3>
              <p>
                {searchTerm
                  ? `We couldn't find products matching “${searchTerm}”.`
                  : `There are no products in “${selectedCategory}” in the current catalog.`}
              </p>
              <button type="button" onClick={onClearSearch}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  wishlist={wishlist}
                  onToggleWishlist={onToggleWishlist}
                  onConfirmRental={onConfirmRental}
                  onQuickView={setQuickViewProduct}
                  startDate={startDate}
                  endDate={endDate}
                  datesConfirmed={datesConfirmed}
                  rentalDays={rentalDays}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
    {quickViewProduct && (
      <ProductQuickView
        product={quickViewProduct}
        isLiked={quickViewLiked}
        onToggleWishlist={onToggleWishlist}
        onAddToBag={(product) => {
          const added = onConfirmRental(product);
          if (added) closeQuickView();
        }}
        datesConfirmed={datesConfirmed}
        startDate={startDate}
        endDate={endDate}
        rentalDays={rentalDays}
        onClose={closeQuickView}
      />
    )}
    </>
  );
}

export default ProductGrid;
