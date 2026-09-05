import { useEffect } from "react";
import { Header, Footer } from "@/components/Layout";
import { WarmupsSection } from "@/components/sections/WarmupsSection";
import { CoreChallengesSection } from "@/components/sections/CoreChallengesSection";
import { FunctionsSection } from "@/components/sections/FunctionsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SubmitSection } from "@/components/sections/SubmitSection";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import gridBg from "@/assets/grid-bg.jpg";

interface HomeProps {
  targetSection?: string;
}

export default function Home({ targetSection }: HomeProps) {
  useEffect(() => {
    if (targetSection) {
      const elem = document.getElementById(targetSection);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [targetSection]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-border/50">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
             <img src={heroBg} alt="Abstract Code Background" className="w-full h-full object-cover opacity-30" />
             <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
             <div className="absolute inset-0 bg-[url('@/assets/grid-bg.jpg')] opacity-10 mix-blend-overlay" />
          </div>

          <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">
            <div className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Session 02 Homework
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-gray-400 drop-shadow-sm mb-6 font-mono">
              PHP Practice Worksheet
            </h1>
            
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl mb-10 leading-relaxed">
              Master variables, loops, and functions with this comprehensive challenge set. 
              <br className="hidden md:inline" /> Estimated completion time: <span className="text-foreground font-semibold">2–3 hours</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button size="lg" className="font-mono text-base h-12 px-8 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all" asChild>
                <a href="#warmups">Start Coding</a>
              </Button>
              <Button size="lg" variant="outline" className="font-mono text-base h-12 px-8 backdrop-blur-sm bg-background/30 hover:bg-background/50" asChild>
                <a href="#submit">Submission Guide</a>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </section>

        {/* Content Sections */}
        <div className="relative">
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url(${gridBg})`, backgroundSize: 'cover' }} />
          
          <WarmupsSection />
          <div className="container px-4 md:px-6"><div className="h-px w-full bg-border/50" /></div>
          
          <CoreChallengesSection />
          <div className="container px-4 md:px-6"><div className="h-px w-full bg-border/50" /></div>
          
          <FunctionsSection />
          <div className="container px-4 md:px-6"><div className="h-px w-full bg-border/50" /></div>
          
          <ProjectsSection />
          <div className="container px-4 md:px-6"><div className="h-px w-full bg-border/50" /></div>
          
          <SubmitSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
