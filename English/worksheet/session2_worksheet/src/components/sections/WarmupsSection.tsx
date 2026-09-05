import { SectionWrapper } from "@/components/SectionWrapper";
import { TaskCard } from "@/components/TaskCard";

const tasks = [
  {
    id: 1,
    title: "Hello Strings",
    description: "Create variables for $name and $city. Use concatenation to print a sentence.",
    requirements: ["Concatenate strings", "Use variables"],
    inputExample: '"Alice", "Paris"',
    outputExample: '"Alice lives in Paris."'
  },
  {
    id: 2,
    title: "Math Ops",
    description: "Declare $x=10, $y=5. Print result of addition, subtraction, multiplication, division.",
    requirements: ["Arithmetic operators", "Print 4 results"],
    outputExample: "15, 5, 50, 2"
  },
  {
    id: 3,
    title: "Casting",
    description: "Start with string '25.50'. Cast to float, then to int. Print types using gettype().",
    requirements: ["Type casting", "gettype()"],
    outputExample: "float(25.5), integer(25)"
  },
  {
    id: 4,
    title: "Truthiness",
    description: "Create $isOnline = true. Use a ternary operator to print status.",
    requirements: ["Boolean logic", "Ternary operator"],
    outputExample: '"User is Online"'
  },
  {
    id: 5,
    title: "Array Init",
    description: "Create an indexed array of 3 fruits. Print the second item.",
    requirements: ["Indexed array", "Access by index"],
    inputExample: '["Apple", "Banana", "Pear"]',
    outputExample: '"Banana"'
  },
  {
    id: 6,
    title: "Sentence Builder",
    description: "Use the assignment operator .= to append 3 words to a variable $sentence.",
    requirements: ["Assignment operator (.=)", "String manipulation"],
    outputExample: '"PHP is fun"'
  },
  {
    id: 7,
    title: "Strict Check",
    description: "Compare integer 5 and string '5' using both == and ===. Print results.",
    requirements: ["Comparison operators", "Loose vs Strict"],
    outputExample: "Equal (True), Identical (False)"
  },
  {
    id: 8,
    title: "Logic Gate",
    description: "Check if $age > 18 AND $hasTicket are both true. Print 'Enter' or 'Deny'.",
    requirements: ["Logical AND (&&)", "Conditionals"],
    inputExample: "20, true",
    outputExample: '"Enter"'
  }
];

export function WarmupsSection() {
  return (
    <SectionWrapper 
      id="warmups" 
      title="Warm-up Exercises" 
      subtitle="Complete these quick tasks to warm up your syntax memory. Goal: 5–10 minutes per task."
      badge="Part 1"
      className="bg-card/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} difficulty="Easy" />
        ))}
      </div>
    </SectionWrapper>
  );
}
