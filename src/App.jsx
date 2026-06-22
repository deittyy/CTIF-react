import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Cart from "./pages/Cart";
import BackToTop from "./components/BackToTop";
import NewsletterPopup from "./components/NewsletterPopup";
import "./App.css";

const AppContent = () => {
  const { setMobileOpen } = useSidebar();

  const handleMainContentClick = () => {
    setMobileOpen(false);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content" onClick={handleMainContentClick}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <SidebarProvider>
            <AppContent />
            <BackToTop />
            <NewsletterPopup />
            <ToastContainer position="bottom-right" autoClose={2000} />
          </SidebarProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
