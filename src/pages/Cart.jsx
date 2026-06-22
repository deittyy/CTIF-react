import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePayment = () => {
    if (!name || !address || !state) {
      toast.error("Please fill in all fields");
      return;
    }
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    sessionStorage.setItem(
      "cgee_order",
      JSON.stringify({ name, address, state, cart }),
    );
    toast.success("Order placed! Redirecting to Instagram...");
    setTimeout(() => {
      window.location.href = "https://instagram.com/cgee_here";
    }, 1500);
  };

  const handleRemoveItem = (id, size, color) => {
    // This would need to be added to CartContext
    toast.info("Remove item feature coming soon");
  };

  return (
    <div className="cart-page-container">
      <div className="cart-page">
        <div className="cart-page-header">
          <h1>Your Cart</h1>
          <p className="cart-items-count">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="cart-content">
          <div className="cart-items-section">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart</p>
                <button
                  className="btn-back-to-shop"
                  onClick={() => navigate("/collections")}
                >
                  ← Back to Collections
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id + item.selectedSize} className="cart-item-card">
                      <div className="item-image">
                        <img src={item.frontImg} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p className="item-specs">
                          <span className="spec">Size: {item.selectedSize}</span>
                          <span className="spec-divider">•</span>
                          <span className="spec" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}>
                            Color:
                            <span
                              style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                backgroundColor: item.selectedColor,
                                border: '1px solid #ddd'
                              }}
                            ></span>
                          </span>
                        </p>
                      </div>
                      <div className="item-quantity">
                        <p className="qty-label">Qty: {item.qty}</p>
                      </div>
                      <div className="item-price">
                        <p className="price-label">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="checkout-section">
              <h2>Delivery Information</h2>
              <form className="checkout-form" onSubmit={(e) => {
                e.preventDefault();
                handlePayment();
              }}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="123 Main Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    type="text"
                    placeholder="Lagos"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-checkout">
                  Pay via Instagram →
                </button>
                <button
                  type="button"
                  className="btn-clear-cart"
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared");
                  }}
                >
                  Clear Cart
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
