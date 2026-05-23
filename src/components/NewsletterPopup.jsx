import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const NewsletterPopup = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== REPLACE WITH YOUR REAL VALUES =====
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvyganb";
  const EMAILJS_SERVICE_ID = "service_jut92at";
  const EMAILJS_TEMPLATE_ID = "t15r4vj";
  const EMAILJS_PUBLIC_KEY = "mBq2ptmbpwnaD2kpX";
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

    // 1. Submit to Formspree (store the email)
    try {
      const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!formspreeRes.ok) {
        throw new Error("Formspree submission failed");
      }
    } catch (error) {
      console.error("Formspree error:", error);
      toast.error("Could not save subscription. Please try again.");
      setLoading(false);
      return;
    }

    // 2. Send welcome email via EmailJS
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_email: email,
          to_name: email.split("@")[0],
          message: "Welcome to CTIF! Use code WELCOME10 for 10% off.",
        },
        EMAILJS_PUBLIC_KEY,
      );

      toast.success(
        "Thanks for subscribing! Check your inbox for a welcome message.",
      );
      sessionStorage.setItem("newsletter_seen", "true");
      setVisible(false);
      setEmail("");
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error(
        "Subscription saved, but welcome email failed. We’ll still keep you posted!",
      );
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
