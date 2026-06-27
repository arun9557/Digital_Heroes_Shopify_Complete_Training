# AURA Wellness — Shopify Store Setup & App Integration Guide

Follow this step-by-step guide to build and configure your premium **AURA Wellness** Shopify store. This guide contains everything you need to build the store, configure the 10 homepage sections, import products, add custom Liquid code, and set up all 6 required Shopify apps to achieve an elite hiring score.

---

## 🎨 Part 1: Brand & Theme Settings (60/30/10 Rule)

To match the premium references, configure your Dawn theme settings with a clean, spacious aesthetic:

1. **Open Theme Editor**: Go to **Online Store → Themes → Customize** (on Dawn).
2. **Colors (Theme Settings - Paintbrush Icon)**:
   - **Scheme 1 (60% Background)**: Set Background to `#FFFFFF` (pure white) or `#F9F9FB` (very light grey-blue).
   - **Text (30% Secondary)**: Set Text, Headings, and Primary Buttons Background to `#1E293B` (deep slate navy).
   - **Accent 1 (10% Accent)**: Set buttons hover, active states, and custom sales badges to `#D97706` (warm amber/gold).
3. **Typography**:
   - **Headings**: Change font to **Playfair Display** (gives a luxury, premium botanical vibe).
   - **Body**: Change font to **Lato** (clean, thin sans-serif that remains highly readable at small sizes).
4. **Upload Logo**:
   - In **Header Settings**, upload the `logo.png` from your `Brand Assets` folder. Set logo width to **140px**.

---

## 📦 Part 2: Product & Image Import

1. **Import CSV**:
   - Go to **Shopify Admin → Products → Import**.
   - Select the `products.csv` file from your `C:\Users\Shopify_Partners` folder.
   - Check the box "Publish new products to all sales channels" and click **Upload and continue → Import products**.
2. **Assign Images**:
   - Once imported, open each product and upload its corresponding high-quality image from the `Product Images` folder:
     - **Aura Smart Ceramic Diffuser** → `aura_smart_diffuser.png`
     - **Lavender & Chamomile Sleep Mist** → `aura_sleep_mist.png`
     - **"The Ritual" Essential Oil Set** → `aura_essential_oils.png`
     - **Eucalyptus & Mint Refreshing Mist** → `aura_refresh_mist.png`
     - *For the "Deep Sleep Aromatherapy Bundle", upload a combined shot or the smart diffuser image as primary.*
3. **Set Compare-At Prices (Sale Badges)**:
   - Ensure products have their prices and compare-at prices set (this is pre-configured in the CSV but double-check):
     - Diffuser: `$89.00` (Compare-at `$119.00`)
     - Sleep Mist: `$24.00` (Compare-at `$29.00`)
     - Essential Oil Set: `$38.00` (Compare-at `$48.00`)
     - Deep Sleep Bundle: `$110.00` (Compare-at `$151.00`)

---

## 💻 Part 3: Adding Custom Liquid Sections

To demonstrate elite developer skills, upload the two custom Liquid sections we coded:

1. **Add Before/After Slider**:
   - In Shopify Admin, go to **Online Store → Themes → Click "..." (Actions) next to Customize → Edit Code**.
   - Scroll down to **Sections**, click **Add a new section**.
   - Name it `custom-before-after` and click **Done**.
   - Copy the entire contents of `C:\Users\Shopify_Partners\Custom Sections\custom-before-after.liquid` and paste it into the editor. Overwrite any default code and click **Save**.
2. **Add Interactive USP Grid**:
   - Under **Sections**, click **Add a new section**.
   - Name it `custom-usp-grid` and click **Done**.
   - Copy the entire contents of `C:\Users\Shopify_Partners\Custom Sections\custom-usp-grid.liquid` and paste it into the editor. Click **Save**.
3. **Add Sections to Homepage**:
   - Go to the Theme Customizer. Click **Add section** in the left sidebar.
   - You will see **Before/After Image Slider** and **Interactive USP Grid** in the list! Add them and configure their headings/images.

---

## 🏠 Part 4: Building the Homepage (10 Required Sections)

Arrange your homepage in the following top-to-bottom layout for maximum visual hierarchy and high-converting flow:

1. **Announcement Bar**:
   - *Text*: "FREE SHIPPING on orders above $50 — Use code AURA10 for 10% off"
2. **Hero Banner (Image with Text)**:
   - *Image*: Use `aura_smart_diffuser.png`.
   - *Heading*: "Intelligent Aromatherapy for Mindful Living"
   - *Subheading*: "Sleek, ceramic ultrasonic diffusers paired with 100% pure organic botanicals."
   - *CTA Button*: "Shop The Collection" (links to `/collections/all`).
3. **Featured Collections (Collection List)**:
   - Create 3 collections: *Smart Diffusers*, *Organic Mists*, and *Essential Oils*. Show them as 3 clean, visual tiles.
4. **Best-Selling Products (Featured Collection)**:
   - Display a 4-column grid of your top products. Show prices with the Compare-at price sale badges.
5. **Interactive USP Grid (Our Custom Section)**:
   - Add the **Interactive USP Grid** section here to immediately address client trust. It will render 4 cards with beautiful animations on hover explaining: "100% Organic & Pure", "Sleek & Silent Design", "Eco-Conscious Promise", and "Satisfaction Guaranteed".
6. **Product Highlight (Image with Text)**:
   - Highlight the **Aura Smart Ceramic Diffuser**. Place a large image on the left, and a detailed description with a "Shop Now" button on the right.
7. **Before/After Slider (Our Custom Section)**:
   - Add the **Before/After Image Slider** here to showcase how Aura mist clears the room air or creates ambient lighting. Select appropriate images.
8. **Customer Testimonials (Multicolumn)**:
   - Add 3 client reviews with 5 stars:
     - *"The Smart Diffuser looks like a sculpture on my shelf. Quietest diffuser I've owned."* - Sarah M.
     - *"The Sleep Mist has become a mandatory part of my sleep routine. My room smells like a spa."* - David K.
9. **Newsletter Signup**:
   - *Heading*: "Join the AURA Sanctuary"
   - *Subheading*: "Subscribe for wellness rituals, scent launches, and 15% off your first order."
10. **Footer**:
    - Add logo (`logo.png`), Quick Links (About Us, Contact, FAQ, Track Order), and legal pages (Privacy Policy, Terms of Service, Shipping & Returns).

---

## 🔌 Part 5: App Integration Checklist

Go to **Shopify App Store** and install/integrate the following 6 apps:

### 1. Judge.me Reviews
- **Setup**: Go to **Apps → Judge.me Reviews → Settings**.
- **Integration**: Enable the **All Reviews Widget** and **Star Ratings** inside your Dawn theme editor under App Embeds.
- **Data**: Go to Judge.me admin and manually add at least 3 reviews for your products (e.g. Aura Smart Diffuser, Sleep Mist) so that they render beautifully on the product pages.

### 2. Shopify Bundles
- **Setup**: Install the official **Shopify Bundles** app.
- **Integration**: Go to **Products → Create Bundle** or open the app and create a new bundle.
- **Data**: Create the **Deep Sleep Aromatherapy Bundle** and select the components:
  1. Aura Smart Ceramic Diffuser (1x)
  2. Lavender & Chamomile Sleep Mist (1x)
  3. "The Ritual" Essential Oil Set (Lavender oil or the whole set)
- Set the bundle price to `$110.00` to offer a 20% discount. The app automatically manages inventory based on individual items!

### 3. Shopify Subscriptions
- **Setup**: Install the official **Shopify Subscriptions** app.
- **Integration**: Open the app and click **Create Plan**.
- **Data**: Create a plan called "Subscribe & Save". Set frequency to **Every 30 Days**.
- **Offer**: Give a **15% discount** on subscription purchases.
- **Target Products**: Apply this plan to **Lavender & Chamomile Sleep Mist** and **Eucalyptus & Mint Refreshing Mist**. This incentivizes recurring revenue.

### 4. Shopify Search & Discovery
- **Setup**: Install the **Shopify Search & Discovery** app.
- **Integration**: Go to **Apps → Search & Discovery → Filters**.
- **Data**: Configure the filters:
  - Add **Price** filter.
  - Add a custom filter based on **Product Type** (Diffuser, Mist, Set, Bundle).
  - Add **Tag** filter (so users can filter by scent profile: Lavender, Eucalyptus, Mint).
  - Save and verify the filters show up on your collection pages.

### 5. Shopify Marketplace Connect
- **Setup**: Install the **Shopify Marketplace Connect** app.
- **Use Case**: This app allows you to sync your Shopify catalog (products, pricing, and stock) with global marketplaces like Amazon, eBay, Walmart, and Etsy.
- **Integration**: Open the app, and review the linking steps for Amazon and eBay. You don't need to link a live seller account for the trial, but you should open the dashboard to show you have initialized the channel setup.

### 6. Labeler – Product Labels
- **Setup**: Install **Labeler – Product Labels** (or a similar product badge app).
- **Integration**: Create badges/labels in the app to draw attention to key products:
  - Add a **Best Seller** badge (styled in `#D97706` amber color) to the **Aura Smart Ceramic Diffuser**.
  - Add a **New** badge to the **Eucalyptus & Mint Refreshing Mist**.
  - Configure the badges to appear on the collection grids and homepage featured section.

---

## 📋 Part 6: Mandatory Pages & Navigation

1. **Create Pages**: Go to **Online Store → Pages → Add Page**:
   - **About Us**: Write a 200-word premium brand story about AURA's commitment to clean wellness and active organic botanicals.
   - **Contact Us**: Add a contact form, email address, and note: "We reply within 24 hours."
   - **FAQ**: Write answers to 5 common shipping/return questions.
   - **Shipping & Returns**: Outline a clear 30-day return policy and shipping details.
2. **Auto-Generate Legal Pages**:
   - Go to **Settings → Legal**.
   - Click **Create from template** for Privacy Policy, Refund Policy, and Terms of Service.
   - Click **Save**.
3. **Menus**: Go to **Online Store → Navigation**:
   - **Main Menu**: Links to Home, Shop (All Products), About Us, Contact Us.
   - **Footer Menu**: Links to About Us, Contact Us, FAQ, Shipping & Returns, Privacy Policy, Terms of Service.
