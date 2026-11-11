import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appWrite/auth.js";
import { logout } from "../../Store/authSlice.js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="nav-shell glass">
        <Link to="/" className="brand" aria-label="MegaBlog home">
          <span className="brand-mark">M</span>
          <span>Mega<span className="brand-accent">Blog</span></span>
        </Link>
        <button className="mobile-menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <nav className={`nav-links${menuOpen ? " open" : ""}`}>
          <NavLink to="/" className={navClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/all-posts" className={navClass} onClick={() => setMenuOpen(false)}>Explore</NavLink>
          {status && <NavLink to="/add-post" className={navClass} onClick={() => setMenuOpen(false)}>Write</NavLink>}
          {!status ? (
            <>
              <Link to="/login" className="nav-login" onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/signup" className="button button-primary button-small" onClick={() => setMenuOpen(false)}>Get started <span>↗</span></Link>
            </>
          ) : (
            <button className="button button-ghost button-small" onClick={handleLogout}>Log out</button>
          )}
        </nav>
      </div>
    </header>
  );
}