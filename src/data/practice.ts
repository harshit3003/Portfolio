export interface PracticePlatform {
  id: "leetcode" | "codechef";
  name: string;
  /** Numeric part animated by <CountUp />. */
  count: number;
  suffix: string;
  topics: string[];
  href: string;
  placeholder?: boolean;
}

export const practice: PracticePlatform[] = [
  {
    id: "leetcode",
    name: "LeetCode",
    count: 250,
    suffix: "+",
    topics: ["data structures", "algorithms", "arrays", "strings", "stacks", "queues", "dynamic programming"],
    href: "https://leetcode.com/u/harshit_3003/",
  },
  {
    id: "codechef",
    name: "CodeChef",
    count: 250,
    suffix: "+",
    topics: ["data structures", "algorithms", "logical reasoning"],
    // TODO: replace "#" with your CodeChef profile URL
    href: "#",
    placeholder: true,
  },
];
