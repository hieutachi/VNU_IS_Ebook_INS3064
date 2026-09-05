import { SectionWrapper } from "@/components/SectionWrapper";
import { TaskCard } from "@/components/TaskCard";

const tasks = [
  {
    id: 1,
    title: "BMI Calculator",
    description: "Full BMI calculation with categorization logic.",
    requirements: [
      "Define function calculateBMI($kg, $m)",
      "Logic: BMI = kg / (m * m)",
      "Determine Category: <18.5 Under, 18.5-24.9 Normal, 25+ Over"
    ],
    outputExample: '"BMI: 22.1 (Normal)"'
  },
  {
    id: 2,
    title: "Student List",
    description: "Display a list of students in an HTML table.",
    requirements: [
      "Multi-dimensional array: [['name'=>'A', 'grade'=>90], ...]",
      "Loop through array",
      "Print an HTML table row for each student"
    ],
    outputExample: "HTML Table"
  },
  {
    id: 3,
    title: "Prime Seeker",
    description: "Find and print all prime numbers between 1 and 100.",
    requirements: [
      "Create utility function isPrime(int $n): bool",
      "Loop 1 to 100",
      "Print number ONLY if prime"
    ],
    outputExample: "2, 3, 5, 7, 11..."
  },
  {
    id: 4,
    title: "Scoreboard",
    description: "Process an array of scores to find stats and top performers.",
    requirements: [
      "Input: Array of random integers",
      "Calculate: Average, Max, Min",
      "Filter: Create new array of scores > Average"
    ],
    outputExample: '"Avg: 75, Top: [80, 90]"'
  }
];

export function ProjectsSection() {
  return (
    <SectionWrapper 
      id="projects" 
      title="Mini Projects" 
      subtitle="Combine your skills. These scripts should be standalone and robust."
      badge="Part 4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} difficulty="Hard" className="min-h-[250px]" />
        ))}
      </div>
    </SectionWrapper>
  );
}
