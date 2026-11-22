# AwayStack

Frozen lick enrichment tower for dogs — a wind-up clock mechanism releases one cup at a time while you're out.

## About

AwayStack is a concept product page for an automatic dog treat dispenser. Six frozen lick cups are served one at a time while you are out — wind the dial in the morning, read the Day Report flags when you are home. No battery, no app.

The site lets visitors browse product packs, choose add-ons, check delivery by PIN code, add items to a cart (persisted across navigation and refreshes), place an order, and view a branded invoice with a Paw Certified seal.

**Live site:** https://0905cs211163-hwa-hackathon.vercel.app

## Features

- **Product gallery** — image carousel with thumbnail selection
- **Pack selection** — AwayStack or Starter Kit with descriptions and pricing
- **Add-ons** — flavour cup refill and spare scent band, each with its own quantity control
- **Price summary** — live pack, add-on, and total calculation
- **Add to Cart** — cart persisted in sessionStorage, survives navigation and refresh
- **Buy Now** — adds cart contents and proceeds to checkout
- **Delivery checker** — PIN-code delivery availability check
- **Trust cards** — free delivery, 30-day returns, cash on delivery
- **Tabs** — How it works (with 16:9 video), Specs, Care & safety
- **Checkout** — customer details form with validation and order summary
- **Order confirmation** — order summary with loader during hydration
- **Invoice** — branded invoice page with PAW CERTIFIED seal (view-only, no print/download)
- **Responsive design** — mobile-friendly layout with sticky navbar

## Tech Stack

- **Framework:** Next.js 16.4.6 (App Router, static export)
- **UI Library:** React 19.3.1
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (`motion/react`)
- **Fonts:** Quicksand, DM Sans, Fredoka, Nunito (via Google Fonts)
- **Deployment:** Vercel (static export)

## Project Structure

```
app/
  layout.js              # Root layout with CartProvider, Navbar, Footer
  global.css             # Tailwind v4 theme, design tokens, print styles
  page.js                # Homepage
  shop/awaystack/
    page.js              # Product page (gallery, info, purchase, tabs)
    checkout/page.js     # Checkout form
    order-confirmed/page.js  # Order confirmation with loader
components/
  Navbar.js              # Sticky navbar with cart and shop now
  CartProvider.js        # Cart context, persisted to sessionStorage
  CartButton.js          # Cart icon with item-count badge
  ProductGallery.js      # Image carousel + thumbnails
  ProductInfo.js         # Badges, name, description, price
  ProductPurchase.js     # Pack cards, add-on cards, qty, total, buttons
  ProductTabs.js         # Tabbed sections (How it works / Specs / Care & safety)
  DeliveryChecker.js     # PIN code delivery checker
  TrustCards.js          # Trust cards with wave bands
  LifestyleImages.js     # Lifestyle photo grid
  OrderConfirmation.js   # Order summary + View Invoice
  InvoiceReceipt.js      # Branded invoice with Paw Certified seal
  PawCertifiedSeal.js    # Animated paw seal badge
  Button.js              # Reusable button component
  Container.js           # Max-width container wrapper
  Footer.js              # Site footer
  AnnouncementBar.js     # Top announcement bar
data/
  product.js             # Single source of truth (packs, add-ons, trust, tabs)
public/
  images/                # Product images + favicon.ico
  video/                 # How-it-works video (1280×720)
```

## Installation

```bash
# Clone the repository
git clone https://github.com/ShivVk18/0905cs211163-hwa-hackathon.git
cd 0905cs211163-hwa-hackathon

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at `http://localhost:3000`. The product page is at `/shop/awaystack`.

### Production build

```bash
# Build for production (static export)
npm run build

# Preview the production build locally
npm start
```

## Usage

1. Visit `/shop/awaystack` to see the product page.
2. Select a pack and optional add-ons, adjust quantities.
3. Click **Add to Cart** — the cart count updates in the navbar and persists across pages.
4. Click **Buy Now** to go to checkout, or continue shopping.
5. Fill in your details at checkout and place the order.
6. On the order confirmation page, click **View Invoice** to see the branded invoice.

## Deployment

Deployed on Vercel. The live site is at:
https://0905cs211163-hwa-hackathon.vercel.app

## License

This is a concept project built for the Happy While Away web design hackathon.
