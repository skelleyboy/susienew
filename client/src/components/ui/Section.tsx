import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
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
    <section 
      className={cn(
        "py-20 md:py-32",
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
    </section>
  );
}
