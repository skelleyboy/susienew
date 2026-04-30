import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export function useSEO({ title, description, canonicalUrl, ogImage }: SEOProps) {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    const finalCanonicalUrl = canonicalUrl || window.location.href.split('?')[0];
    
    if (canonical) {
      canonical.setAttribute('href', finalCanonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', finalCanonicalUrl);
      document.head.appendChild(canonical);
    }

    // Update OpenGraph tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    updateOgTag('og:title', title);
    updateOgTag('og:description', description);
    updateOgTag('og:url', finalCanonicalUrl);
    
    if (ogImage) {
      updateOgTag('og:image', ogImage);
    }

  }, [title, description, canonicalUrl, ogImage]);
}
