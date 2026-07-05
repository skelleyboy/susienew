import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Remove static SEO content for real users once JS executes
const seoContent = document.getElementById("ai-seo-content");
if (seoContent) {
  seoContent.remove();
}

createRoot(document.getElementById("root")!).render(<App />);
