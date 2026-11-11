import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appWrite/auth.js";
import { login } from "../Store/authSlice.js";
import { AuthLayout, Button, Input } from "../Components/index.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      await authService.login(form);
      const user = await authService.getCurrentUser();
      if (user) { dispatch(login(user)); navigate("/"); }
    } catch (err) { setError(err.message || "Unable to log in. Check your details."); }
    finally { setBusy(false); }
  };

  return <AuthLayout authentication={false}><div className="auth-card glass">
    <span className="eyebrow">WELCOME BACK</span><h1>Good to see<br /><span className="gradient-text">you again.</span></h1>
    <p className="auth-subtitle">Sign in to pick up where your ideas left off.</p>
    <form onSubmit={submit} className="auth-form">
      <Input label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {error && <p className="form-error">{error}</p>}
      <Button type="submit" disabled={busy} className="button-full">{busy ? "Signing in…" : "Sign in"} <span>↗</span></Button>
    </form>
    <p className="auth-switch">New to MegaBlog? <Link to="/signup">Create an account</Link></p>
  </div></AuthLayout>;
}