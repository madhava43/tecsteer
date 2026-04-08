"use client";

import Image from "next/image";
import styles from "./styles.module.css";

const ITTransformation = () => {
  return (
    <div className={styles.container}>
      {/* Hero Image with Title */}
      <div className={styles.imageContainer}>
        <Image
          src="/images/IT-Transformation.webp"
          alt="IT Transformation Banner"
          fill
          style={{ objectFit: "cover" }}
          className={styles.bannerImage}
        />
        <div className={styles.overlayText}>
          <h1 className={styles.title}>Your Partner in IT Transformation</h1>
        </div>
      </div>

      {/* Content Section */}
      <section className={styles.content}>
        <p className={styles.paragraph}>
          <strong className={styles.callout}>TecSteer</strong> is your trusted partner for all your IT
          staffing, consulting, and staff augmentation needs. We help you:
        </p>

        {/* Access Top IT Talent */}
        <h2 className={styles.subHeading}>Access Top IT Talent</h2>
        <p className={styles.paragraph}>
          We understand the challenges of finding qualified IT professionals in
          today&apos;s competitive market. Our extensive network, combined with a
          rigorous screening process, ensures you connect with pre-vetted
          candidates possessing the specific skills and experience required for
          your projects.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Thorough Candidate Screening:</strong> We conduct in-depth
            interviews, technical assessments, and background checks to verify
            qualifications and experience.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Specialized Recruiters:</strong> Our recruiters have deep
            expertise in specific IT domains, allowing them to identify top
            talent in areas like cybersecurity, cloud computing, data science,
            and software development.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Reduced Time to Hire:</strong> We streamline the hiring
            process, presenting you with only the most qualified candidates,
            saving you valuable time and resources.
          </li>
        </ul>

        {/* Maximize IT Investments */}
        <h2 className={styles.subHeading}>Maximize IT Investments</h2>
        <p className={styles.paragraph}>
          Our consulting services are designed to help you optimize your
          technology infrastructure and processes for maximum efficiency and
          return on investment (ROI). We work closely with you to understand
          your business objectives and develop tailored strategies that align
          with your goals.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.callout}>IT Strategy and Planning:</strong> Develop a comprehensive
            IT roadmap that supports your business strategy.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Infrastructure Optimization:</strong> Assess your IT
            infrastructure to improve performance, scalability, and security.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Cybersecurity Assessments:</strong> Protect sensitive data
            and systems with robust security solutions.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Digital Transformation:</strong> Adopt new technologies
            and processes to improve efficiency and innovation.
          </li>
        </ul>

        {/* Gain Project Flexibility */}
        <h2 className={styles.subHeading}>Gain Project Flexibility</h2>
        <p className={styles.paragraph}>
          Our staff augmentation services provide the agility to scale your
          team as needed, ensuring project success without the overhead of
          full-time hiring.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Meet Project Deadlines:</strong> Quickly ramp up your team
            with skilled professionals.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Fill Skill Gaps:</strong> Access specialized skills not
            available within your team.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Control Costs:</strong> Avoid costs associated with
            full-time hiring, such as benefits and training.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Maintain Project Momentum:</strong> Seamlessly integrate
            consultants to ensure continuity.
          </li>
        </ul>

        {/* Reduce Time to Hire */}
        <h2 className={styles.subHeading}>Reduce Time to Hire</h2>
        <p className={styles.paragraph}>
          In today&apos;s fast-paced business environment, time is critical in
          hiring. A lengthy process can lead to lost productivity and missed
          opportunities.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Extensive Network:</strong> Maintain a vast network of
            pre-vetted IT professionals for quick matching.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Streamlined Screening:</strong> Conduct multi-stage
            evaluations to minimize delays.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Efficient Communication:</strong> Maintain clear and
            consistent updates with clients and candidates.
          </li>
        </ul>

        {/* Mitigate Risk */}
        <h2 className={styles.subHeading}>Mitigate Risk</h2>
        <p className={styles.paragraph}>
          Hiring the wrong person can lead to financial losses and decreased
          productivity. We take proactive steps to mitigate risks.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Thorough Candidate Screening:</strong> Verify
            qualifications and background.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Technical Assessments:</strong> Evaluate skills to ensure
            expertise.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Reference Checks:</strong> Gather insights into past
            performance and work ethic.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.callout}>Cultural Fit:</strong> Assess alignment with your company&apos;s
            values and team dynamics.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ITTransformation;
