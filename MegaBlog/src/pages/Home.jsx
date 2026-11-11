import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../appWrite/conf.js";
import { Container, PostCard } from "../Components/index.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts().then((result) => setPosts(result?.documents || [])).finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <Container className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow"><span className="pulse-dot" /> A HOME FOR CURIOUS MINDS</span>
            <h1>Write beyond<br /><span className="gradient-text">the ordinary.</span></h1>
            <p className="hero-description">A calmer corner of the internet for stories, sharp ideas, and the things worth sharing.</p>
            <div className="hero-actions">
              <Link to="/all-posts" className="button button-primary">Explore stories <span>↗</span></Link>
              <Link to="/signup" className="button button-ghost">Start writing</Link>
            </div>
            <div className="hero-meta"><div className="avatar-stack"><i>J</i><i>A</i><i>M</i><i>+</i></div><span>Made for people with something to say</span></div>
          </div>
          <div className="hero-art" aria-label="Decorative glass editorial card">
            <div className="floating-card glass">
              <div className="floating-card-top"><span className="mini-mark">M.</span><span className="live-label">YOUR NEXT CHAPTER</span></div>
              <div className="abstract-art"><div className="art-ring ring-a" /><div className="art-ring ring-b" /><div className="art-core" /></div>
              <div className="floating-card-bottom"><span>Ideas become stories.</span><span>✳</span></div>
            </div>
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          </div>
        </Container>
      </section>

      <section className="content-section">
        <Container>
          <div className="section-heading">
            <div><span className="eyebrow">THE LATEST</span><h2>Fresh from the community<span className="heading-period">.</span></h2></div>
            <Link to="/all-posts" className="text-link">View all stories <span>↗</span></Link>
          </div>
          {loading ? <div className="empty-state glass">Gathering the latest stories…</div> :
            posts.length ? <div className="post-grid">{posts.slice(0, 3).map((post) => <PostCard key={post.$id} post={post} />)}</div> :
            <div className="empty-state glass"><span className="empty-icon">✳</span><h3>The first story is waiting.</h3><p>Connect your Appwrite collection and publish the first post.</p><Link to="/signup" className="text-link">Join the community ↗</Link></div>}
        </Container>
      </section>
      <section className="quote-section"><Container><p>“The first draft is just you telling yourself the story.”</p><span>— TERRY PRATCHETT</span></Container></section>
    </main>
  );
}