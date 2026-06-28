'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [willingToInvest, setWillingToInvest] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    willing_to_invest: '',
    investment_budget: '',
    investment_timeline: '',
    callback_required: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setMounted(true);
    
    const targetDate = new Date('2026-06-30T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visibleSection);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const sections = document.querySelectorAll(`.${styles.animatedSection}`);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'willing_to_invest') {
      setWillingToInvest(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowThankYou(true);
    }, 1200);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const facultyData = [
    {
      name: "Saloni Sahu",
      title: "Manager, Career Advancement Cell, Lawctopus Law School",
      bio: "BBA LLB from Prestige Institute of Management and Research and LLM from Oriental University. Former Content Manager at Deadly Law, Community Manager at LedX, Academic Associate at Oriental University, and Outreach & Recruitment Manager at Lawctopus."
    },
    {
      name: "Anup Menon V",
      title: "Top-Rated UpWork Freelancer & Legal Advisor",
      bio: "Rank holder from Karnataka State Law University, holding an LL.M. in Corporate Laws. Former Senior Legal Counsel at C. Mohanram & Associates, with extensive experience advising clients internationally, including in the USA."
    },
    {
      name: "Tanuj Kalia",
      title: "Founding CEO, Lawctopus & Author",
      bio: "Law graduate from NUJS Kolkata (2013) & MA from AUD Delhi (2019). Founding CEO of Lawctopus.com, former VP Marketing at Vakilsearch, and author of LexisNexis bestseller 'Law as a Career'."
    },
    {
      name: "Akanksha Mishra",
      title: "Head of Lawctopus Law School",
      bio: "Independent commercial litigator practicing at Bombay High Court. Taught contract drafting to 1500+ learners with a 96.5/100 average rating. Former counsel for BHEL, MyCaptain, and startups."
    },
    {
      name: "Shashank Sardesai",
      title: "Co-Founder, EverTrust Legal",
      bio: "University of Pune graduate & Company Secretary. Litigator and corporate advisor with extensive experience at Wadia Ghandy & Co. and HSA Advocates handling complex partnership, lease, and guarantee deeds."
    },
    {
      name: "Pranjal Doshi",
      title: "Associate, Walker Morris LLP (UK)",
      bio: "HNLU graduate & University of Cambridge LLM. Former associate at Trilegal and Khaitan & Co. Specializes in M&A, private equity, and structuring Shareholders' and Share Purchase Agreements."
    },
    {
      name: "Arunima Jha",
      title: "Head Legal Counsel, Omnicom Media Group",
      bio: "Over 10 years of experience in corporate & media law. Former legal counsel at BookMyShow and K Raheja Corp. Specialist in privacy compliance, commercial agreements, and corporate scaling."
    },
    {
      name: "Adv. Jaibatruka Mohanta",
      title: "Research Associate, CEERA NLSIU",
      bio: "Practicing advocate advising the Government of India on Criminal Law reform. Teaches Advanced Contracts and public procurement/tendering procedures at NLSIU."
    }
  ];

  const curriculumData = [
    {
      month: "Month 1",
      title: "Drafting of Essential Clauses of a Contract",
      points: [
        "Core principles of contract structure and drafting mechanics",
        "How to draft boilerplate clauses, representations, and warranties",
        "Understanding title recitals, definitions, and operating provisions",
        "Hands-on exercise: Analyzing real-world contract clauses"
      ]
    },
    {
      month: "Month 2",
      title: "Execution Formalities and Basic Negotiation Skills",
      points: [
        "Reviewing stamp duty, execution protocols, and registration requirements in India",
        "Basic negotiation psychology: How to align interests",
        "Redrafting and reviewing a complete sale deed assignment with personal coach feedback",
        "Execution protocols for physical vs digital agreements"
      ]
    },
    {
      month: "Month 3",
      title: "International Agreements, Common Agreements, & Advanced Negotiation",
      points: [
        "Drafting non-disclosure agreements (NDAs) and Powers of Attorney",
        "Understanding governing law, jurisdiction, and international arbitration rules",
        "Advanced negotiation simulations and transactional strategies",
        "7-8 live coaching sessions for interactive case studies"
      ]
    },
    {
      month: "Month 4",
      title: "Intellectual Property, Technology Agreements, & Website Terms",
      points: [
        "Drafting trademark and copyright licensing contracts",
        "Software licensing & software-as-a-service (SaaS) terms",
        "Drafting website terms of service and dynamic privacy policies",
        "Complying with modern data protection regulations"
      ]
    },
    {
      month: "Month 5",
      title: "Real Estate Agreements",
      points: [
        "Drafting leave and license agreements and lease deeds",
        "Understanding mortgage deeds, builder-buyer agreements, and title checks",
        "Covenants specific to commercial real estate development",
        "Handling execution and stamp duty formalities for real estate"
      ]
    },
    {
      month: "Month 6",
      title: "Business and Commercial Agreements",
      points: [
        "Drafting Master Service Agreements (MSAs) and Statements of Work (SOW)",
        "Structuring Shareholders' Agreements (SHA) & Share Purchase Agreements (SPA)",
        "Joint venture covenants, representations, warranties, and indemnities",
        "Limitation of liability & exit mechanisms drafting"
      ]
    },
    {
      month: "Freelancing",
      title: "Freelancing Modules & Portfolio Building",
      points: [
        "Building outstanding profiles on Upwork, Fiverr, and LinkedIn",
        "Writing winning proposals to pitch to international clients",
        "Setting up billing structures, escrow, and client feedback cycles",
        "Finalizing a portfolio of 10 evaluated contracts for Upwork client pitches"
      ]
    }
  ];

  const faqs = [
    {
      q: "Can I take this course if I am a law student?",
      a: "Yes! In fact, it is highly recommended. It equips you with the exact practical skills needed to stand out during law firm internships and enables you to start earning as a freelance contract drafter."
    },
    {
      q: "How does the Upwork freelancing training work?",
      a: "We have a dedicated module led by top-rated Upwork legal freelancers. We will guide you through setting up your profile, writing proposals, negotiating rates, and we will even share direct client opportunities."
    },
    {
      q: "Will my assignments be checked individually?",
      a: "Absolutely. You will submit 10 drafting assignments, and our specialized evaluators will provide detailed, line-by-line feedback on every single draft to help you refine your portfolio."
    },
    {
      q: "Is there a certificate at the end?",
      a: "Yes, you will receive a Certificate of Completion from Lawctopus Law School. Those who excel can also earn a certificate with merit."
    }
  ];

  return (
    <main className={styles.container}>
      {}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            L<span className={styles.logoAccent}>awctopus</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#ai" className={styles.navLink}>AI Training</a>
            <a href="#careers" className={styles.navLink}>Placement</a>
            <a href="#curriculum" className={styles.navLink}>Curriculum</a>
            <a href="#faculty" className={styles.navLink}>Faculty</a>
            <a href="#pricing" className={styles.navLink}>Pricing</a>
            <button className={styles.ctaBtn} onClick={() => setShowModal(true)}>
              Enroll Now
            </button>
          </div>
        </nav>
      </header>

      {}
      <div className={styles.countdownBar}>
        <div className={styles.countdownInner}>
          <div className={styles.countdownLabel}>
            <span>⚠️</span> Urgent: Register by June 30th to secure the 60% Launch Discount!
          </div>
          <div className={styles.countdownTimer}>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{mounted ? timeLeft.days : 0}</span>
              <span className={styles.timeUnit}>Days</span>
            </div>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{mounted ? timeLeft.hours : 0}</span>
              <span className={styles.timeUnit}>Hrs</span>
            </div>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{mounted ? timeLeft.minutes : 0}</span>
              <span className={styles.timeUnit}>Mins</span>
            </div>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{mounted ? timeLeft.seconds : 0}</span>
              <span className={styles.timeUnit}>Secs</span>
            </div>
          </div>
        </div>
      </div>

      {}
      <section className={styles.hero} id="about">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Live 6-Month Expert Program</span>
            <h1 className={styles.heroTitle}>
              Master Contract Drafting & <span>Freelancing</span>
            </h1>
            <p className={styles.heroDescription} style={{ marginBottom: '1.25rem' }}>
              Lawctopus Law School has launched a 6-month long online course on <strong>‘Mastering Contract Drafting and Freelancing’</strong>, consisting of 54 live sessions led by industry experts.
            </p>
            <p className={styles.heroDescription} style={{ marginBottom: '2.5rem' }}>
              This course empowers students to draft over 24 complex contracts, including website terms and international agreements, and teaches you how to excel as a Contract Drafting Freelancer through platforms like Upwork, LinkedIn, etc.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.ctaBtn} onClick={() => setShowModal(true)}>
                Enroll in 6-Month Program
              </button>
              <button className={styles.ctaBtnSecondary} onClick={() => document.getElementById('curriculum').scrollIntoView()}>
                Explore Syllabus
              </button>
            </div>

            {}
            <div className={styles.heroStatsContainer}>
              <div className={styles.heroStatCard}>
                <div className={styles.heroStatNumber}>20k+</div>
                <div className={styles.heroStatDivider}></div>
                <div className={styles.heroStatLabel}>Students Taught</div>
              </div>
              <div className={styles.heroStatCard}>
                <div className={styles.heroStatNumber}>93.2%</div>
                <div className={styles.heroStatDivider}></div>
                <div className={styles.heroStatLabel}>Success Rate</div>
              </div>
              <div className={styles.heroStatCard}>
                <div className={styles.heroStatNumber}>54</div>
                <div className={styles.heroStatDivider}></div>
                <div className={styles.heroStatLabel}>Live Sessions</div>
              </div>
              <div className={styles.heroStatCard}>
                <div className={styles.heroStatNumber}>10</div>
                <div className={styles.heroStatDivider}></div>
                <div className={styles.heroStatLabel}>Assignments</div>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrapper}>
              <img 
                src="/hero_contract_drafting.png" 
                alt="Contract Drafting and Freelancing" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.animatedSection}`} id="about-details" style={{ borderBottom: '1px solid var(--card-border)' }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About the 6-Month Long Expert-Level Course</h2>
          <p className={styles.sectionSubtitle}>
            This course is an opportunity for anyone looking to become an expert in contract drafting.
          </p>
        </div>
        <div className={styles.aboutListContainer}>
          <div className={styles.aboutListItem}>
            <div className={styles.aboutNumber}>01</div>
            <div className={styles.aboutItemContent}>
              <h3 className={styles.aboutCardTitle}>Months 1-2: Fundamentals & Sale Deeds</h3>
              <p className={styles.aboutCardText}>
                In the first two (2) months, you’ll learn the fundamentals of drafting contracts and get hands-on experience by identifying contracts, and reviewing and redrafting a sale deed all by yourself.
              </p>
              <span className={styles.aboutGoldBar}></span>
            </div>
          </div>
          <div className={styles.aboutListItem}>
            <div className={styles.aboutNumber}>02</div>
            <div className={styles.aboutItemContent}>
              <h3 className={styles.aboutCardTitle}>Months 3-6: Advanced Specializations</h3>
              <p className={styles.aboutCardText}>
                The next four (4) months will focus on specific contracts related to real estate, intellectual property, and business agreements (like NDAs, Master Service Agreements, Power of Attorney, Shareholders Agreements, Joint Venture Agreements, e-contracts, etc., with 7-8 LIVE sessions each month. You’ll learn everything from drafting and negotiating clauses to handling execution formalities.
              </p>
              <span className={styles.aboutGoldBar}></span>
            </div>
          </div>
          <div className={styles.aboutListItem}>
            <div className={styles.aboutNumber}>03</div>
            <div className={styles.aboutItemContent}>
              <h3 className={styles.aboutCardTitle}>Freelancing & Professional Career Coaching</h3>
              <p className={styles.aboutCardText}>
                These four months will also include monthly sessions on freelancing, where an expert will show you how to build an online profile on platforms like Upwork and earn money, and the monthly networking sessions will help you teach you how to build your career through networking.
              </p>
              <span className={styles.aboutGoldBar}></span>
            </div>
          </div>
          <div className={styles.aboutListItem}>
            <div className={styles.aboutNumber}>04</div>
            <div className={styles.aboutItemContent}>
              <h3 className={styles.aboutCardTitle}>Upwork Opportunities & Pipeline Support</h3>
              <p className={styles.aboutCardText}>
                We will train you to draft excellent CVs and cover letters, set up your Upwork profile, share some Upwork opportunities with you, and help you apply and support you confidently!
              </p>
              <span className={styles.aboutGoldBar}></span>
            </div>
          </div>
        </div>
        <div className={styles.aboutCallout}>
          <p className={styles.aboutCalloutText}>
            It’s a complete package for those who are serious about advancing their contract drafting skills and earning money through that.
          </p>
          <a href="#curriculum" className={styles.aboutLink}>
            For a detailed course schedule (draft), please click here ➔
          </a>
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.lightBgSection} ${styles.animatedSection}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why You Should Join This Course?</h2>
          <p className={styles.sectionSubtitle}>
            A comprehensive, practice-focused roadmap designed to give you an unfair advantage in the legal drafting ecosystem.
          </p>
        </div>
        <div className={styles.bentoGrid}>
          <div className={`${styles.bentoCard} ${styles.bentoCardWide}`}>
            <span className={styles.bentoIcon}>🎓</span>
            <div className={styles.bentoBadge}>Core Benefit</div>
            <h3 className={styles.bentoTitle}>54 Live Sessions</h3>
            <p className={styles.bentoDesc}>
              Learn to draft 24 essential, high-demand agreements with hands-on guidance through 54 live training sessions led by industry experts.
            </p>
          </div>
          <div className={styles.bentoCard}>
            <span className={styles.bentoIcon}>⚖️</span>
            <h3 className={styles.bentoTitle}>Key Practice Areas</h3>
            <p className={styles.bentoDesc}>
              Develop drafting expertise in practice areas like: Real Estate, IPR, General Corporate, and International Contracts.
            </p>
          </div>
          <div className={styles.bentoCard}>
            <span className={styles.bentoIcon}>🚀</span>
            <h3 className={styles.bentoTitle}>Freelancing Training</h3>
            <p className={styles.bentoDesc}>
              Get freelancing training from a top-rated Upwork contract expert, receive direct opportunities on Upwork and handle your first client confidently!
            </p>
          </div>
          <div className={`${styles.bentoCard} ${styles.bentoCardWide}`}>
            <span className={styles.bentoIcon}>📝</span>
            <div className={styles.bentoBadge}>Hands-on Portfolio</div>
            <h3 className={styles.bentoTitle}>Portfolio Assignments</h3>
            <p className={styles.bentoDesc}>
              Assignments: Draft 10 contracts and get personalised feedback on each of your drafts. Use these 10 fine-tuned contracts in your UpWork portfolio!
            </p>
          </div>
          <div className={styles.bentoCard}>
            <span className={styles.bentoIcon}>⚡</span>
            <h3 className={styles.bentoTitle}>Save 4 Years of Career</h3>
            <p className={styles.bentoDesc}>
              Save 4 years of your legal career! Learn in 6 months what a lawyer learns in 4-5 years!
            </p>
          </div>
          <div className={`${styles.bentoCard} ${styles.bentoCardWide}`}>
            <span className={styles.bentoIcon}>♾️</span>
            <div className={styles.bentoBadge}>Infinite Value</div>
            <h3 className={styles.bentoTitle}>Lifetime Resource Access</h3>
            <p className={styles.bentoDesc}>
              Get lifetime access to all the course materials (recorded lectures, reading resources, drafts, recordings of live sessions, etc.).
            </p>
          </div>
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.animatedSection}`} id="ai" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className={styles.specializationLayout}>
          {}
          <div className={styles.specializationIntro}>
            <span className={styles.specializationBadge}>AI Specialization</span>
            <h2 className={styles.specializationTitle}>Building AI-Ready Legal Careers</h2>
            <p className={styles.specializationText}>
              Lawctopus Law School (LLS) believes that AI is no longer optional for lawyers—it is fast becoming a core professional skill. At the same time, we strongly believe that AI must be used responsibly and ethically.
            </p>
            <p className={styles.specializationText}>
              Over the last 6 months, the LLS team has actively trained itself in the latest applications of AI across legal research, drafting, litigation support, and career development.
            </p>

            <div className={styles.specializationSummaryCard}>
              <h4 className={styles.specializationSummaryTitle}>In Summary: AI at LLS Means</h4>
              <ul className={styles.specializationSummaryList}>
                <li><span>✓</span> Regular LIVE AI sessions by Indian Kanoon & Jurisphere</li>
                <li><span>✓</span> A 4-hour structured workshop on AI for legal work</li>
                <li><span>✓</span> 1-month complimentary access to Indian Kanoon’s AI tool (Prism)</li>
                <li><span>✓</span> Ongoing AI insights from Faculty & Course Mentors during live classes</li>
                <li><span>✓</span> Access to a 31-page eBook on AI Prompts</li>
              </ul>
            </div>
          </div>

          {}
          <div className={styles.specializationDetailsCol}>
            <h3 className={styles.specializationDetailsTitle}>How We Teach AI at Lawctopus Law School</h3>
            
            <div className={styles.specializationDetailCard}>
              <div className={styles.specializationDetailHeader}>
                <span className={styles.specializationDetailNumber}>1</span>
                <h4>LIVE AI Sessions with Leading Legal-Tech Organisations</h4>
              </div>
              <p>
                We have tied up with two of India’s most credible AI-driven legal platforms: <strong>Indian Kanoon (Prism)</strong> and <strong>Jurisphere</strong>. They conduct regular LIVE sessions (60–90 mins) every month or two on <em>Using AI in Real Legal Work</em>.
              </p>
            </div>

            <div className={styles.specializationDetailCard}>
              <div className={styles.specializationDetailHeader}>
                <span className={styles.specializationDetailNumber}>2</span>
                <h4>4-Hour Recorded Workshop: AI for Lawyers</h4>
              </div>
              <p>
                Access a structured 4-hour workshop covering research, argumentation, drafting, and ethics. Recorded by Himansh Wadhwa & Shruti Kaushik (Legal Product Developers at Indian Kanoon), ensuring technical depth and legal accuracy.
              </p>
            </div>

            <div className={styles.specializationDetailCard}>
              <div className={styles.specializationDetailHeader}>
                <span className={styles.specializationDetailNumber}>3</span>
                <h4>Complimentary Access to Indian Kanoon’s Prism</h4>
              </div>
              <p>
                Get 1-month complimentary access to Indian Kanoon’s AI tool, Prism, to practice faster research and document drafting on India’s largest caselaw repository.
              </p>
            </div>

            <div className={styles.specializationDetailCard}>
              <div className={styles.specializationDetailHeader}>
                <span className={styles.specializationDetailNumber}>4</span>
                <h4>AI Guidance from Faculty & Course Mentors</h4>
              </div>
              <p>
                Mentors explain in class how to use AI to improve corporate/drafting performance, litigation research, IPR filing, and how to build stronger CVs and portfolios.
              </p>
            </div>

            <div className={styles.specializationDetailCard}>
              <div className={styles.specializationDetailHeader}>
                <span className={styles.specializationDetailNumber}>5</span>
                <h4>31-page eBook: AI Prompts for Lawyers</h4>
              </div>
              <p>
                Developed with Himansh Wadhwa, this eBook is a curated, subject-wise collection of ready-to-use prompts for Contract Drafting, Litigation, IPR, Research, and Legal Careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.lightBgSection} ${styles.animatedSection}`} id="careers">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Career & Placement Support</h2>
          <p className={styles.sectionSubtitle}>
            Our Career Advancement Cell provides dedicated guidance to transform your skills into paying opportunities.
          </p>
        </div>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineSidebar}>
            <div className={styles.timelineSticky}>
              <div className={styles.timelineBonusBadge}>Advancement Cell</div>
              <h3 className={styles.timelineSidebarTitle}>Your Career Roadmap</h3>
              <p className={styles.timelineSidebarDesc}>
                We walk with you at every step, from basic drafting exercises to your first paying Upwork client.
              </p>
              <div className={styles.timelineStats}>
                <div className={styles.timelineStatItem}>
                  <span className={styles.timelineStatVal}>22+</span>
                  <span className={styles.timelineStatLbl}>Live Sessions</span>
                </div>
                <div className={styles.timelineStatItem}>
                  <span className={styles.timelineStatVal}>1-on-1</span>
                  <span className={styles.timelineStatLbl}>Coaching sessions</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.timelineFlow}>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineStep}>
              <div className={styles.timelineNode}>01</div>
              <div className={styles.timelineStepContent}>
                <span className={styles.timelineStepBadge}>Phase 1: Foundation</span>
                <h4 className={styles.timelineStepTitle}>Skill Building</h4>
                <p className={styles.timelineStepDesc}>
                  22 Live Sessions on CV building, LinkedIn optimization, Cover Letters, and subject-specific freelancing (IPR/Tech).
                </p>
              </div>
            </div>
            <div className={styles.timelineStep}>
              <div className={styles.timelineNode}>02</div>
              <div className={styles.timelineStepContent}>
                <span className={styles.timelineStepBadge}>Phase 2: Networking</span>
                <h4 className={styles.timelineStepTitle}>Dedicated Pipelines</h4>
                <p className={styles.timelineStepDesc}>
                  Sharing profiles directly with partner organizations. Access exclusive WhatsApp groups sharing jobs, internships, and freelance briefs.
                </p>
              </div>
            </div>
            <div className={styles.timelineStep}>
              <div className={styles.timelineNode}>03</div>
              <div className={styles.timelineStepContent}>
                <span className={styles.timelineStepBadge}>Phase 3: Launch</span>
                <h4 className={styles.timelineStepTitle}>1-on-1 Coaching</h4>
                <p className={styles.timelineStepDesc}>
                  Bi-monthly, personalized 30-45 minute career coaching sessions directly with Lawctopus Law School founders and key faculty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.animatedSection}`} id="curriculum" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className={styles.curriculumGrid}>
          <div className={styles.curriculumSidebar}>
            <div className={styles.curriculumSticky}>
              <span className={styles.curriculumBadge}>Study Plan</span>
              <h2 className={styles.curriculumMainTitle}>Comprehensive Curriculum</h2>
              <p className={styles.curriculumDesc}>
                A structured, step-by-step path from legal fundamentals to executing global commercial deals.
              </p>
              <div className={styles.curriculumStatsCard}>
                <div className={styles.curriculumStatItem}>
                  <span className={styles.curriculumStatNum}>6</span>
                  <span className={styles.curriculumStatLabel}>Modules</span>
                </div>
                <div className={styles.curriculumStatItem}>
                  <span className={styles.curriculumStatNum}>24+</span>
                  <span className={styles.curriculumStatLabel}>Agreements</span>
                </div>
                <div className={styles.curriculumStatItem}>
                  <span className={styles.curriculumStatNum}>54</span>
                  <span className={styles.curriculumStatLabel}>Classes</span>
                </div>
              </div>

              <div className={styles.curriculumInclusions}>
                <h4 className={styles.inclusionTitle}>Course Inclusions:</h4>
                <ul className={styles.inclusionList}>
                  <li className={styles.inclusionItem}>
                    <span className={styles.inclusionIcon}>✓</span>
                    <div>
                      <strong>Verified Digital Certificate</strong>
                      <p>Shareable on LinkedIn to showcase your drafting credentials</p>
                    </div>
                  </li>
                  <li className={styles.inclusionItem}>
                    <span className={styles.inclusionIcon}>✓</span>
                    <div>
                      <strong>50+ Editable Draft Templates</strong>
                      <p>Lifetime access to lawyer-approved contract templates</p>
                    </div>
                  </li>
                  <li className={styles.inclusionItem}>
                    <span className={styles.inclusionIcon}>✓</span>
                    <div>
                      <strong>Upwork & LinkedIn Profile Review</strong>
                      <p>Personal profile audits led by our freelancing coaches</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.curriculumFlow}>
            {curriculumData.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.accordionItem} ${activeAccordion === idx ? styles.accordionItemActive : ''}`}
              >
                <button
                  className={`${styles.accordionHeader} ${activeAccordion === idx ? styles.accordionActive : ''}`}
                  onClick={() => toggleAccordion(idx)}
                >
                  <div className={styles.accordionTitle}>
                    <span className={styles.monthBadge}>{item.month}</span>
                    {item.title}
                  </div>
                  <span className={styles.accordionChevron}>▼</span>
                </button>
                <div className={styles.accordionContent}>
                  <div className={styles.accordionContentInner}>
                    <ul className={styles.accordionList}>
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.lightBgSection} ${styles.animatedSection}`} id="faculty">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Learn From Leading Experts</h2>
          <p className={styles.sectionSubtitle}>
            Interact directly with lawyers and legal advisors who have worked with top-tier international firms and startups.
          </p>
        </div>
        <div className={styles.facultyShowcaseGrid}>
          {facultyData.map((fac, idx) => (
            <div key={idx} className={styles.facultyShowcaseCard}>
              <div className={styles.facultyCardTopBar}></div>
              <div className={styles.facultyCardContent}>
                <div className={styles.facultyCardHeader}>
                  <div className={styles.facultyAvatarCircle}>
                    <span className={styles.facultyAvatarInitials}>
                      {fac.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className={styles.facultyMetaInfo}>
                    <h3 className={styles.facultyCardName}>{fac.name}</h3>
                    <div className={styles.facultyCardTitle}>{fac.title}</div>
                  </div>
                </div>
                <div className={styles.facultyCardDivider}></div>
                <p className={styles.facultyCardBio}>"{fac.bio}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.animatedSection}`} style={{ padding: '40px 2rem', textAlign: 'center' }}>
        <div className={styles.guaranteeLetter}>
          <span className={styles.guaranteeQuoteMark}>“</span>
          <h2 className={styles.guaranteeLetterTitle}>Our Promise to You</h2>
          <p className={styles.guaranteeLetterText}>
            We truly believe our courses will enhance your legal skills, confidence, and career prospects. If you complete any of our courses sincerely and still feel it did not add value to your career, we will refund 100% of your fee—no questions asked.
          </p>
          <div className={styles.guaranteeSignoff}>
            <div className={styles.signoffLine}></div>
            <p className={styles.signoffName}>100% Money-Back Guarantee</p>
            <p className={styles.signoffTitle}>Lawctopus Law School Academic Council</p>
          </div>
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.lightBgSection} ${styles.animatedSection}`} id="pricing">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Flexible Learning Plans</h2>
          <p className={styles.sectionSubtitle}>
            Choose between our flagship 6-month career accelerator or the 2-month introductory program.
          </p>
        </div>
        <div className={styles.pricingTicketContainer}>
          {}
          <div className={`${styles.priceTicket} ${styles.priceTicketGold}`}>
            <div className={styles.priceTicketTop}>
              <span className={styles.ticketBadge}>Flagship Program</span>
              <h3 className={styles.priceName}>6-Month Long Expert Course</h3>
              <p className={styles.ticketSubName}>Mastering Contract Drafting & Freelancing</p>
              <div className={styles.priceAmount}>
                <span className={styles.priceAmountValue}>Rs. 24,999</span>
                <span className={styles.priceOriginal}>Rs. 60,000</span>
              </div>
            </div>
            <div className={styles.ticketDivider}>
              <div className={styles.ticketLeftCutout}></div>
              <div className={styles.ticketDashedLine}></div>
              <div className={styles.ticketRightCutout}></div>
            </div>
            <div className={styles.priceTicketBottom}>
              <ul className={styles.priceFeatures}>
                <li className={styles.priceFeature}>
                  <span className={styles.priceFeatureCheck}>✓</span>
                  54 Live Training & interactive Q&A sessions
                </li>
                <li className={styles.priceFeature}>
                  <span className={styles.priceFeatureCheck}>✓</span>
                  Personal feedback on 10 core drafting assignments
                </li>
                <li className={styles.priceFeature}>
                  <span className={styles.priceFeatureCheck}>✓</span>
                  Complete Upwork freelancing setup guide & client pipeline
                </li>
                <li className={styles.priceFeature}>
                  <span className={styles.priceFeatureCheck}>✓</span>
                  Lifetime access to all lectures, templates, and libraries
                </li>
                <li className={styles.priceFeature}>
                  <span className={styles.priceFeatureCheck}>✓</span>
                  Professional CV review & networking masterclass
                </li>
              </ul>
              <button className={styles.ctaBtn} style={{ width: '100%' }} onClick={() => setShowModal(true)}>
                Enroll and Save 60%
              </button>
            </div>
          </div>

          {}
          <div className={`${styles.priceTicket} ${styles.priceTicketSilver}`}>
            <div className={styles.priceTicketTop}>
              <span className={styles.ticketBadge}>Basic Program</span>
              <h3 className={styles.priceName}>2-Month Certificate Course</h3>
              <p className={styles.ticketSubName}>Contract Drafting & Negotiation Basics</p>
              <div className={styles.priceAmount}>
                <span className={styles.priceAmountValue}>Rs. 7,999</span>
              </div>
            </div>
            <div className={styles.ticketDivider}>
              <div className={styles.ticketLeftCutout}></div>
              <div className={styles.ticketDashedLine}></div>
              <div className={styles.ticketRightCutout}></div>
            </div>
            <div className={styles.priceTicketBottom}>
              <ul className={styles.priceFeatures}>
                <li className={styles.priceFeature}>
                  <span className={styles.priceFeatureCheck}>✓</span>
                  Foundational contract structure theory
                </li>
                <li className={styles.priceFeature}>
                  <span className={styles.priceFeatureCheck}>✓</span>
                  Review and redrafting of basic deeds
                </li>
                <li className={styles.priceFeature}>
                  <span className={styles.priceFeatureCheck}>✓</span>
                  Standard email support from coaches
                </li>
                <li className={styles.priceFeature} style={{ opacity: 0.5 }}>
                  <span style={{ color: 'red', marginRight: '0.75rem' }}>✗</span>
                  No Upwork Freelancing training
                </li>
                <li className={styles.priceFeature} style={{ opacity: 0.5 }}>
                  <span style={{ color: 'red', marginRight: '0.75rem' }}>✗</span>
                  No live networking masterclasses
                </li>
              </ul>
              <button className={styles.ticketBtnSecondary} onClick={() => setShowModal(true)}>
                Select Basic Course
              </button>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={`${styles.section} ${styles.animatedSection}`} style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqAccordion}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={`${styles.faqRow} ${activeFaq === idx ? styles.faqRowActive : ''}`}>
              <button className={styles.faqQuestionRow} onClick={() => toggleFaq(idx)}>
                <span className={styles.faqQuestionText}>{faq.q}</span>
                <span className={styles.faqIcon}>{activeFaq === idx ? '−' : '+'}</span>
              </button>
              <div className={styles.faqAnswerRow}>
                <p className={styles.faqAnswerText}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className={`${styles.bottomCta} ${styles.animatedSection}`}>
        <div className={styles.bottomCtaInner}>
          <div className={styles.bottomCtaContent}>
            <h2 className={styles.bottomTitle}>Ready to Scale Your Career?</h2>
            <p className={styles.bottomText}>
              Join thousands of law students and practitioners who have unlocked financial independence and advanced drafting skills with Lawctopus Law School.
            </p>
          </div>
          <div className={styles.bottomCtaAction}>
            <button className={styles.ctaBtn} onClick={() => setShowModal(true)}>
              Get Instant Access Now
            </button>
          </div>
        </div>
      </section>

      {}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => {
          setShowModal(false);
          setShowThankYou(false);
        }}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => {
              setShowModal(false);
              setShowThankYou(false);
            }}>×</button>
            
            {showThankYou ? (
              <div className={styles.thankYouBody}>
                <div className={styles.thankYouIconContainer}>
                  <span className={styles.thankYouCheck}>✓</span>
                </div>
                <h3 className={styles.thankYouTitle}>Registration Successful! 🎉</h3>
                <p className={styles.thankYouSubtitle}>
                  Thank you, <strong>{formData.name}</strong>. We've reserved your seat for free career counseling.
                </p>
                <div className={styles.thankYouDetails}>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Callback Requested:</strong> {formData.callback_required === 'yes' ? 'Yes ✅' : 'No'}</p>
                </div>
                <div className={styles.thankYouAction}>
                  <button className={styles.ctaBtn} onClick={() => {
                    alert("Mock eBook Download Triggered!");
                  }} style={{ width: '100%' }}>
                    📥 Download Free eBook Now
                  </button>
                </div>
                <button className={styles.thankYouCloseBtn} onClick={() => {
                  setShowModal(false);
                  setShowThankYou(false);
                }}>
                  Close Window
                </button>
              </div>
            ) : (
              <div className={styles.modalBody}>
                <div className={styles.modalHeader}>
                  <span className={styles.modalBadge}>Quick Interest Form</span>
                  <h3 className={styles.modalTitle}>Accelerate Your Legal Career</h3>
                  <p className={styles.modalSubtitle}>Fill in your details to reserve your seat and get free career counseling.</p>
                </div>
                
                <form onSubmit={handleFormSubmit} className={styles.modalForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Name *</label>
                    <input type="text" name="name" required placeholder="John Doe" className={styles.formInput} onChange={handleInputChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email *</label>
                    <input type="email" name="email" required placeholder="john@example.com" className={styles.formInput} onChange={handleInputChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number *</label>
                    <input type="tel" name="phone" required placeholder="+91 99999 99999" className={styles.formInput} onChange={handleInputChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>State *</label>
                    <input type="text" name="state" required placeholder="Delhi" className={styles.formInput} onChange={handleInputChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>City *</label>
                    <input type="text" name="city" required placeholder="New Delhi" className={styles.formInput} onChange={handleInputChange} />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Are you willing to invest in Lawctopus courses? *</label>
                    <select name="willing_to_invest" required className={styles.formSelect} onChange={handleInputChange}>
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {willingToInvest === 'yes' && (
                    <>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>What is your budget range? *</label>
                        <select name="investment_budget" required className={styles.formSelect} onChange={handleInputChange}>
                          <option value="">Select budget range</option>
                          <option value="range1">Rs. 5,000 - Rs. 10,000</option>
                          <option value="range2">Rs. 10,000 - Rs. 20,000</option>
                          <option value="range3">Rs. 20,000+</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>How soon are you willing to invest? *</label>
                        <select name="investment_timeline" required className={styles.formSelect} onChange={handleInputChange}>
                          <option value="">Select timeline</option>
                          <option value="1m">Within 1 month</option>
                          <option value="2m">Within 1-2 months</option>
                          <option value="more">More than 2 months</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Do you want to receive a guidance callback? *</label>
                    <select name="callback_required" required className={styles.formSelect} onChange={handleInputChange}>
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <button type="submit" disabled={formSubmitted} className={styles.ctaBtn} style={{ gridColumn: '1 / -1', marginTop: '1rem', width: '100%' }}>
                    {formSubmitted ? 'Submitting...' : 'Register & Download eBook'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© 2026 Lawctopus Law School. All Rights Reserved.</p>
          <p>Created for Law students, Young lawyers, & Professionals looking to excel.</p>
        </div>
      </footer>
    </main>
  );
}
