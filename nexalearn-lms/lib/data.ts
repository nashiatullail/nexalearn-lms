export type Course = {
  id: string;
  code: string;
  title: string;
  program: string;
  instructor: string;
  progress: number;
  color: "gold" | "teal" | "rose";
  credits: number;
  semester: string;
  lectures: { id: string; title: string; duration: string; done: boolean; youtubeId: string }[];
  handouts: { id: string; title: string; size: string }[];
};

export const courses: Course[] = [
  {
    id: "cs101",
    code: "CS-401",
    title: "Introduction to Programming",
    program: "BS Computer Science",
    instructor: "Dr. Ayesha Farooq",
    progress: 68,
    color: "gold",
    credits: 3,
    semester: "Autumn 2026",
    lectures: [
      { id: "l1", title: "Variables, data types & operators", duration: "24 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l2", title: "Control structures & loops", duration: "31 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l3", title: "Functions & scope", duration: "27 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l4", title: "Arrays & basic data structures", duration: "35 min", done: false, youtubeId: "rfscVS0vtbw" },
      { id: "l5", title: "Introduction to object-oriented thinking", duration: "29 min", done: false, youtubeId: "rfscVS0vtbw" },
    ],
    handouts: [
      { id: "h1", title: "Unit 1 — Foundations handout.pdf", size: "1.2 MB" },
      { id: "h2", title: "Unit 2 — Control flow handout.pdf", size: "980 KB" },
      { id: "h3", title: "Lab manual — Semester 1.pdf", size: "3.4 MB" },
    ],
  },
  {
    id: "bba201",
    code: "BBA-205",
    title: "Principles of Marketing",
    program: "BBA Business Administration",
    instructor: "Prof. Kamran Sheikh",
    progress: 42,
    color: "teal",
    credits: 3,
    semester: "Autumn 2026",
    lectures: [
      { id: "l1", title: "What is marketing, really?", duration: "22 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l2", title: "Understanding the consumer", duration: "26 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l3", title: "The marketing mix — 4 Ps", duration: "33 min", done: false, youtubeId: "rfscVS0vtbw" },
      { id: "l4", title: "Branding & positioning", duration: "28 min", done: false, youtubeId: "rfscVS0vtbw" },
    ],
    handouts: [
      { id: "h1", title: "Case studies — local brands.pdf", size: "2.1 MB" },
      { id: "h2", title: "Marketing mix worksheet.pdf", size: "540 KB" },
    ],
  },
  {
    id: "edu305",
    code: "EDU-305",
    title: "Educational Psychology",
    program: "B.Ed (Distance)",
    instructor: "Dr. Nasreen Bibi",
    progress: 85,
    color: "rose",
    credits: 3,
    semester: "Autumn 2026",
    lectures: [
      { id: "l1", title: "Theories of learning", duration: "30 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l2", title: "Motivation in the classroom", duration: "25 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l3", title: "Assessment & feedback", duration: "28 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l4", title: "Inclusive teaching practices", duration: "24 min", done: true, youtubeId: "rfscVS0vtbw" },
    ],
    handouts: [
      { id: "h1", title: "Reading — child development.pdf", size: "1.7 MB" },
    ],
  },
  {
    id: "eng210",
    code: "ENG-210",
    title: "Academic Writing & Composition",
    program: "BS English",
    instructor: "Ms. Sana Yousaf",
    progress: 20,
    color: "teal",
    credits: 3,
    semester: "Autumn 2026",
    lectures: [
      { id: "l1", title: "Structuring an argument", duration: "20 min", done: true, youtubeId: "rfscVS0vtbw" },
      { id: "l2", title: "Thesis statements that work", duration: "18 min", done: false, youtubeId: "rfscVS0vtbw" },
      { id: "l3", title: "Citing sources correctly", duration: "23 min", done: false, youtubeId: "rfscVS0vtbw" },
    ],
    handouts: [
      { id: "h1", title: "Style guide — APA basics.pdf", size: "620 KB" },
    ],
  },
];

export const assignments = [
  { id: "a1", course: "CS-401", title: "Assignment 2 — Loops & Functions", due: "12 Sep 2026", status: "pending" as const },
  { id: "a2", course: "BBA-205", title: "Assignment 1 — Consumer Behaviour Case Study", due: "08 Sep 2026", status: "pending" as const },
  { id: "a3", course: "EDU-305", title: "Assignment 3 — Assessment Design", due: "30 Aug 2026", status: "graded" as const, grade: "A" },
  { id: "a4", course: "ENG-210", title: "Assignment 1 — Thesis Draft", due: "25 Aug 2026", status: "submitted" as const },
  { id: "a5", course: "CS-401", title: "Assignment 1 — Data Types Practice", due: "18 Aug 2026", status: "graded" as const, grade: "A-" },
];

export const results = [
  { course: "CS-401 — Introduction to Programming", midterm: 27, assignment: 18, final: null, grade: "In progress" },
  { course: "BBA-205 — Principles of Marketing", midterm: 23, assignment: 16, final: null, grade: "In progress" },
  { course: "EDU-305 — Educational Psychology", midterm: 29, assignment: 20, final: 38, grade: "A" },
  { course: "ENG-210 — Academic Writing", midterm: null, assignment: 12, final: null, grade: "In progress" },
];

export type QuizQuestion = {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  correct: number;
};

export const quizBank: Record<string, QuizQuestion[]> = {
  cs101: [
    { id: "q1", topic: "Loops", prompt: "Which loop is best when the number of iterations is known in advance?", options: ["while", "for", "do-while", "goto"], correct: 1 },
    { id: "q2", topic: "Data types", prompt: "Which of these is NOT a primitive data type in most languages?", options: ["int", "float", "array", "boolean"], correct: 2 },
    { id: "q3", topic: "Functions", prompt: "What does a function's 'return' statement do?", options: ["Ends the program", "Sends a value back to the caller", "Restarts the loop", "Declares a variable"], correct: 1 },
    { id: "q4", topic: "Scope", prompt: "A variable declared inside a function is generally:", options: ["Global", "Local to that function", "Deleted immediately", "Always static"], correct: 1 },
  ],
  bba201: [
    { id: "q1", topic: "Marketing mix", prompt: "The 4 Ps of marketing are Product, Price, Place and:", options: ["Profit", "Promotion", "People", "Policy"], correct: 1 },
    { id: "q2", topic: "Consumer behaviour", prompt: "Understanding why customers buy is part of studying:", options: ["Consumer behaviour", "Supply chain", "Accounting", "Taxation"], correct: 0 },
    { id: "q3", topic: "Branding", prompt: "A brand's 'positioning' refers to:", options: ["Its warehouse location", "How it's perceived relative to competitors", "Its legal registration", "Its stock price"], correct: 1 },
  ],
  edu305: [
    { id: "q1", topic: "Learning theories", prompt: "Which theory emphasises learning through reinforcement?", options: ["Behaviourism", "Constructivism", "Humanism", "Connectivism"], correct: 0 },
    { id: "q2", topic: "Motivation", prompt: "Intrinsic motivation comes from:", options: ["External rewards", "Internal satisfaction and interest", "Fear of punishment", "Peer pressure only"], correct: 1 },
    { id: "q3", topic: "Assessment", prompt: "Formative assessment mainly aims to:", options: ["Assign a final grade", "Guide ongoing learning and feedback", "Rank students publicly", "Replace exams entirely"], correct: 1 },
  ],
  eng210: [
    { id: "q1", topic: "Argumentation", prompt: "A strong thesis statement should be:", options: ["Vague and broad", "Specific and arguable", "A simple fact", "A question"], correct: 1 },
    { id: "q2", topic: "Citations", prompt: "Citing sources correctly helps mainly to:", options: ["Increase word count", "Avoid plagiarism and give credit", "Make the essay longer", "Confuse the reader"], correct: 1 },
  ],
};

export type Program = {
  id: string;
  name: string;
  level: string;
  duration: string;
  semesters: number;
  feePerSemester: string;
  description: string;
  courseIds: string[];
};

export const programs: Program[] = [
  {
    id: "bscs",
    name: "BS Computer Science",
    level: "Undergraduate",
    duration: "4 years",
    semesters: 8,
    feePerSemester: "PKR 24,000",
    description: "A distance-learning computer science degree covering programming, data structures, databases and software engineering fundamentals.",
    courseIds: ["cs101"],
  },
  {
    id: "bba",
    name: "BBA Business Administration",
    level: "Undergraduate",
    duration: "4 years",
    semesters: 8,
    feePerSemester: "PKR 26,500",
    description: "A business degree covering marketing, finance, management and entrepreneurship, designed for working professionals.",
    courseIds: ["bba201"],
  },
  {
    id: "bed",
    name: "B.Ed (Distance)",
    level: "Undergraduate",
    duration: "2 years",
    semesters: 4,
    feePerSemester: "PKR 21,000",
    description: "A teaching qualification covering educational psychology, curriculum design and inclusive classroom practice.",
    courseIds: ["edu305"],
  },
  {
    id: "bseng",
    name: "BS English",
    level: "Undergraduate",
    duration: "4 years",
    semesters: 8,
    feePerSemester: "PKR 21,000",
    description: "A language and literature degree with a strong focus on academic writing, composition and critical reading.",
    courseIds: ["eng210"],
  },
];

export const announcements = [
  { id: "n1", title: "Mid-term result cards released for EDU-305", time: "2 hours ago" },
  { id: "n2", title: "New handout uploaded in CS-401: Lab Manual", time: "1 day ago" },
  { id: "n3", title: "Assignment deadline extended — BBA-205", time: "2 days ago" },
];

