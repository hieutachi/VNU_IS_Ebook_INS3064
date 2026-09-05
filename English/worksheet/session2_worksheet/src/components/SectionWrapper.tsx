import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ 
  id, 
  title, 
  subtitle, 
  badge, 
  children, 
  className,
  ...props 
}: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={cn("py-16 md:py-24 relative overflow-hidden", className)} 
      {...props}
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-start gap-4 mb-10 md:mb-16 max-w-3xl">
          {badge && (
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-primary border-primary/30 bg-primary/5">
              {badge}
            </Badge>
          )}
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl font-mono text-foreground/90">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-[85%] border-l-2 border-primary/30 pl-4">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-secondary/5 blur-[80px] rounded-full pointer-events-none" />
    </section>
  );
}
