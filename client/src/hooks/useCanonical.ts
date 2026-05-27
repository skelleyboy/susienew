import { useEffect } from "react";
import { useLocation } from "wouter";

export function useCanonical() {
  const [location] = useLocation();

  useEffect(() => {
    // Remove trailing slash if present for canonical
    const path = location === "/" ? "" : location.replace(/\/$/, "");
    const canonicalUrl = `https://susiesharak.com${path}`;
    
    let link = document.querySelector("link[rel='canonical']");
    if (link) {
      link.setAttribute("href", canonicalUrl);
    } else {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonicalUrl);
      document.head.appendChild(link);
    }
  }, [location]);
}
