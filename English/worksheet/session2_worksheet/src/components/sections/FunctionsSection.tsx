import { SectionWrapper } from "@/components/SectionWrapper";
import { TaskCard } from "@/components/TaskCard";

const tasks = [
  {
    id: 1,
    title: "Greeter",
    description: "Return a welcome message.",
    requirements: ["greet(string $name): string", "Return string"],
    inputExample: 'greet("Sam")',
    outputExample: '"Hello, Sam!"'
  },
  {
    id: 2,
    title: "Area Calc",
    description: "Calculate rectangle area.",
    requirements: ["area(float $w, float $h): float", "Math logic"],
    inputExample: "area(5.5, 2)",
    outputExample: "11.0"
  },
  {
    id: 3,
    title: "Adult Check",
    description: "Check age. Nullable param allowed.",
    requirements: ["isAdult(?int $age): bool", "Nullable handling"],
    inputExample: "isAdult(null)",
    outputExample: "False"
  },
  {
    id: 4,
    title: "Safe Divide",
    description: "Divide two numbers. Return null if denominator is 0.",
    requirements: ["safeDiv(float $a, float $b): ?float", "Zero division check"],
    inputExample: "safeDiv(10, 0)",
    outputExample: "null"
  },
  {
    id: 5,
    title: "Formatter",
    description: "Format price with default currency.",
    requirements: ["fmt(float $amt, string $c='$'): string", "Default parameter"],
    inputExample: "fmt(50)",
    outputExample: '"$50.00"'
  },
  {
    id: 6,
    title: "Pure Math",
    description: "A pure function (no side effects/echo).",
    requirements: ["add(int $a, int $b): int", "No echo/global vars"],
    outputExample: "Sum of inputs"
  }
];

export function FunctionsSection() {
  return (
    <SectionWrapper 
      id="functions" 
      title="Function Challenges" 
      subtitle="Define functions with strict types (PHP 7+) where possible. Ensure you handle edge cases."
      badge="Part 3"
      className="bg-card/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} difficulty="Medium" />
        ))}
      </div>
    </SectionWrapper>
  );
}
