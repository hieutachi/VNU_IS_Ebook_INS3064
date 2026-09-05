import { cn } from "@/lib/utils";
import { Terminal, Code2, FolderTree, Play } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  const [location] = useLocation();

  const navItems = [
    { name: "Overview", path: "/" },
    { name: "Warm-up", path: "/warmups" },
    { name: "Core", path: "/core" },
    { name: "Functions", path: "/functions" },
    { name: "Projects", path: "/projects" },
    { name: "Submit", path: "/submit" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-mono text-lg">
              PHP_Homework_S02
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "transition-colors hover:text-foreground/80 font-mono",
                  location === item.path ? "text-primary" : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search or extra tools could go here */}
          </div>
          <nav className="flex items-center">
             <Button variant="ghost" size="icon" className="md:hidden">
                <FolderTree className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
             </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Code2 className="h-6 w-6 text-muted-foreground" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for PHP Session 02 Practice. 
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-right font-mono">
          &lt;?php echo "Happy Coding!"; ?&gt;
        </p>
      </div>
    </footer>
  );
}
