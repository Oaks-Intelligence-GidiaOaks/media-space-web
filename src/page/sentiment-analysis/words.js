const rawWords = [
  { text: "told", value: 64 },
  { text: "mistake", value: 18 },
  { text: "thought", value: 16 },
  { text: "bad", value: 17 },
  { text: "experience", value: 25 },
  { text: "development", value: 22 },
  { text: "react", value: 27 },
  { text: "javascript", value: 30 },
  { text: "coding", value: 18 },
  { text: "project", value: 14 },
  { text: "design", value: 19 },
  { text: "frontend", value: 20 },
  { text: "backend", value: 12 },
  { text: "web", value: 23 },
  { text: "application", value: 15 },
  { text: "cloud", value: 13 },
  { text: "service", value: 21 },
  { text: "platform", value: 24 },
  { text: "database", value: 28 },
  { text: "performance", value: 29 },
  { text: "server", value: 26 },
  { text: "client", value: 31 },
  { text: "api", value: 32 },
  { text: "component", value: 33 },
  { text: "library", value: 34 },
  { text: "framework", value: 35 },
  { text: "architecture", value: 36 },
  { text: "integration", value: 37 },
  { text: "deployment", value: 38 },
  { text: "testing", value: 39 },
  { text: "debugging", value: 40 },
  { text: "optimization", value: 41 },
  { text: "security", value: 42 },
  { text: "scalability", value: 43 },
  { text: "maintenance", value: 44 },
  { text: "versioning", value: 45 },
  { text: "documentation", value: 46 },
  { text: "support", value: 47 },
  { text: "user", value: 48 },
  { text: "interface", value: 49 },
  { text: "experience", value: 50 },
  { text: "agile", value: 51 },
  { text: "scrum", value: 52 },
  { text: "kanban", value: 53 },
  { text: "continuous", value: 54 },
  { text: "integration", value: 55 },
  { text: "delivery", value: 56 },
  { text: "devops", value: 57 },
  { text: "monitoring", value: 58 },
  { text: "logging", value: 59 },
  { text: "analytics", value: 60 },
  { text: "workflow", value: 61 },
  { text: "automation", value: 62 },
  { text: "configuration", value: 63 },
];

// Normalize the values
const maxWordValue = Math.max(...rawWords.map((w) => w.value));
const minWordValue = Math.min(...rawWords.map((w) => w.value));

const words = rawWords.map((word) => {
  const normalizedValue =
    ((word.value - minWordValue) / (maxWordValue - minWordValue)) * 100;
  return {
    ...word,
    value: Math.round(normalizedValue),
  };
});

export default words;
