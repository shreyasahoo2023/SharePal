import { useEffect, useMemo, useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RentalSelector from "./components/RentalSelector";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import TrustStats from "./components/TrustStats";
import Footer from "./components/Footer";
import Login from "./components/Login";

import productData from "./data/product-list.json";

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [wishlist, setWishlist] = useState([]);

  const [rentals, setRentals] = useState([]);

  const [loginOpen, setLoginOpen] = useState(false);

  const products = productData.products;

  /*
   * Search + Category Filtering
   */
  const filteredProducts = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const productName =
        product.name?.toLowerCase() || "";

      const productTag =
        product.tag?.toLowerCase() || "";

      const searchableText =
        `${productName} ${productTag}`.toLowerCase();

      const matchesSearch =
        query === "" ||
        searchableText.includes(query);

      let matchesCategory = true;

      if (selectedCategory === "PS5") {
        matchesCategory =
          productName.includes("ps5") ||
          productName.includes("playstation");
      }

      if (selectedCategory === "Games") {
        matchesCategory =
          productName.includes("game") ||
          productName.includes("fc") ||
          productName.includes("god of war") ||
          productName.includes("uncharted") ||
          productName.includes("cricket") ||
          productName.includes("ghost") ||
          productName.includes("spider-man");
      }

      if (selectedCategory === "Racing") {
        matchesCategory =
          productName.includes("racing") ||
          productName.includes("wheel");
      }

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
  ]);

  /*
   * Automatically scroll to products
   * when searching.
   */
  useEffect(() => {
    if (!searchTerm.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      document
        .getElementById("gaming")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /*
   * Wishlist
   */
  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadyAdded =
        currentWishlist.some(
          (item) => item.id === product.id
        );

      if (alreadyAdded) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  /*
   * Add rental to Shopping Bag
   */
  const addRental = (rental) => {
    setRentals((currentRentals) => [
      ...currentRentals,
      {
        ...rental,
        rentalId: `${rental.product.id}-${Date.now()}`,
      },
    ]);
  };

  /*
   * Remove rental from Shopping Bag
   */
  const removeRental = (rentalId) => {
    setRentals((currentRentals) =>
      currentRentals.filter(
        (rental) =>
          rental.rentalId !== rentalId
      )
    );
  };

  /*
   * Clear search
   */
  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  /*
   * Login page
   */
  if (loginOpen) {
    return (
      <Login
        onClose={() => setLoginOpen(false)}
      />
    );
  }

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        wishlist={wishlist}
        onRemoveWishlist={toggleWishlist}
        rentals={rentals}
        onRemoveRental={removeRental}
        onLogin={() => setLoginOpen(true)}
      />

      <main>
        <Hero />

        <RentalSelector />

        <CategoryTabs
          selectedCategory={
            selectedCategory
          }
          setSelectedCategory={
            setSelectedCategory
          }
        />

        <ProductGrid
          products={filteredProducts}
          wishlist={wishlist}
          onToggleWishlist={
            toggleWishlist
          }
          onConfirmRental={addRental}
          searchTerm={searchTerm}
          onClearSearch={clearSearch}
        />

        <FAQ />

        <Testimonials />

        <TrustStats />
      </main>

      <Footer />
    </>
  );
}

export default App;