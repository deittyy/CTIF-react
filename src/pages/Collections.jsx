import { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "../context/CartContext";
import ProductModal from "../components/ProductModal";
import SizeGuide from "../components/SizeGuide";
import { allProducts } from "../data/products";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const observerRef = useRef();

  const { addToCart } = useCart();

  // Load all products (in‑stock only)
  useEffect(() => {
    const inStock = allProducts.filter((p) => p.inStock);
    setProducts(inStock);
    setFilteredProducts(inStock);
  }, []);

  // Apply search filter
  useEffect(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
    setFilteredProducts(result);
    setVisibleCount(12);
    setHasMore(result.length > 12);
  }, [search, products]);

  // Infinite scroll: load more products when reaching the bottom
  const loadMore = useCallback(() => {
    if (visibleCount >= filteredProducts.length) {
      setHasMore(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length));
      setLoading(false);
    }, 500);
  }, [visibleCount, filteredProducts.length]);

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

  // Structured data for SEO (optional)
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "CTIF Collections",
      numberOfItems: filteredProducts.length,
      itemListElement: filteredProducts.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Product",
          name: p.name,
          image: p.frontImg,
          offers: { "@type": "Offer", price: p.price, priceCurrency: "USD" },
        },
      })),
    });
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, [filteredProducts]);

  return (
    <div className="narrow-container">
      <div className="collections-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
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
                  style={{ backgroundImage: `url('${prod.frontImg}')` }}
                ></div>
                <div
                  className="back"
                  style={{ backgroundImage: `url('${prod.backImg}')` }}
                ></div>
              </div>
            </div>
            <div className="product-info">
              <h3>{prod.name}</h3>
              <div className="price">${prod.price}</div>
              <div className="product-actions">
                <button
                  className="quick-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ ...prod, qty: 1 });
                    toast.success("Added to cart");
                  }}
                >
                  <FiShoppingCart /> Add to Cart
                </button>
              </div>
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

      {showSizeGuide && <SizeGuide onClose={() => setShowSizeGuide(false)} />}
    </div>
  );
};

export default Collections;
