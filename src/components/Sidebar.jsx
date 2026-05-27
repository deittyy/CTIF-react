import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSidebar } from "../context/SidebarContext";
import { FiHome, FiGrid, FiInfo, FiShoppingCart } from "react-icons/fi";

const Sidebar = () => {
  const { totalItems, toggleCart } = useCart();
  const { mobileOpen, setMobileOpen } = useSidebar();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        Menu
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
            <FiHome /> Home
          </Link>
          <Link
            to="/collections"
            className={`nav-link ${isActive("/collections") ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            <FiGrid /> Collections
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            <FiInfo /> About
          </Link>
        </div>
        <div className="cart-icon-side" onClick={toggleCart}>
          <span>
            <FiShoppingCart /> Cart
          </span>
          <span className="cart-count-side">{totalItems}</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
