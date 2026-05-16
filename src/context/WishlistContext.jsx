import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cgee_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const addToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem("cgee_wishlist", JSON.stringify(newWishlist));
      toast.success("Added to wishlist");
    } else {
      toast.info("Already in wishlist");
    }
  };

  const removeFromWishlist = (id) => {
    const newWishlist = wishlist.filter((p) => p.id !== id);
    setWishlist(newWishlist);
    localStorage.setItem("cgee_wishlist", JSON.stringify(newWishlist));
    toast.info("Removed from wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
