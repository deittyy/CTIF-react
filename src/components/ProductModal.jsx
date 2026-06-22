import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { allProducts } from "../data/products";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FiHeart, FiShare2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "#000");
  const [activeImage, setActiveImage] = useState("front");
  const [qty, setQty] = useState(1);
  const { addToWishlist } = useWishlist();
  const related = allProducts
    .filter((p) => p.id !== product.id && p.inStock)
    .slice(0, 4);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      qty
    });
    toast.success(`Added ${qty} to cart`);
    setQty(1);
  };

  const shareUrl = window.location.href;
  const title = `Check out ${product.name} on CTIF!`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="modal-grid">
          <div className="modal-image">
            <div className="main-image">
              <img
                src={activeImage === "front" ? product.frontImg : product.backImg}
                alt={product.name}
                className="modal-img"
              />
              <span className="image-badge">{activeImage.toUpperCase()}</span>
            </div>
            <div className="thumbnails">
              <button
                className={activeImage === "front" ? "active" : ""}
                onClick={() => setActiveImage("front")}
              >
                Front
              </button>
              <button
                className={activeImage === "back" ? "active" : ""}
                onClick={() => setActiveImage("back")}
              >
                Back
              </button>
            </div>
          </div>

          <div className="modal-details">
            <div className="product-header">
              <h3>{product.name}</h3>
              <button
                className="wishlist-btn"
                onClick={() => {
                  addToWishlist(product);
                  toast.success("Added to wishlist");
                }}
              >
                <FiHeart />
              </button>
            </div>

            <div className="modal-price">${product.price.toFixed(2)}</div>

            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            <div className="size-selector">
              <strong>Size</strong>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-opt ${selectedSize === s ? "selected" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="color-selector">
                <strong>Color</strong>
                <div className="color-options">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`color-opt ${selectedColor === c ? "selected" : ""}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelectedColor(c)}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="quantity-selector">
              <strong>Quantity</strong>
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  −
                </button>
                <span className="qty-display">{qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQty(qty + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button className="add-to-cart-modal" onClick={handleAdd}>
                Add to Cart
              </button>
            </div>

            <div className="share-buttons">
              <span>
                <FiShare2 /> Share:
              </span>
              <WhatsappShareButton url={shareUrl} title={title}>
                <button className="share-btn">WhatsApp</button>
              </WhatsappShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <button className="share-btn">Twitter</button>
              </TwitterShareButton>
              <FacebookShareButton url={shareUrl} quote={title}>
                <button className="share-btn">Facebook</button>
              </FacebookShareButton>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="related-products">
            <h4>You may also like</h4>
            <div className="related-grid">
              {related.map((p) => (
                <div
                  key={p.id}
                  className="related-card"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.hash = `#product-${p.id}`;
                  }}
                >
                  <img src={p.frontImg} alt={p.name} />
                  <p className="related-name">{p.name}</p>
                  <p className="related-price">${p.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
