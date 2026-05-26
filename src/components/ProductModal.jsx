import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { allProducts } from "../data/products";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeImage, setActiveImage] = useState("front");
  const { addToWishlist } = useWishlist();
  const related = allProducts
    .filter((p) => p.id !== product.id && p.inStock)
    .slice(0, 3);

  const handleAdd = () => {
    onAddToCart({ ...product, selectedSize, qty: 1 });
    onClose();
  };

  const shareUrl = window.location.href;
  const title = `Check out ${product.name} on CTIF!`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grid">
          <div className="modal-image">
            <img
              src={activeImage === "front" ? product.frontImg : product.backImg}
              alt={product.name}
              className="modal-img"
            />
            <div className="thumbnails">
              <button onClick={() => setActiveImage("front")}>Front</button>
              <button onClick={() => setActiveImage("back")}>Back</button>
            </div>
          </div>
          <div className="modal-details">
            <h3>{product.name}</h3>
            <div className="modal-price">${product.price}</div>
            <div className="size-selector">
              <strong>Size:</strong>{" "}
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
            <div className="modal-actions">
              <button className="add-to-cart-modal" onClick={handleAdd}>
                Add to Cart
              </button>
              <button
                className="wishlist-modal"
                onClick={() => {
                  addToWishlist(product);
                  toast.info("Added to wishlist");
                }}
              >
                {/* <FiHeart /> Wishlist */}
              </button>
            </div>
            <div className="share-buttons">
              <span>
                <FiShare2 /> Share:
              </span>
              <WhatsappShareButton url={shareUrl} title={title}>
                <button>WhatsApp</button>
              </WhatsappShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <button>Twitter</button>
              </TwitterShareButton>
              <FacebookShareButton url={shareUrl} quote={title}>
                <button>Facebook</button>
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
                  onClick={() => window.location.reload() /* simplified */}
                >
                  <img src={p.frontImg} alt={p.name} />
                  <p>{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
