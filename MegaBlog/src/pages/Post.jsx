import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import service from "../appWrite/conf.js";
import { Container, Button } from "../Components/index.js";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => { setLoading(true); service.getPost(slug).then(setPost).finally(() => setLoading(false)); }, [slug]);
  const isOwner = post && user?.$id === post.userId;
  const remove = async () => {
    if (!window.confirm("Delete this story permanently?")) return;
    const success = await service.deletePost(post.$id);
    if (success) {
      if (post.featuredImage) await service.deleteFile(post.featuredImage);
      navigate("/all-posts");
    }
  };
  if (loading) return <main className="page-section"><Container><div className="empty-state glass">Opening story…</div></Container></main>;
  if (!post) return <main className="page-section"><Container><div className="empty-state glass"><h2>Story not found.</h2><Link className="text-link" to="/all-posts">Back to stories ↗</Link></div></Container></main>;
  let imageUrl = "";
  if (post.featuredImage) { try { imageUrl = service.getFilePreview(post.featuredImage).toString(); } catch { /* missing image */ } }
  return <main className="page-section"><Container className="article-container">
    <Link to="/all-posts" className="back-link">← All stories</Link>
    {imageUrl && <img className="article-cover" src={imageUrl} alt={post.title} />}
    <article className="article-content">
      <span className="eyebrow">MEGABLOG JOURNAL · {new Date(post.$createdAt).toLocaleDateString()}</span>
      <h1>{post.title}</h1>
      <div className="article-byline"><span className="byline-avatar">{(post.userId || "M").slice(0, 1).toUpperCase()}</span><span>Written by a MegaBlog creator</span></div>
      {isOwner && <div className="article-admin"><Button variant="danger" onClick={remove}>Delete story</Button></div>}
      <div className="article-body">{parse(post.content || "")}</div>
    </article>
  </Container></main>;
}