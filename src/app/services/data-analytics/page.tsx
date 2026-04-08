import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = {
  title: "Data Analytics Services",
  description:
    "Unlock business insights with data analytics, visualization, and predictive modeling services from Tecsteer.",
  openGraph: {
    title: "Data Analytics Services | Tecsteer",
    url: "https://tecsteer.com/services/data-analytics",
    type: "website",
  },
};

export default function DataAnalytics() {
  return (
    <ServicePageLayout
      eyebrow="DATA ANALYTICS"
      title="Data"
      titleAccent="Analytics"
      description="Unlock actionable insights from your data. We help businesses collect, analyze, and visualize data to make smarter, faster decisions."
      icon={<BarChart3 size={28} />}
      sections={[
        {
          heading: "Our Analytics Services",
          bullets: [
            "Data collection, cleansing, and pipeline setup",
            "Exploratory data analysis and reporting",
            "Interactive dashboards and data visualization",
            "Predictive modeling and machine learning",
            "Business intelligence (Power BI, Tableau, Looker)",
            "Data strategy and governance consulting",
          ],
        },
        {
          heading: "Business Impact",
          bullets: [
            "Make data-driven decisions with confidence",
            "Identify trends and opportunities earlier",
            "Optimize operations and reduce costs",
            "Improve customer experience through behavioral insights",
            "Build a culture of data literacy across your organization",
            "Reduce manual reporting time by up to 80%",
          ],
        },
      ]}
      benefits={[
        "Clear, actionable insights — not just raw numbers",
        "Dashboards built for your specific KPIs",
        "Machine learning models that continuously improve",
        "Data governance and compliance frameworks",
        "Training your team to be data-literate",
        "Integration with your existing data sources and tools",
      ]}
      ctaHeading="Unlock the Value in Your Data"
      ctaSubtext="Our data engineers and analysts will turn your raw data into a strategic advantage."
    />
  );
}
