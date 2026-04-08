export interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "salesforce",
    title: "Salesforce",
    description: "Leverage the power of cloud computing for scalability.",
    href: "/services/salesforce",
    icon: "/icons/cloud.webp",
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description: "Build cutting-edge mobile applications for iOS and Android.",
    href: "/services/mobile-development",
    icon: "/icons/mobile.webp",
  },
  {
    id: "application-services",
    title: "Application Services",
    description: "Streamline your operations with custom application solutions.",
    href: "/services/application-services",
    icon: "/icons/application.webp",
  },
  {
    id: "aws-consulting",
    title: "AWS Consulting",
    description: "Get expert advice on AWS architecture and services.",
    href: "/services/aws-consulting",
    icon: "/icons/aws.webp",
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Build responsive, fast, and secure web applications.",
    href: "/services/web-development",
    icon: "/icons/web.webp",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Design intuitive user interfaces for better user experiences.",
    href: "/services/ui-ux-design",
    icon: "/icons/uiux.webp",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description: "Unlock insights with data visualization and analytics.",
    href: "/services/data-analytics",
    icon: "/icons/data.webp",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Protect your systems with advanced cybersecurity solutions.",
    href: "/services/cybersecurity",
    icon: "/icons/security.webp",
  },
];
