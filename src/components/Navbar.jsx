import { useEffect, useRef, useState } from "react";

import {
  Search,
  Heart,
  ShoppingBag,
  MapPin,
  Menu,
  X,
  User,
  Trash2,
} from "lucide-react";

function Navbar({
  searchTerm,
  setSearchTerm,
  wishlist,
  onRemoveWishlist,
  rentals,
  onRemoveRental,
  onLogin,
}) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [wishlistOpen, setWishlistOpen] =
    useState(false);

  const [bagOpen, setBagOpen] =
    useState(false);

  const popupRef = useRef(null);

  const rentalCount = rentals?.length || 0;

  const bagTotal =
    rentals?.reduce(
      (total, rental) =>
        total + rental.totalPrice,
      0
    ) || 0;

  /*
   * Close popup when clicking outside
   */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(
          event.target
        )
      ) {
        setWishlistOpen(false);
        setBagOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
   * Escape key closes menus/popups
   */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setWishlistOpen(false);
        setBagOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const handleWishlist = () => {
    setWishlistOpen(
      (current) => !current
    );

    setBagOpen(false);
  };

  const handleBag = () => {
    setBagOpen(
      (current) => !current
    );

    setWishlistOpen(false);
  };

  const closePopups = () => {
    setWishlistOpen(false);
    setBagOpen(false);
  };

  const scrollToGaming = () => {
    closePopups();

    document
      .getElementById("gaming")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleMobileLink = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            SharePal
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="#location">
              <MapPin size={17} />
              Bangalore
            </a>

            <a href="#gaming">
              Gaming
            </a>

            <a href="#categories">
              Categories
            </a>

            <a href="#faq">
              FAQs
            </a>
          </nav>

          {/* Search */}
          <div className="navbar-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search gaming products"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              aria-label="Search gaming products"
            />

            {searchTerm && (
              <button
                type="button"
                className="search-clear-button"
                onClick={() =>
                  setSearchTerm("")
                }
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            {/* Wishlist */}
            <button
              type="button"
              className={`icon-button ${
                wishlistOpen
                  ? "active"
                  : ""
              }`}
              aria-label="Wishlist"
              onClick={handleWishlist}
            >
              <Heart
                size={21}
                fill={
                  wishlistOpen
                    ? "currentColor"
                    : "none"
                }
              />

              {wishlist.length > 0 && (
                <span className="navbar-count">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              type="button"
              className={`icon-button ${
                bagOpen ? "active" : ""
              }`}
              aria-label="Shopping bag"
              onClick={handleBag}
            >
              <ShoppingBag size={21} />

              {rentalCount > 0 && (
                <span className="navbar-count">
                  {rentalCount}
                </span>
              )}
            </button>

            {/* Login */}
            <button
              type="button"
              className="login-button"
              onClick={onLogin}
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => {
              setMenuOpen(
                (current) => !current
              );

              closePopups();
            }}
            aria-label="Open menu"
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </header>

      {/* Popup Container */}
      <div ref={popupRef}>
        {/* Wishlist Popup */}
        {wishlistOpen && (
          <div className="navbar-popup">
            <div className="navbar-popup-header">
              <h3>
                Wishlist
                {wishlist.length > 0 &&
                  ` (${wishlist.length})`}
              </h3>

              <button
                type="button"
                onClick={() =>
                  setWishlistOpen(false)
                }
                aria-label="Close wishlist"
              >
                <X size={18} />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="navbar-popup-empty">
                <Heart size={32} />

                <h4>
                  Your wishlist is empty
                </h4>

                <p>
                  Add your favourite gaming
                  products to your wishlist.
                </p>

                <button
                  type="button"
                  onClick={
                    scrollToGaming
                  }
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="wishlist-products">
                {wishlist.map(
                  (product) => (
                    <div
                      className="wishlist-product"
                      key={product.id}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div className="wishlist-product-info">
                        <h4>
                          {product.name}
                        </h4>

                        <p>
                          ₹
                          {
                            product.per_day_rent
                          }
                          /day
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            onRemoveWishlist(
                              product
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                )}

                <button
                  type="button"
                  className="wishlist-browse-button"
                  onClick={
                    scrollToGaming
                  }
                >
                  Browse More Products
                </button>
              </div>
            )}
          </div>
        )}

        {/* Shopping Bag Popup */}
        {bagOpen && (
          <div className="navbar-popup bag-popup">
            <div className="navbar-popup-header">
              <h3>
                Shopping Bag
                {rentalCount > 0 &&
                  ` (${rentalCount})`}
              </h3>

              <button
                type="button"
                onClick={() =>
                  setBagOpen(false)
                }
                aria-label="Close shopping bag"
              >
                <X size={18} />
              </button>
            </div>

            {rentalCount === 0 ? (
              <div className="navbar-popup-empty">
                <ShoppingBag size={32} />

                <h4>
                  Your bag is empty
                </h4>

                <p>
                  Choose a gaming gadget
                  to start your rental.
                </p>

                <button
                  type="button"
                  onClick={
                    scrollToGaming
                  }
                >
                  Browse Gaming
                </button>
              </div>
            ) : (
              <div className="bag-content">
                <div className="bag-rentals">
                  {rentals.map(
                    (rental) => (
                      <div
                        className="bag-rental"
                        key={
                          rental.rentalId
                        }
                      >
                        <div className="bag-rental-image">
                          <img
                            src={
                              rental
                                .product
                                .image
                            }
                            alt={
                              rental
                                .product
                                .name
                            }
                          />
                        </div>

                        <div className="bag-rental-info">
                          <h4>
                            {
                              rental
                                .product
                                .name
                            }
                          </h4>

                          <p className="bag-rental-dates">
                            {rental.startDate}{" "}
                            →{" "}
                            {rental.endDate}
                          </p>

                          <p className="bag-rental-days">
                            {
                              rental.rentalDays
                            }{" "}
                            {rental.rentalDays ===
                            1
                              ? "day"
                              : "days"}{" "}
                            × ₹
                            {
                              rental
                                .product
                                .per_day_rent
                            }
                          </p>

                          <strong>
                            ₹
                            {
                              rental.totalPrice
                            }
                          </strong>
                        </div>

                        <button
                          type="button"
                          className="bag-remove-button"
                          onClick={() =>
                            onRemoveRental(
                              rental.rentalId
                            )
                          }
                          aria-label={`Remove ${rental.product.name} from shopping bag`}
                        >
                          <Trash2
                            size={17}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>

                <div className="bag-summary">
                  <div>
                    <span>
                      Rental total
                    </span>

                    <strong>
                      ₹{bagTotal}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="bag-browse-button"
                    onClick={
                      scrollToGaming
                    }
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a
            href="#location"
            onClick={
              handleMobileLink
            }
          >
            <MapPin size={17} />
            Bangalore
          </a>

          <a
            href="#gaming"
            onClick={
              handleMobileLink
            }
          >
            Gaming
          </a>

          <a
            href="#categories"
            onClick={
              handleMobileLink
            }
          >
            Categories
          </a>

          <a
            href="#faq"
            onClick={
              handleMobileLink
            }
          >
            FAQs
          </a>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onLogin();
            }}
          >
            <User size={17} />
            Login
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;