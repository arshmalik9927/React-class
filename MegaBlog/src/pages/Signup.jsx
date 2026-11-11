import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appWrite/auth.js";
import { login } from "../Store/authSlice.js";
import { AuthLayout, Button, Input } from "../Components/index.js";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      await authService.createAccount(form);
      const user = await authService.getCurrentUser();
      if (user) { dispatch(login(user)); navigate("/"); }
    } catch (err) { setError(err.message || "Unable to create your account."); }
    finally { setBusy(false); }
  };

  return <AuthLayout authentication={false}><div className="auth-card glass">
    <span className="eyebrow">MAKE YOURSELF AT HOME</span><h1>Your voice.<br /><span className="gradient-text">Your space.</span></h1>
    <p className="auth-subtitle">Create an account and give your ideas a place to live.</p>
    <form onSubmit={submit} className="auth-form">
      <Input label="Your name" name="name" placeholder="Alex Morgan" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Password" name="password" type="password" placeholder="At least 8 characters" minLength={8} autoComplete="new-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {error && <p className="form-error">{error}</p>}
      <Button type="submit" disabled={busy} className="button-full">{busy ? "Creating account…" : "Create account"} <span>↗</span></Button>
    </form>
    <p className="auth-switch">Already a member? <Link to="/login">Sign in</Link></p>
  </div></AuthLayout>;
}