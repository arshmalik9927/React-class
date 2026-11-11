import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="brand"><span className="brand-mark">M</span><span>Mega<span className="brand-accent">Blog</span></span></Link>
        <p>Make space for ideas that matter.</p>
        <span className="footer-copy">© {new Date().getFullYear()} MegaBlog</span>
      </div>
    </footer>
  );
}