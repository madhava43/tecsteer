"use client";

import { useState } from "react";
import styles from "./styles.module.css";

const tabs = [
  {
    title: "Transparency",
    content: `
      Clearly communicating policies, procedures, and expectations to employees and clients.
      Being upfront about challenges and setbacks.
      Sharing information openly and honestly within the organization.
      Actively seeking and addressing feedback.
    `,
  },
  {
    title: "Reliability",
    content: `
      Fulfilling commitments to clients and stakeholders.
      Providing high-quality products and services that meet or exceed expectations.
      Being dependable and trustworthy in all interactions.
      Maintaining a strong work ethic and delivering results on time.
    `,
  },
  {
    title: "Accountability",
    content: `
      Acknowledging and owning mistakes.
      Learning from failures and striving for continuous improvement.
      Taking ownership of one's responsibilities.
      Being transparent about performance and results.
    `,
  },
  {
    title: "Customer Focus",
    content: `
      Understanding and anticipating customer needs.
      Providing excellent customer service.
      Building strong relationships with customers.
      Continuously striving to improve the customer experience.
    `,
  },
  {
    title: "Inclusivity",
    content: `
      Valuing diversity and celebrating differences.
      Ensuring equal opportunities for all employees.
      Promoting a culture of respect and inclusivity.
      Actively seeking and incorporating diverse perspectives.
    `,
  },
  {
    title: "Integrity",
    content: `
      Adhering to high ethical standards and legal compliance.
      Being honest and truthful in all dealings.
      Acting with fairness and impartiality.
      Taking responsibility for one's actions.
    `,
  },
  {
    title: "Innovation",
    content: `
      Fostering a culture of creativity and experimentation.
      Investing in research and development.
      Adapting to changing market conditions and customer needs.
      Continuously seeking ways to improve products, services, and processes.
    `,
  },
  {
    title: "Teamwork",
    content: `
      Fostering a supportive and collaborative work environment.
      Encouraging open communication and information sharing.
      Recognizing and rewarding team contributions.
      Building trust and respect among team members.
    `,
  },
  {
    title: "Sustainability",
    content: `
      Implementing environmentally friendly practices.
      Promoting social responsibility and ethical business practices.
      Ensuring the long-term sustainability of the organization and its stakeholders.
      Using resources responsibly and efficiently.
    `,
  },
];

export default function WhatDrivesUsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className={styles.container}>
      <section className={styles.header}>
        <h1>What Drives Us</h1>
        <p>
          <strong>Vision:</strong> To become a leading force in the industry, recognized for
          delivering exceptional value and fostering sustainable growth for our
          clients and employees.
        </p>
      </section>

      <section className={styles.content}>
        <aside className={styles.sidebar}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tab} ${
                activeTab === index ? styles.active : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </aside>

        <article className={styles.details}>
          <h2>{tabs[activeTab]?.title}</h2>
          <p>{tabs[activeTab]?.content}</p>
        </article>
      </section>
    </main>
  );
}
