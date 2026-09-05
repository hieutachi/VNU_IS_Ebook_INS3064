import { SectionWrapper } from "@/components/SectionWrapper";
import { TaskCard } from "@/components/TaskCard";

const tasks = [
  {
    id: 1,
    title: "Grade Bot",
    description: "Use if/elseif/else to classify a score (0-100).",
    requirements: [">=90: A", ">=80: B", ">=70: C", "Else: F"],
    inputExample: "85",
    outputExample: '"Grade: B"'
  },
  {
    id: 2,
    title: "Day Planner",
    description: "Use a switch statement. Input 1-7 converts to Monday-Sunday. Default: 'Invalid'.",
    requirements: ["Switch statement", "Default case"],
    inputExample: "3",
    outputExample: '"Wednesday"'
  },
  {
    id: 3,
    title: "Multi-Table",
    description: "Use nested for-loops to generate a 5x5 multiplication grid (1 to 5). Print as simple text or HTML.",
    requirements: ["Nested loops", "Grid output"],
    outputExample: "1 2 3... / 2 4 6..."
  },
  {
    id: 4,
    title: "Cart Total",
    description: "Use foreach to iterate an array of item prices. Calculate sum.",
    requirements: ["Foreach loop", "Accumulator"],
    inputExample: "[10, 20, 5]",
    outputExample: '"Total: 35"'
  },
  {
    id: 5,
    title: "Countdown",
    description: "Use a while loop to print numbers from 10 down to 1, then 'Liftoff!'.",
    requirements: ["While loop", "Decrement"],
    outputExample: "10, 9... 1, Liftoff!"
  },
  {
    id: 6,
    title: "Even Filter",
    description: "Use a for loop (1-20). Print only even numbers using an if ($i % 2 == 0) check.",
    requirements: ["For loop", "Modulo operator"],
    outputExample: "2, 4, 6, 8..."
  },
  {
    id: 7,
    title: "Array Reverse",
    description: "Manually reverse an array of 5 numbers into a new array (try without array_reverse).",
    requirements: ["Array manipulation", "Algorithm logic"],
    inputExample: "[1, 2, 3]",
    outputExample: "[3, 2, 1]"
  },
  {
    id: 8,
    title: "FizzBuzz",
    description: "Loop 1-50. Divisible by 3='Fizz', 5='Buzz', both='FizzBuzz'. Else print number.",
    requirements: ["Standard FizzBuzz logic", "Conditionals"],
    outputExample: "1, 2, Fizz, 4, Buzz..."
  }
];

export function CoreChallengesSection() {
  return (
    <SectionWrapper 
      id="core" 
      title="Core Challenges" 
      subtitle="Focus on logic flow. You must implement the specific control structure requested in the description."
      badge="Part 2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} difficulty="Medium" />
        ))}
      </div>
    </SectionWrapper>
  );
}
