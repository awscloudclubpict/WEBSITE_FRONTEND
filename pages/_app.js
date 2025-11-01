// pages/_app.js
import '../styles/globals.css';
import '../styles/blogs.css'
import "@/styles/event_style.css"
import "@/styles/about_style.css";
import "@/styles/memebers_style.css";
import "@/styles/signup.css";
import "../styles/animated-bg.css";            // <-- add
import AnimatedBackground from "../components/AnimatedBackground"; // <-- add

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AnimatedBackground count={5} />
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}