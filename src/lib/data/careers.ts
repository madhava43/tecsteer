export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
  requirements: string[];
  niceToHave?: string[];
  postedDate: string;
}

export const jobs: JobPost[] = [
  {
    id: "salesforce-developer",
    title: "Salesforce Developer",
    department: "Engineering",
    location: "Piscataway, NJ (Hybrid)",
    type: "Full-time",
    description:
      "Build modern, robust cloud applications with the Salesforce platform including customization, integration, and deployment.",
    requirements: [
      "3+ years of Salesforce development experience",
      "Proficiency in Apex, Visualforce, and Lightning Web Components",
      "Experience with Salesforce CRM configuration and administration",
      "Strong knowledge of SOQL and Salesforce data model",
      "Salesforce Developer certification preferred",
    ],
    niceToHave: [
      "Experience with Salesforce integrations (REST/SOAP APIs)",
      "Knowledge of CI/CD pipelines for Salesforce (Salesforce DX)",
    ],
    postedDate: "2025-03-01",
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Develop robust, scalable backend systems using Node.js and Django to power client-facing and internal applications.",
    requirements: [
      "3+ years of backend development experience",
      "Strong proficiency in Node.js or Django/Python",
      "Experience designing and building RESTful APIs",
      "Familiarity with relational (PostgreSQL/MySQL) and NoSQL (MongoDB) databases",
      "Working knowledge of cloud platforms (AWS, GCP, or Azure)",
    ],
    niceToHave: [
      "Experience with containerization (Docker, Kubernetes)",
      "Knowledge of microservices and event-driven architecture",
    ],
    postedDate: "2025-03-05",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Piscataway, NJ (Hybrid)",
    type: "Full-time",
    description:
      "Create intuitive, accessible, and visually compelling designs that elevate the user experience across web and mobile platforms.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Expert-level proficiency in Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating user-centered design thinking",
      "Experience conducting user research and usability testing",
      "Solid understanding of responsive and accessible design principles",
    ],
    niceToHave: [
      "Basic knowledge of HTML/CSS for design handoff",
      "Experience building or maintaining design systems",
    ],
    postedDate: "2025-03-10",
  },
];
