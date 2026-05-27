const fs = require('fs');

let blogContent = fs.readFileSync('client/src/pages/Blog.tsx', 'utf-8');

// Update blog cards on the Blog page to have the dark big text link style too
blogContent = blogContent.replace(
  '<div className="group cursor-pointer">',
  '<Link href={`/blog/${post.id}`} className="group relative h-[400px] overflow-hidden cursor-pointer bg-black flex flex-col justify-end text-left">'
);

// We need a more comprehensive regex to replace the entire card structure for the blog
const replaceBlogCard = `
            <Link key={post.id} href={\`/blog/\${post.id}\`} className="group relative h-[450px] overflow-hidden cursor-pointer bg-black flex flex-col justify-end text-left col-span-1">
              <img 
                src={getImage(post.image)} 
                alt={post.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2s] ease-out group-hover:scale-105 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute top-6 left-6 z-10 bg-white text-black px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium shadow-sm">
                {post.category}
              </div>

              <div className="relative z-10 p-8 transform transition-transform duration-700 group-hover:-translate-y-4">
                <span className="text-white/80 text-xs uppercase tracking-widest mb-4 block">
                  {post.date}
                </span>
                <h3 className="font-serif text-3xl text-white mb-4 leading-tight">
                  {post.title}
                </h3>
                <p className="text-white/80 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-8 flex items-center text-white text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>
`;

// Replace the inside of the grid
const gridStart = '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">';
const gridStartNew = '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">';
blogContent = blogContent.replace(gridStart, gridStartNew);

// This is a bit tricky to replace perfectly with simple replace, let's just rewrite the grid content
const mapStart = '{blogPosts.map((post) => (';
const mapEnd = '))}';
const mapRegex = new RegExp('\\{blogPosts\\.map\\(\\(post\\) => \\([\\s\\S]*?\\)\\)\\}', 'm');

blogContent = blogContent.replace(mapRegex, `{blogPosts.map((post) => (${replaceBlogCard}))}`);

// Make sure ArrowRight is imported
if (!blogContent.includes('ArrowRight')) {
  blogContent = blogContent.replace('import { SEO } from "@/components/SEO";', 'import { SEO } from "@/components/SEO";\nimport { ArrowRight } from "lucide-react";');
}

fs.writeFileSync('client/src/pages/Blog.tsx', blogContent);
console.log('Fixed Blog cards');
