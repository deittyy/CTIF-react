import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const NewsletterPopup = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds, but only once per session
    const alreadySeen = sessionStorage.getItem("newsletter_seen");
    if (!alreadySeen) {
      const timer = setTimeout(() => setVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace this with YOUR Formspree endpoint
    const formspreeUrl = "https://formspree.io/f/xwvyganb";

    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Thanks for subscribing! Check your email.");
        sessionStorage.setItem("newsletter_seen", "true");
        setVisible(false);
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
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
        <h3>Join the CTIFsss ✨</h3>
        <p>Get 10% off your first order + exclusive drops</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
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
