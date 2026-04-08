export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string; // ISO format: "2025-01-15"
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  image?: string;
  tags?: string[];
}

export const posts: BlogPost[] = [
  {
    id: "1",
    slug: "welcome-to-our-blog",
    title: "Welcome to Our Blog",
    author: "Sreeni D",
    date: "2025-01-15",
    excerpt: "Explore the latest insights and updates from Tecsteer.",
    category: "Company News",
    readTime: "3 min read",
    tags: ["Company", "Announcement", "Technology"],
    image: "/images/blog1.webp",
    content: `Welcome to the Tecsteer blog — your destination for practical insights on technology, career development, and IT transformation. We created this space to share what we learn every day working with clients across industries and to give back to the community that has supported our growth.

At Tecsteer, we believe technology should be an enabler, not an obstacle. Whether you are a seasoned IT professional, a business leader evaluating your tech strategy, or someone just beginning their journey into the world of software, our goal is to provide content that is clear, actionable, and relevant to what you face in the real world.

In the coming months, expect deep dives into Salesforce best practices, cloud migration strategies, cybersecurity fundamentals, and the future of staffing in a remote-first economy. We will also be sharing stories from our own consultants and trainers — the people who live this work daily. Thank you for joining us. We are just getting started.`,
  },
  {
    id: "2",
    slug: "innovative-tech-solutions",
    title: "Innovative Tech Solutions",
    author: "Sreeni D",
    date: "2025-02-01",
    excerpt: "How cutting-edge technology drives business success.",
    category: "Technology",
    readTime: "4 min read",
    tags: ["Cloud", "AWS", "Innovation"],
    image: "/images/blog2.webp",
    content: `Technology does not stand still, and neither do the businesses that depend on it. In 2025, the organizations seeing the greatest returns are not necessarily those with the largest budgets — they are the ones that have chosen the right tools, implemented them thoughtfully, and aligned them tightly with business goals. At Tecsteer, we see this play out every day in our consulting and implementation work.

Cloud-native architecture continues to dominate the conversation. Moving workloads to AWS, Azure, or GCP is no longer a question of "if" but "how." The organizations that succeed are the ones that treat migration as a transformation opportunity rather than a lift-and-shift exercise. They redesign workflows, automate manual processes, and build observability from day one. The result: faster delivery, lower operational costs, and systems that scale gracefully with demand.

Equally important is the human side of innovation. Technology only delivers value when the people using it understand it and trust it. That is why we pair every implementation with training and change management support. The best platform in the world fails if adoption is low. We have seen it happen. Our commitment at Tecsteer is to ensure that every solution we deliver lands well — technically and organizationally.`,
  },
  {
    id: "3",
    slug: "training-and-development",
    title: "Training and Development",
    author: "Mahendra U",
    date: "2025-02-20",
    excerpt: "Empowering individuals through tailored training programs.",
    category: "Training",
    readTime: "5 min read",
    tags: ["Training", "Salesforce", "Career Development"],
    image: "/images/blog3.webp",
    content: `The fastest way to future-proof your career is to invest in your skills deliberately and consistently. The IT landscape shifts fast — what was a hot skill three years ago may be table stakes today, and what is emerging now may define the next decade. At Tecsteer, our training programs are built around this reality. We focus on the skills that matter now and that will matter tomorrow.

Our Salesforce training is a good example. We do not just teach you to click through an interface. We teach you to understand the data model, write clean Apex, design scalable Lightning components, and think like a certified developer or administrator. Our learners come in at different levels — some have never touched a CRM, others are experienced admins looking to move into development. We meet them where they are and build from there.

The same principle applies across our Full Stack Development, Data Science, and Cybersecurity programs. Every curriculum is built around hands-on projects, real-world scenarios, and feedback from practitioners who do this work daily. We believe learning sticks when it is grounded in application, not just theory. If you are ready to level up, we are ready to help you get there.`,
  },
];
