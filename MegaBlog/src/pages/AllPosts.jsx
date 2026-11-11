import { useEffect, useState } from "react";
import service from "../appWrite/conf.js";
import { Container, PostCard } from "../Components/index.js";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => { service.getPosts().then((result) => setPosts(result?.documents || [])).finally(() => setLoading(false)); }, []);
  const filtered = posts.filter((post) => post.title?.toLowerCase().includes(search.toLowerCase()));
  return <main className="page-section"><Container>
    <div className="page-heading"><span className="eyebrow">THE READING ROOM</span><h1>Stories worth<br /><span className="gradient-text">staying for.</span></h1><p>Explore notes, perspectives, and ideas from the MegaBlog community.</p></div>
    <div className="search-wrap glass"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search stories by title…" aria-label="Search stories" /></div>
    {loading ? <div className="empty-state glass">Loading stories…</div> : filtered.length ? <div className="post-grid">{filtered.map((post) => <PostCard key={post.$id} post={post} />)}</div> : <div className="empty-state glass"><h3>No stories found.</h3><p>Try another search or come back soon.</p></div>}
  </Container></main>;
}