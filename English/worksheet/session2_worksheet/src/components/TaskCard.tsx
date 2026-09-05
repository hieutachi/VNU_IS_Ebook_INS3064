import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TerminalSquare, FileCode } from "lucide-react";

interface TaskCardProps {
  id: string | number;
  title: string;
  description: string;
  requirements?: string[];
  inputExample?: string;
  outputExample?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  className?: string;
}

export function TaskCard({ 
  id, 
  title, 
  description, 
  requirements, 
  inputExample, 
  outputExample, 
  difficulty = "Easy",
  className 
}: TaskCardProps) {
  
  const difficultyColor = {
    Easy: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    Medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    Hard: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };

  return (
    <Card className={cn("flex flex-col h-full border-l-4 border-l-primary/50 bg-card/50 backdrop-blur-sm transition-all hover:border-l-primary hover:shadow-lg", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">{String(id).padStart(2, '0')}</Badge>
            <CardTitle className="font-mono text-lg text-primary">{title}</CardTitle>
          </div>
          <Badge variant="secondary" className={cn("font-mono text-[10px]", difficultyColor[difficulty])}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="pt-2 text-foreground/80">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-4">
        {requirements && requirements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <TerminalSquare className="h-3 w-3" /> Requirements
            </h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground ml-1">
              {requirements.map((req, idx) => (
                <li key={idx} className="marker:text-primary/50">{req}</li>
              ))}
            </ul>
          </div>
        )}
        
        {(inputExample || outputExample) && (
          <div className="rounded-md bg-muted/50 p-3 font-mono text-xs mt-4 border border-border/50">
             <div className="flex items-center gap-1.5 text-muted-foreground mb-2 border-b border-border/50 pb-1">
                <FileCode className="h-3 w-3" /> 
                <span>example_output.txt</span>
             </div>
            {inputExample && (
              <div className="mb-1">
                <span className="text-blue-400">$input</span> <span className="text-muted-foreground">=</span> <span className="text-green-400">{inputExample}</span>;
              </div>
            )}
            {outputExample && (
              <div>
                <span className="text-purple-400">// Output:</span> <span className="text-foreground/90">{outputExample}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
