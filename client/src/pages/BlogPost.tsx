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
      
      <div className="relative h-[60vh] min-h-[500px] w-full bg-black/20">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm mb-6 font-light tracking-wide">
              <span className="flex items-center gap-2">
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
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:font-light prose-p:font-light prose-p:leading-relaxed prose-img:rounded-sm first-letter:float-left first-letter:text-5xl first-letter:pr-4 first-letter:font-serif first-letter:text-primary">
            {/* Render HTML content safely */}
            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
          </div>
          
          <div className="mt-20 pt-10 border-t border-gray-100">
            <h3 className="font-serif text-2xl mb-8 font-light">Continue Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group block">
                  <div className="aspect-[3/2] overflow-hidden bg-gray-100 mb-4">
                     <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{relatedPost.category}</p>
                  <h4 className="font-serif text-xl group-hover:text-primary transition-colors">{relatedPost.title}</h4>
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