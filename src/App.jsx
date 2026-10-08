import { useCallback, useEffect, useMemo, useState } from "react";
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
import GearRentalBanner from "./components/GearRentalBanner";
import RecommendationForm from "./components/RecommendationForm";
import FloatingHelp from "./components/FloatingHelp";
import Toast from "./components/Toast";
import productData from "./data/product-list.json";

const STORAGE_KEYS = {
  wishlist: "sharepal-wishlist",
  rentals: "sharepal-rentals",
};

function readStoredValue(key, fallback, isValid) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return fallback;

    const parsed = JSON.parse(value);
    return isValid(parsed) ? parsed : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return fallback;
  }
}

function persistValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save ${key} to local storage.`, error);
  }
}

function getRentalDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  return Math.round((end.getTime() - start.getTime()) / 86400000);
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeDepartment, setActiveDepartment] = useState("Gaming");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState(() =>
    readStoredValue(STORAGE_KEYS.wishlist, [], Array.isArray),
  );
  const [rentals, setRentals] = useState(() =>
    readStoredValue(STORAGE_KEYS.rentals, [], Array.isArray),
  );
  const [loginOpen, setLoginOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datesConfirmed, setDatesConfirmed] = useState(false);
  const [dateError, setDateError] = useState("");
  const [toast, setToast] = useState(null);

  const products = productData.products;
  const rentalDays = datesConfirmed ? getRentalDays(startDate, endDate) : 0;

  useEffect(() => persistValue(STORAGE_KEYS.wishlist, wishlist), [wishlist]);
  useEffect(() => persistValue(STORAGE_KEYS.rentals, rentals), [rentals]);

  const dismissToast = useCallback(() => setToast(null), []);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const categoryTerms = {
      "GTA VI": ["gta vi", "gta 6"],
      "PS5 Console": ["ps5", "playstation"],
      "Xbox Console": ["xbox"],
      VR: ["vr", "oculus", "meta quest"],
      "Racing Wheel": ["racing", "wheel"],
      "Big Screen Gaming": ["projector", "screen"],
      "PS5 Games": ["game", "fc", "fifa", "god of war", "uncharted", "cricket", "ghost", "spider-man"],
    };
    const matchTerms = categoryTerms[selectedCategory] || [];

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.tag,
        ...(product.keywords || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const matchesCategory =
        selectedCategory === "All" ||
        matchTerms.some((term) => searchableText.includes(term));

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  useEffect(() => {
    if (!searchTerm.trim()) return undefined;

    const timer = window.setTimeout(() => {
      document.getElementById("gaming")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  const updateRentalDates = (field, value) => {
    if (field === "start") {
      setStartDate(value);
      if (endDate && value && endDate <= value) setEndDate("");
    } else {
      setEndDate(value);
    }
    setDatesConfirmed(false);
    setDateError("");
  };

  const confirmRentalDates = () => {
    setDateError("");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickupDays = getRentalDays(startDate, endDate);

    if (!startDate || !endDate) {
      setDateError("Please select both delivery and pickup dates.");
      return false;
    }
    if (new Date(`${startDate}T00:00:00`) < today) {
      setDateError("Delivery date cannot be in the past.");
      return false;
    }
    if (pickupDays < 1) {
      setDateError("Pickup must be at least one day after delivery.");
      return false;
    }

    setDatesConfirmed(true);
    return true;
  };

  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    setWishlist((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
    setToast({
      id: Date.now(),
      text: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      type: "success",
    });
  };

  const addRental = (product) => {
    if (!datesConfirmed || rentalDays < 1) {
      setDateError("Select valid delivery and pickup dates before adding a rental.");
      document.getElementById("rental-dates")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    }

    setRentals((current) => [
      ...current,
      {
        product,
        startDate,
        endDate,
        rentalDays,
        dailyPrice: product.per_day_rent,
        totalPrice: product.per_day_rent * rentalDays,
        rentalId: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      },
    ]);
    setToast({ id: Date.now(), text: "Added to your rental bag", type: "success" });
    return true;
  };

  const removeRental = (rentalId) => {
    setRentals((current) =>
      current.filter((rental) => rental.rentalId !== rentalId),
    );
    setToast({ id: Date.now(), text: "Removed from rental bag", type: "success" });
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  if (loginOpen) {
    return <Login onClose={() => setLoginOpen(false)} />;
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
        startDate={startDate}
        endDate={endDate}
        onDateChange={updateRentalDates}
        onApplyDates={confirmRentalDates}
      />
      <main>
        <CategoryTabs
          activeDepartment={activeDepartment}
          onSelectDepartment={setActiveDepartment}
        />
        <Hero featuredImage={products[0]?.image} />
        {activeDepartment === "Gaming" ? (
          <>
            <RentalSelector
              startDate={startDate}
              endDate={endDate}
              onDateChange={updateRentalDates}
              onConfirm={confirmRentalDates}
              confirmed={datesConfirmed}
              rentalDays={rentalDays}
              error={dateError}
            />
            <ProductGrid
              products={filteredProducts}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onConfirmRental={addRental}
              searchTerm={searchTerm}
              onClearSearch={clearSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              startDate={startDate}
              endDate={endDate}
              datesConfirmed={datesConfirmed}
              rentalDays={rentalDays}
            />
          </>
        ) : (
          <section className="department-notice">
            <h2>{activeDepartment} rentals</h2>
            <p>
              This demo currently showcases gaming rentals. Choose Gaming to
              explore the available products.
            </p>
            <button type="button" onClick={() => setActiveDepartment("Gaming")}>
              Browse Gaming
            </button>
          </section>
        )}
        <GearRentalBanner featuredImage={products[1]?.image} />
        <RecommendationForm />
        <FAQ />
        <Testimonials />
        <TrustStats />
      </main>
      <Footer />
      <FloatingHelp
        datesConfirmed={datesConfirmed}
        startDate={startDate}
        endDate={endDate}
      />
      <Toast key={toast?.id || "empty"} message={toast} onClose={dismissToast} />
    </>
  );
}

export default App;
