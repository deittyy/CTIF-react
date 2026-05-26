import { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "../context/CartContext";
import ProductModal from "../components/ProductModal";
import { allProducts } from "../data/products";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const observerRef = useRef();
  const { addToCart } = useCart();

  useEffect(() => {
    const inStock = allProducts.filter((p) => p.inStock);
    setProducts(inStock);
    setFilteredProducts(inStock);
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredProducts(filtered);
    setVisibleCount(12);
    setHasMore(filtered.length > 12);
  }, [search, products]);

  const loadMore = useCallback(() => {
    if (visibleCount >= filteredProducts.length) {
      setHasMore(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length));
      setLoading(false);
    }, 300);
  }, [visibleCount, filteredProducts]);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="narrow-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="product-grid">
        {displayedProducts.map((prod) => (
          <div
            key={prod.id}
            className="product-card"
            onClick={() => setSelectedProduct(prod)}
          >
            <div className="flip-box">
              <div className="flip-inner">
                <div
                  className="front"
                  style={{ backgroundImage: `url(${prod.frontImg})` }}
                ></div>
                <div
                  className="back"
                  style={{ backgroundImage: `url(${prod.backImg})` }}
                ></div>
              </div>
            </div>
            <div className="product-info">
              <h3>{prod.name}</h3>
              <div className="price">${prod.price}</div>
              <button
                className="quick-cart"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ ...prod, qty: 1 });
                  toast.success("Added to cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="loader">Loading more...</div>}
      <div ref={observerRef} style={{ height: "20px" }}></div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p) => {
            addToCart(p);
            toast.success("Added to cart");
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Collections;
