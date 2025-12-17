import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import { BLOG_POSTS } from "@/data/blog";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-40 pb-20 bg-[#0f1115] text-white text-center">
        <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">Insights & News</span>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 font-light tracking-tight">The Journal</h1>
        <p className="text-white/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
          Expert perspectives on luxury real estate, market trends, and lifestyle in Oakland and Macomb Counties.
        </p>
      </div>

      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group cursor-pointer block h-full">
                <Card className="h-full border-none shadow-none bg-transparent rounded-none overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                    {/* Placeholder for images if they don't exist yet, using a colored div or the image if available */}
                    <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700 ease-out">
                       {/* If we had real images we would render them here. For now, a placeholder effect */}
                       {/* Using a subtle gradient or pattern could also work */}
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                      {post.category}
                    </div>
                  </div>
                  
                  <CardHeader className="p-0 mb-4 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-light tracking-wide">
                      <span>{post.date}</span>
                      <span className="w-px h-3 bg-border" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-serif text-2xl leading-tight group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="p-0 mb-6 flex-grow">
                    <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="p-0 mt-auto">
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-primary/30 pb-1 group-hover:border-primary transition-colors duration-300">
                      Read Article
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>
      
      <Footer />
    </div>
  );
}