import { useCart } from "../context/CartContext";
import { useState } from "react";

const CartSidebar = () => {
  const { cart, clearCart, isOpen, closeCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");

  const handlePayment = () => {
    if (!name || !address || !state) {
      alert("Please fill name, address and state.");
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }
    sessionStorage.setItem(
      "cgee_order",
      JSON.stringify({ name, address, state, phone, cart }),
    );
    window.location.href = "https://instagram.com/cgeehere";
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button
          onClick={closeCart}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.3rem",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>
      <div className="cart-items">
        {cart.length === 0
          ? "Cart empty"
          : cart.map((item) => (
              <div
                key={item.id + item.selectedSize + item.selectedColor}
                className="cart-item"
              >
                <span>
                  {item.name} ({item.selectedSize}, {item.selectedColor}) x
                  {item.qty}
                </span>
                <span>${item.price * item.qty}</span>
              </div>
            ))}
      </div>
      <div className="checkout-form">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="btn-cart" onClick={handlePayment}>
          Pay via Instagram →
        </button>
        <button
          className="btn-cart"
          onClick={clearCart}
          style={{ background: "#aaa" }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
