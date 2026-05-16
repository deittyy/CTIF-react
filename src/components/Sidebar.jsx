import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const Sidebar = () => {
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>
      <div className={`sidebar ${mobileOpen ? "open-mobile" : ""}`}>
       <div className="sidebar-logo">
         <img src="./CGEE PNG BLACK.png" alt="" />
        </div>
        <div className="sidebar-nav">
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/collections"
            className={`nav-link ${isActive("/collections") ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
        </div>
        <div className="cart-icon-side" onClick={toggleCart}>
          🛒 <span>Cart</span>{" "}
          <span className="cart-count-side">{totalItems}</span>
        </div>
      </div>
      <style>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 200px;
          height: 100vh;
          background: rgba(254, 247, 240, 0.96);
          backdrop-filter: blur(12px);
          border-right: 1px solid rgba(107,78,113,0.2);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 100;
          padding: 2rem 1.5rem;
          transition: transform 0.3s ease;
        }
        // .sidebar-logo { font-size: 1.6rem; font-weight: 700; color: var(--purple-deep); text-align: center; }
        .sidebar-logo span { color: var(--purple); }
        .sidebar-nav { display: flex; flex-direction: column; gap: 1.2rem; margin-top: 2rem; }
        .nav-link { cursor: pointer; font-weight: 500; font-size: 1rem; color: var(--charcoal); text-decoration: none; padding: 0.3rem 0; border-bottom: 1px solid transparent; width: fit-content; }
        .nav-link:hover, .nav-link.active { color: var(--purple); border-bottom-color: var(--purple); }
        .cart-icon-side { margin-top: auto; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; background: var(--grey-light); padding: 0.5rem 1rem; border-radius: 40px; }
        .cart-count-side { background: var(--purple); color: white; border-radius: 30px; padding: 2px 8px; font-size: 0.7rem; }
        .menu-toggle { display: none; position: fixed; top: 1rem; left: 1rem; z-index: 102; background: var(--purple); color: white; padding: 8px 12px; border-radius: 30px; cursor: pointer; border: none; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); width: 240px; }
          .sidebar.open-mobile { transform: translateX(0); }
          .menu-toggle { display: block; }
          .main-content { margin-left: 0; }
        }
        @media (min-width: 769px) { .menu-toggle { display: none; } }
      `}</style>
    </>
  );
};

export default Sidebar;
