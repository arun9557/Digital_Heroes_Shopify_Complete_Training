# AURA Wellness — Interview Prep Q&A

This document contains full explanations of the brand strategy, custom Liquid sections, and the 6 required Shopify apps. Study these answers carefully before your Digital Heroes review to confidently explain the "why" and "how" behind your store.

---

## 🎨 Part 1: Brand Strategy & Design Decisions

### Q1: Why did you choose the "AURA Wellness" brand and niche?
> **Answer**: I chose a premium smart aromatherapy and organic botanicals niche because it represents a high-margin, growing wellness sector that requires strong emotional branding and visual elegance. This niche is ideal for demonstrating modern eCommerce elements like subscriptions (for mists/oils), bundles (hardware + consumables), and rich customer reviews. It also allows us to build a gorgeous, clean, spa-like design matching the premium standards of references like Therabody and Liwa Coffee.

### Q2: Explain your color scheme and design system.
> **Answer**: I followed the strict **60/30/10 Design Rule** to ensure professional visual hierarchy:
> - **60% Primary (Backgrounds)**: `#FFFFFF` and `#F9F9FB` (off-white) to give a clean, spacious, luxury feel with plenty of breathing room.
> - **30% Secondary (Structure & Typography)**: `#1E293B` (deep slate navy) for all typography, section headers, and card borders. This provides strong, readable contrast without the harshness of pure black.
> - **10% Accent (CTAs & Key Details)**: `#D97706` (warm gold/amber) for all primary buttons, active links, and sales tags. This warm, organic color naturally draws the customer's eye directly to conversion points (like "Add to Cart" and "Subscribe").

### Q3: What typography did you use and why?
> **Answer**: I used a curated font pairing of **Playfair Display** (for headings) and **Lato** (for body text).
> - *Playfair Display* is a classic serif font that projects elegance, premium quality, and craftsmanship.
> - *Lato* is a highly legible, clean sans-serif font that makes reading long descriptions, benefits lists, and FAQs effortless, especially on mobile screens. I restricted the store to exactly these 2 fonts to maintain a professional, cohesive brand identity.

---

## 🔌 Part 2: Required Shopify Apps (Crucial Explanations)

You must be prepared to explain the purpose, use case, and business metrics affected by each of the following 6 apps:

### 1. Judge.me Product Reviews
* **Purpose**: Collects and displays customer star ratings, review text, and user-generated photos directly on product pages and collection grids.
* **Business Metrics Affected**: **Conversion Rate (CR)** and **Customer Trust**.
* **Use Case & Explanation**: Reviews act as crucial "social proof". According to eCommerce data, stores with reviews convert up to 270% better. I installed Judge.me, enabled the Star Rating and All Reviews widgets in the theme, and manually imported 3 detailed, positive sample reviews describing the diffuser's design and scent effectiveness to establish immediate trust for new visitors.

### 2. Shopify Bundles
* **Purpose**: Allows merchants to group multiple products together and sell them as a single packaged deal.
* **Business Metrics Affected**: **Average Order Value (AOV)** and **Inventory Efficiency**.
* **Use Case & Explanation**: Bundling is the most effective way to increase AOV without needing more web traffic. I created the "Deep Sleep Aromatherapy Bundle" combining the Flagship Diffuser, Sleep Mist, and Lavender Oil. This incentivizes clients to buy a complete solution instead of just one item, raising our average cart value from $24 or $89 to $110, while offering them a 20% discount. The app automatically tracks and syncs the inventory of individual components.

### 3. Shopify Subscriptions
* **Purpose**: Enables customers to sign up for recurring automated deliveries of products (e.g., weekly, monthly) at a discounted price.
* **Business Metrics Affected**: **Customer Lifetime Value (LTV)**, **Recurring Revenue (MRR)**, and **Customer Retention**.
* **Use Case & Explanation**: Subscriptions create predictable, recurring cash flow. For consumable products like the AURA Sleep Mist and Refreshing Mist, I added a "Subscribe & Save" plan with a 30-day frequency and a 15% discount. This encourages repeat purchases, transforming one-off buyers into long-term loyal clients.

### 4. Shopify Search & Discovery
* **Purpose**: Customizes collection page filters, search bar behavior, and product recommendations.
* **Business Metrics Affected**: **User Experience (UX)**, **Search Conversion Rate**, and **Bounce Rate**.
* **Use Case & Explanation**: A premium store must be easy to navigate. I used this app to set up custom filters on the shop page. Customers can filter by price, product type, and tags (scent profiles like "Lavender" or "Eucalyptus"). This allows buyers to instantly find exactly what they want, preventing frustration and lowering bounce rates.

### 5. Shopify Marketplace Connect
* **Purpose**: Connects the Shopify catalog directly to major global marketplaces like Amazon, eBay, Walmart, and Etsy.
* **Business Metrics Affected**: **Sales Volume** and **Multi-Channel Reach**.
* **Use Case & Explanation**: Rather than managing listings separately, Marketplace Connect acts as a single source of truth. If AURA Wellness wants to scale, this app lets us push our product descriptions, stock levels, and pricing directly to Amazon or Etsy. When an order is placed on Amazon, it syncs back to Shopify for fulfillment, keeping inventory in sync automatically.

### 6. Labeler – Product Labels
* **Purpose**: Adds visual badges (like "Best Seller", "New", "Sale", "Organic") directly onto product thumbnails in grids.
* **Business Metrics Affected**: **Click-Through Rate (CTR)** on product listings and **Visual Hierarchy**.
* **Use Case & Explanation**: Product labels act as visual cues that guide the buyer's eye. I configured Labeler to display an amber "Best Seller" badge on the flagship Aura Smart Diffuser to leverage authority, and a "New" badge on the Eucalyptus Refreshing Mist to spark curiosity. This directs focus to high-margin or newly launched products, increasing their click-through rates.

---

## 💻 Part 3: Custom Liquid Coding & Developer Standards

### Q1: What custom Liquid code did you write and why?
> **Answer**: I wrote two custom Liquid sections from scratch to bypass default theme limits and elevate the store's UX:
> 1. **Before/After Image Slider (`custom-before-after.liquid`)**: An interactive dragging slider that lets users swipe between two images (e.g., dry air vs. a room filled with fine aromatherapy mist) to visually see product effects.
> 2. **Interactive USP Grid (`custom-usp-grid.liquid`)**: A highly polished, responsive 4-column card grid containing custom SVG icons, benefit titles, and hover scale-up micro-animations.

### Q2: How did you ensure your Liquid sections conform to "Digital Heroes Coding Standards"?
> **Answer**: I strictly followed the standards outline:
> - **CSS Scoping**: All styles are scoped strictly inside `#shopify-section-{{ section.id }}` or `#AuraBeforeAfter-{{ section.id }}` to prevent style bleeding into other pages.
> - **No Stylesheet Tag**: Used custom inline `{% style %}` blocks inside the files instead of external stylesheets, ensuring assets load efficiently without render-blocking requests.
> - **Scoped JavaScript**: All JS logic (like the slider dragging control) is encapsulated in an IIFE (Immediately Invoked Function Expression) and queries selectors *only* within the section container `document.querySelector('#AuraBeforeAfter-{{ section.id }}')`. This ensures that if the user adds multiple sliders on the same page, each operates independently without conflicts.
> - **ASCII Only**: The code is 100% clean ASCII characters with no smart quotes, em-dashes, or Unicode that could crash the Shopify compiler.
> - **Valid Defaults**: All ranges (padding) satisfy `(default - min) % step === 0` to prevent Shopify `FileSaveError`.
