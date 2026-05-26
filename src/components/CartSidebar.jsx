import { useCart } from "../context/CartContext";
import { useState } from "react";

const CartSidebar = () => {
  const { cart, clearCart, isOpen, closeCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");

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
      JSON.stringify({ name, address, state, cart }),
    );
    window.location.href = "https://instagram.com/cgee_here";
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button onClick={closeCart}>✖</button>
      </div>
      <div className="cart-items">
        {cart.length === 0
          ? "Cart empty"
          : cart.map((item) => (
              <div key={item.id + item.selectedSize} className="cart-item">
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
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button className="btn-cart" onClick={handlePayment}>
          Pay via Instagram →
        </button>
        <button className="btn-cart" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
