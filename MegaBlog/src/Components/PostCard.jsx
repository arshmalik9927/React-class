import { Link } from "react-router-dom";
import service from "../appWrite/conf.js";

export default function PostCard({ post }) {
  const imageUrl = post.featuredImage
    ? (() => { try { return service.getFilePreview(post.featuredImage).toString(); } catch { return ""; } })()
    : "";

  return (
    <article className="post-card glass">
      <Link to={`/post/${post.$id}`} className="post-image-wrap">
        {imageUrl ? <img src={imageUrl} alt={post.title} className="post-image" /> : <div className="post-image-placeholder"><span>MB</span></div>}
      </Link>
      <div className="post-card-body">
        <span className="eyebrow">FIELD NOTES · {new Date(post.$createdAt).toLocaleDateString()}</span>
        <h3><Link to={`/post/${post.$id}`}>{post.title}</Link></h3>
        <p>{(post.content || "").replace(/<[^>]*>/g, " ").slice(0, 135)}{(post.content || "").length > 135 ? "…" : ""}</p>
        <Link className="read-link" to={`/post/${post.$id}`}>Read story <span>↗</span></Link>
      </div>
    </article>
  );
}