import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth.js";
import { login, logout } from "./Store/authSlice.js";
import { Header, Footer, AuthLayout } from "./Components/index.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;
    authService.getCurrentUser()
      .then((userData) => {
        if (!active) return;
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .catch(() => { if (active) dispatch(logout()); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [dispatch]);

  if (loading) {
    return <div className="app-loading"><span className="loading-mark">M</span><span>Preparing your space…</span></div>;
  }

  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/add-post" element={<AuthLayout><AddPost /></AuthLayout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;