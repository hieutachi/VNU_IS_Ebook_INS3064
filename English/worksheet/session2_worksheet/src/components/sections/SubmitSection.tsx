import { SectionWrapper } from "@/components/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderArchive, FileCheck, AlertTriangle } from "lucide-react";

export function SubmitSection() {
  return (
    <SectionWrapper 
      id="submit" 
      title="Submission & Grading" 
      subtitle="Follow these steps to submit your work. Plagiarism or code copying will result in a zero grade."
      badge="Final Step"
      className="bg-card/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm border-l-4 border-l-primary h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FolderArchive className="h-5 w-5 text-primary" /> Submission Check
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</div>
              <div>
                <h4 className="font-semibold text-foreground">Folder Name</h4>
                <p className="text-sm text-muted-foreground">Rename folder to <code className="bg-muted px-1 py-0.5 rounded text-primary font-mono">FirstName_LastName_S02</code>.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</div>
              <div>
                <h4 className="font-semibold text-foreground">Clean Up</h4>
                <p className="text-sm text-muted-foreground">Remove unused comments and temporary files.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">3</div>
              <div>
                <h4 className="font-semibold text-foreground">Zip & Submit</h4>
                <p className="text-sm text-muted-foreground">Compress folder to .zip format and upload to the portal.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-l-4 border-l-green-500 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileCheck className="h-5 w-5 text-green-500" /> Grading Rubric
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Warm-ups", percent: "20%", desc: "Syntax correctness" },
                { label: "Core Tasks", percent: "30%", desc: "Logic flow" },
                { label: "Functions", percent: "20%", desc: "Type safety" },
                { label: "Mini Projects", percent: "30%", desc: "Integration" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                  <div>
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">({item.desc})</span>
                  </div>
                  <span className="font-bold text-green-500 font-mono">{item.percent}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p>Warning: Plagiarism check is active. Do not copy code from classmates or online sources.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
