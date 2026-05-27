# CGEE's Store - CTIF (Cgee Thinks It Fits)

A modern e-commerce application built with React and Vite for selling custom clothing and fashion items.

## Features

- **Responsive Design** - Mobile-first approach with smooth sidebar navigation
- **Product Collections** - Browse curated collections of CTIF apparel
- **Shopping Cart** - Add/remove items with real-time cart updates
- **Wishlist** - Save favorite items for later
- **Hero Video** - Dynamic video background on home page
- **Newsletter Signup** - Subscribe to updates and promotions
- **Smooth Navigation** - Auto-closing sidebar for better mobile UX

## Tech Stack

- **Frontend Framework** - React 18
- **Build Tool** - Vite
- **Styling** - CSS3
- **State Management** - React Context API
- **Routing** - React Router v6
- **Icons** - React Icons
- **Notifications** - React Toastify

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Sidebar.jsx
│   ├── CartSidebar.jsx
│   ├── ProductModal.jsx
│   ├── NewsletterPopup.jsx
│   ├── BackToTop.jsx
│   └── SizeGuide.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Collections.jsx
│   └── About.jsx
├── context/          # React Context for state management
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   └── SidebarContext.jsx
├── data/            # Static data
│   └── products.js
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── App.css          # Global styles
```

## Features in Detail

### Mobile Navigation
The sidebar automatically closes when clicking anywhere on the main content area, providing a seamless mobile experience.

### Cart Management
- Add/remove items from cart
- View cart total and item count
- Persistent cart state

### Product Discovery
- Browse home page with featured content
- Explore collections
- Learn about the brand

## License

All rights reserved © CGEE's Store
