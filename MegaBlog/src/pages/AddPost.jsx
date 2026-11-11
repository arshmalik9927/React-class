import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../appWrite/conf.js";
import { Button, Container, Input } from "../Components/index.js";

export default function AddPost() {
  const user = useSelector((state) => state.auth.userData);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault(); setError(""); setBusy(true);
    let uploadedImage;
    try {
      if (image) {
        uploadedImage = await service.uploadFile(image);
        if (!uploadedImage) throw new Error("Image upload failed. Check your Appwrite Storage permissions.");
      }
      const post = await service.createPost({
        title: title.trim(),
        content,
        featuredImage: uploadedImage?.$id || "",
        status: "active",
        userId: user?.$id,
      });
      if (!post) throw new Error("Post could not be saved. Check your Appwrite Database permissions and collection attributes.");
      navigate(`/post/${post.$id}`);
    } catch (err) { setError(err.message || "Something went wrong."); }
    finally { setBusy(false); }
  };

  return <main className="page-section"><Container className="editor-container">
    <div className="page-heading compact"><span className="eyebrow">THE CREATOR STUDIO</span><h1>Make something<br /><span className="gradient-text">meaningful.</span></h1><p>Every great story starts with a blank page.</p></div>
    <form className="editor-card glass" onSubmit={submit}>
      <Input label="Story title" name="title" placeholder="Give your story a title…" required maxLength={180} value={title} onChange={(e) => setTitle(e.target.value)} />
      <label className="field"><span className="field-label">Cover image <span className="optional-label">OPTIONAL</span></span><input className="file-input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />{image && <span className="file-name">{image.name}</span>}</label>
      <label className="field"><span className="field-label">Your story</span><textarea className="glass-input editor-textarea" placeholder="Start writing here…" required rows={12} value={content} onChange={(e) => setContent(e.target.value)} /></label>
      {error && <p className="form-error">{error}</p>}
      <div className="editor-actions"><span className="editor-note">Your story will be published immediately.</span><Button type="submit" disabled={busy}>{busy ? "Publishing…" : "Publish story"} <span>↗</span></Button></div>
    </form>
  </Container></main>;
}