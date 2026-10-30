# Web Technologies Lab Mid Term Examination (FA26)

- **Student Name:** Muhammad Hassaan Ahmad
- **Registration / Roll No:** FA24-BCS-070
- **Course:** CSC336 - Web Technologies
- **AI Tools Used:** Claude / Gemini / ChatGPT

---

### Personal Numbers & Derivations

- **N (Last 2 digits of Roll No):** `70`
- **Breakpoint (BP = 600 + N):** `670px`
- **Accent Hue (H = (N \* 7) mod 360):** `(70 * 7) mod 360 = 490 mod 360 = 130`
  - **Accent Color:** `hsl(130, 70%, 45%)`
- **Categories Count (K = (N mod 3) + 3):** `(70 mod 3) + 3 = 1 + 3 = 4`
  - Categories: `Mac`, `iPhone`, `iPad`, `Wearables`
- **Task 2 Sticky Offset ((N mod 40) + 70):** `(70 mod 40) + 70 = 30 + 70 = 100px`
- **Task 3 Premium Threshold (N \* 100):** `70 * 100 = $7,000`

---

### Files Changed & Summary of Tasks

#### 1. `css/styles.css`

- **Task 1:** Added `.category-filter-wrapper` styles and radio button pill styles utilizing accent color `hsl(130, 70%, 45%)` on `:checked`. Implemented zero-JS filtering logic with `#filter-container:has(#cat-*:checked) ~ #productGrid .product-col:not(...) { display: none !important; }` to prevent empty layout gaps.
- **Task 2:** Replaced the layout with CSS Grid using named areas (`"image"`, `"details"`, `"description"`). Defined stacked 1-column layout below 670px, and from 670px onwards reflowed to `"image details" / "description description"` with `.area-details { position: sticky; top: 100px; }`.

#### 2. `index.html`

- **Task 1:** Added 5 radio buttons (`All` + 4 categories) wrapped inside `#filter-container`. Added `data-category` and `data-price` attributes to all 8 product columns.
- **Task 3:** Added search input (`#productSearch`), sort button (`#sortPriceBtn`), and "No products found" placeholder (`#noProductsMsg`). Linked `script.js` before `</body>`.

#### 3. `product.html`

- **Task 2:** Refactored `<main>` markup into `<div class="product-grid-layout">` with 3 semantic grid items: `.area-image`, `.area-details`, and `.area-description`. Extended description text and specifications to demonstrate sticky scrolling.

#### 4. `midterm/script.js`

- **Task 3:** Implemented DOM-driven search with case-insensitive matching; synchronized search with CSS radio category filters; implemented bidirectional price sorting by reordering existing DOM nodes via `productGrid.appendChild()`; automatically attached a styled "Premium" badge to products priced above $7,000 upon page load.
