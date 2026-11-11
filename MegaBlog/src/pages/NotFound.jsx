import { Link } from "react-router-dom";
import { Container } from "../Components/index.js";

export default function NotFound() {
  return <main className="page-section"><Container><div className="empty-state glass not-found"><span className="eyebrow">404 · LOST IN THOUGHT</span><h1>Nothing to see<br /><span className="gradient-text">over here.</span></h1><p>This page may have wandered off.</p><Link to="/" className="button button-primary">Back to home ↗</Link></div></Container></main>;
}