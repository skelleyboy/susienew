import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { useRoute, Link } from "wouter";
import { BLOG_POSTS } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import NotFound from "@/pages/not-found";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:id");
  const id = params?.id ? parseInt(params.id) : null;
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-40 pb-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest text-xs font-semibold mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-6 font-light tracking-wide">
            <span className="flex items-center gap-2 text-primary font-medium uppercase tracking-wider text-xs">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-stone max-w-none 
            prose-headings:font-serif prose-headings:font-light prose-headings:mt-16 prose-headings:mb-8 prose-headings:text-3xl
            prose-p:font-light prose-p:leading-loose prose-p:mb-8 prose-p:text-gray-600
            prose-strong:font-medium prose-strong:text-gray-900
            prose-li:font-light prose-li:text-gray-600 prose-li:leading-loose
            first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-serif first-letter:text-primary first-letter:leading-[0.8]">
            {/* Render HTML content safely */}
            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
          </div>
          
          <div className="mt-20 pt-10 border-t border-gray-100">
            <h3 className="font-serif text-2xl mb-8 font-light">Continue Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group block p-6 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white">
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">{relatedPost.category}</p>
                  <h4 className="font-serif text-xl group-hover:text-primary transition-colors leading-snug">{relatedPost.title}</h4>
                  <p className="text-muted-foreground text-sm mt-3 line-clamp-2 font-light">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}