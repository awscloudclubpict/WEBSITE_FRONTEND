// pages/_app.js
import '../styles/globals.css';
import '../styles/blogs.css'
import "@/styles/event_style.css"
import "@/styles/about_style.css";
import "@/styles/memebers_style.css";
import "@/styles/signup.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}