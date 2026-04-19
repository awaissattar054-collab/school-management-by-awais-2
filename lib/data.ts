export const stats = [
  { title: "Total Students", value: "1,284", change: "+12%" },
  { title: "Revenue", value: "$12.5k", change: "+8%" },
  { title: "Attendance", value: "94%", change: "+2%" },
  { title: "Pending Fees", value: "$2.1k", change: "-3%" },
];

export const students = [
  { name: "Ali Khan", grade: "10th", status: "Active" },
  { name: "Sara Ahmed", grade: "9th", status: "Active" }
];

export function getAIResponse(query: string) {
  if (query.includes("performance")) {
    return "Overall student performance is improving.";
  }
  return "System working normally.";
}
