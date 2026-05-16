// BackToTop.jsx
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => setVisible(window.scrollY > 300));
    return () => window.removeEventListener("scroll", () => {});
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return visible ? (
    <button className="back-to-top" onClick={scrollToTop}>
      <FiArrowUp />
    </button>
  ) : null;
};
export default BackToTop;
