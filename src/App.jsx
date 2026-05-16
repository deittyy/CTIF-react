import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import CartSidebar from "./components/CartSidebar";
import BackToTop from "./components/BackToTop";
import NewsletterPopup from "./components/NewsletterPopup";
import "./App.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="app-layout">
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </div>
          <CartSidebar />
          <BackToTop />
          <NewsletterPopup />
          <ToastContainer position="bottom-right" autoClose={2000} />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
