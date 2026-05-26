import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const NewsletterPopup = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== REPLACE WITH YOUR REAL VALUES =====
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvyganb";
  // ========================================

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("newsletter_seen");
    if (!alreadySeen) {
      const timer = setTimeout(() => setVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!formspreeRes.ok) {
        throw new Error("Formspree submission failed");
      }

      toast.success("Thanks for subscribing! Check your email for exclusive updates.");
      sessionStorage.setItem("newsletter_seen", "true");
      setVisible(false);
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Could not save subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-popup" onClick={() => setVisible(false)}>
          ✖
        </button>
        <h3>Join the Multiverse ✨</h3>
        <p>Get 10% off your first order + exclusive drops</p>
        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
