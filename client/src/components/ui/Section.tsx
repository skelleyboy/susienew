import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  background?: "white" | "muted" | "dark";
}

export function Section({ 
  children, 
  container = true, 
  className, 
  background = "white",
  ...props 
}: SectionProps) {
  const bgClasses = {
    white: "bg-background",
    muted: "bg-muted",
    dark: "bg-primary text-white"
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "py-24 md:py-40", // Increased vertical spacing for luxury feel
        bgClasses[background],
        className
      )} 
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4 md:px-6">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
}
