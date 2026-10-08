function CategoryTabs({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "PS5",
    "Games",
    "Racing",
  ];

  return (
    <section className="category-section" id="categories">

      <div className="category-heading">
        <p className="section-label">EXPLORE OUR COLLECTION</p>

        <h2>Gaming gadgets for every kind of player</h2>

        <p>
          Choose your favourite gaming setup and rent it for as long as you need.
        </p>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-tab active"
                : "category-tab"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

    </section>
  );
}

export default CategoryTabs;