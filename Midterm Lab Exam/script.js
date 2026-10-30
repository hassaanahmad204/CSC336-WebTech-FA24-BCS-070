/* ==========================================================================
   TASK 3: Plain JavaScript for Live Search, Price Sorting & Premium Labels
   Student Roll Number: FA24-BCS-070 | N = 70 | Premium Threshold = $7,000
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const N = 70;
  const PREMIUM_THRESHOLD = N * 100; // $7,000

  const searchInput = document.getElementById("productSearch");
  const sortBtn = document.getElementById("sortPriceBtn");
  const productGrid = document.getElementById("productGrid");
  const noProductsMsg = document.getElementById("noProductsMsg");
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  const productCards = Array.from(document.querySelectorAll(".product-col"));

  // Track sort direction: 'asc' or 'desc'
  let sortDirection = "none";

  /* --------------------------------------------------------------------------
     1. Automatic "Premium" Label on Page Load for Price > N * 100 ($7,000)
     -------------------------------------------------------------------------- */
  productCards.forEach((col) => {
    // Read price directly from the data-price attribute on the card
    const price = parseFloat(col.dataset.price) || 0;
    if (price > PREMIUM_THRESHOLD) {
      const card = col.querySelector(".product-card");
      if (card && !card.querySelector(".premium-badge")) {
        const badge = document.createElement("span");
        badge.className =
          "badge bg-dark text-warning position-absolute top-0 end-0 m-3 px-2 py-1 fw-bold premium-badge shadow-sm";
        badge.style.fontSize = "0.72rem";
        badge.style.letterSpacing = "0.05em";
        badge.style.zIndex = "5";
        badge.innerHTML =
          '<i class="bi bi-star-fill me-1 text-warning"></i>Premium';
        card.appendChild(badge);
      }
    }
  });

  /* --------------------------------------------------------------------------
     2. Live Search + Task 1 Category Filter Synchronization
     -------------------------------------------------------------------------- */
  function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    const activeRadio = document.querySelector(
      'input[name="category"]:checked',
    );
    const selectedCategory = activeRadio ? activeRadio.value : "all";

    let visibleCount = 0;

    productCards.forEach((col) => {
      const titleElem = col.querySelector(".product-title");
      const title = titleElem ? titleElem.textContent.toLowerCase() : "";
      const category = col.dataset.category;

      const matchesSearch = title.includes(query);
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      // Card must match BOTH search input and category filter
      if (matchesSearch && matchesCategory) {
        col.style.setProperty("display", "block", "important");
        visibleCount++;
      } else {
        col.style.setProperty("display", "none", "important");
      }
    });

    // Toggle "No products found" message
    if (visibleCount === 0) {
      noProductsMsg.classList.remove("d-none");
    } else {
      noProductsMsg.classList.add("d-none");
    }
  }

  // Live filter as user types
  searchInput.addEventListener("input", filterProducts);

  // Synchronize when a radio button is selected
  categoryRadios.forEach((radio) => {
    radio.addEventListener("change", filterProducts);
  });

  /* --------------------------------------------------------------------------
     3. Sort by Price (Reorders existing DOM nodes via appendChild)
     -------------------------------------------------------------------------- */
  sortBtn.addEventListener("click", () => {
    // Toggle sort order: 1st click = asc, 2nd click = desc, and so on
    if (sortDirection === "none" || sortDirection === "desc") {
      sortDirection = "asc";
      sortBtn.innerHTML =
        '<i class="bi bi-sort-numeric-down me-1"></i> Price: Low to High';
      sortBtn.classList.replace("btn-outline-dark", "btn-dark");
    } else {
      sortDirection = "desc";
      sortBtn.innerHTML =
        '<i class="bi bi-sort-numeric-down-alt me-1"></i> Price: High to Low';
      sortBtn.classList.replace("btn-dark", "btn-outline-dark");
    }

    // Sort existing node references by price
    const sortedCards = [...productCards].sort((a, b) => {
      const priceA = parseFloat(a.dataset.price) || 0;
      const priceB = parseFloat(b.dataset.price) || 0;
      return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
    });

    // Re-attach elements in place (preserves cards without rebuilding HTML)
    sortedCards.forEach((card) => {
      productGrid.appendChild(card);
    });
  });
});
