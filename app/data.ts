export interface WorkflowRow {
  step: string;
  value: string;
  w: string;
}

export interface Workflow {
  subject: string;
  before: WorkflowRow[];
  after: WorkflowRow[];
}

export interface Vertical {
  name: string;
  buyer: string;
  headline: string;
  bullets: string[];
  tools: string[];
  complianceTag: string;
  compliance: string;
  workflow: Workflow;
  stat: string;
  statLabel: string;
  cta: string;
}

export interface AdGroup {
  eyebrow: string;
  headline: string;
  subhead: string;
  points: string[];
  formTitle: string;
  fieldHint: string;
}

export interface CompareRow {
  label: string;
  ri: string;
  consult: string;
  internal: string;
  tool: string;
}

interface RawVertical extends Omit<Vertical, "workflow"> {
  workflow: {
    subject: string;
    bw: number[];
    aw: number[];
    before: { step: string; value: string }[];
    after: { step: string; value: string }[];
  };
}

const rawVerticals: RawVertical[] = [
  {
    name: "Law firms",
    buyer: "For the COO / firm administrator",
    headline: "Matter-aware systems, intake to billed time.",
    bullets: [
      "Matter-level time capture from email, calendar, and documents",
      "Timekeeper approval with UTBMS codes, written to your PM system",
      "Intake and referral CRM connected to practice management",
      "Realization tracked by attorney and matter type",
    ],
    tools: ["Clio", "MyCase", "Smokeball", "HubSpot", "Litify"],
    complianceTag: "Privilege-first",
    compliance: "No public models · bar-advertising aware · audit trail per action",
    workflow: {
      subject: "Time capture at a 90-attorney firm",
      bw: [88, 62, 96, 44],
      aw: [6, 14, 22, 4],
      before: [
        { step: "Attorney reconstructs the day from memory", value: "28 min" },
        { step: "Re-keys entries into practice management", value: "19 min" },
        { step: "Billing chases the missing narratives", value: "2 days" },
        { step: "Hours that never make it onto a bill", value: "6–14%" },
      ],
      after: [
        { step: "Draft entries assembled from calendar, email, documents", value: "automatic" },
        { step: "Attorney reviews and approves the day", value: "4 min" },
        { step: "Coded and written to practice management", value: "same day" },
        { step: "Billing chases nobody", value: "—" },
      ],
    },
    stat: "10–25%",
    statLabel: "of billable hours typically recovered — a stated assumption, not a guarantee",
    cta: "See the law firm playbook",
  },
  {
    name: "Consulting firms",
    buyer: "For the COO / head of delivery",
    headline: "Project-aware systems for utilization you can trust.",
    bullets: [
      "Phase-level time matching across calendar, email, and PM tools",
      "Utilization and realization by consultant, refreshed daily",
      "Retainer vs. T&M chargeability classified automatically",
      "Wired into Kantata, BigTime, or Replicon",
    ],
    tools: ["Kantata", "BigTime", "Replicon", "Salesforce", "Harvest"],
    complianceTag: "Client-confidential",
    compliance: "Per-client segregation · NDA-safe processing · no public models",
    workflow: {
      subject: "Scoping and quoting at a 140-person consultancy",
      bw: [90, 54, 98, 50],
      aw: [6, 16, 26, 5],
      before: [
        { step: "Partner rebuilds a scope from three past decks", value: "3.5 hrs" },
        { step: "Rates and staffing reconciled by hand in a sheet", value: "1.5 hrs" },
        { step: "Proposal sits waiting on internal review", value: "4 days" },
        { step: "Consultant hours never coded to a phase", value: "8–15%" },
      ],
      after: [
        { step: "Draft scope assembled from your own past engagements", value: "automatic" },
        { step: "Rates, staffing, and margin pre-filled from the model", value: "10 min" },
        { step: "Review routed and cleared in one pass", value: "same day" },
        { step: "Phase-level time coded on capture", value: "—" },
      ],
    },
    stat: "136 hrs",
    statLabel: "returned per week at Karbon after quoting time was cut",
    cta: "See the consulting playbook",
  },
  {
    name: "Financial services",
    buyer: "For the COO / chief compliance officer",
    headline: "Compliance-aware systems that return advisors to clients.",
    bullets: [
      "Digital, compliant onboarding — intake from weeks to days",
      "An advisor CRM built around relationships, not a sales pipeline",
      "AI meeting briefs with account and portfolio context",
      "AI-assisted compliance docs, approved by humans",
    ],
    tools: ["Redtail", "Salesforce FSC", "Orion", "Addepar", "Wealthbox"],
    complianceTag: "Books-and-records ready",
    compliance: "SEC/FINRA retention · reviewable outputs · approval on record",
    workflow: {
      subject: "New client onboarding at a $2.1B RIA",
      bw: [96, 58, 86, 66],
      aw: [8, 4, 24, 20],
      before: [
        { step: "Paperwork collected and chased over email", value: "9 days" },
        { step: "Advisor re-enters the same data in three systems", value: "45 min" },
        { step: "Compliance review queued behind everything else", value: "5 days" },
        { step: "Accounts stalled by a missing document", value: "1 in 4" },
      ],
      after: [
        { step: "Digital intake, validated as the client fills it", value: "automatic" },
        { step: "Written once, synced to CRM, custodian, and portfolio", value: "0 min" },
        { step: "Compliance packet assembled for human approval", value: "same day" },
        { step: "Onboarding start to funded", value: "2–3 days" },
      ],
    },
    stat: "Weeks → days",
    statLabel: "typical client onboarding cycle once the system is live",
    cta: "See the financial services playbook",
  },
  {
    name: "Private equity",
    buyer: "For the operating partner / portco COO",
    headline: "Investor-grade systems that hit the 100-day plan.",
    bullets: [
      "100-day ops sprint — revenue and reporting infrastructure from day one",
      "CRM, pipeline, and attribution at investor-grade standards",
      "Standardized portfolio reporting with live GP dashboards",
      "Cost-reduction automation on the highest-cost processes",
    ],
    tools: ["HubSpot", "NetSuite", "Snowflake", "Power BI", "DealCloud"],
    complianceTag: "Diligence-ready",
    compliance: "Auditable lineage · standardized definitions across portcos",
    workflow: {
      subject: "Monthly portfolio reporting across 7 portcos",
      bw: [92, 46, 98, 60],
      aw: [8, 3, 18, 5],
      before: [
        { step: "Finance pulls numbers from seven different stacks", value: "6 days" },
        { step: "Definitions reconciled by hand, portco by portco", value: "2 days" },
        { step: "Operating partner waits for the board pack", value: "3 wks lag" },
        { step: "Figures restated after the fact", value: "common" },
      ],
      after: [
        { step: "One data model, pulled on a schedule", value: "automatic" },
        { step: "Shared definitions enforced at the source", value: "0 days" },
        { step: "GP dashboard current to yesterday", value: "live" },
        { step: "Lineage auditable back to the system of record", value: "—" },
      ],
    },
    stat: "Day 100",
    statLabel: "reporting infrastructure live across the portfolio company",
    cta: "See the private equity playbook",
  },
  {
    name: "Professional services",
    buyer: "For the COO / VP of operations",
    headline: "Delivery-aware systems that protect billable hours.",
    bullets: [
      "AI-assisted proposals from your templates — minutes, not days",
      "24/7 inbound qualification and routing",
      "Live utilization, billing-efficiency, and project-health views",
      "Automated, branded client reports on your schedule",
    ],
    tools: ["HubSpot", "Karbon", "Asana", "QuickBooks", "Slack"],
    complianceTag: "SOC 2 vendors only",
    compliance: "Your tenancy · your access controls · no public models",
    workflow: {
      subject: "Inbound lead handling at a 60-person firm",
      bw: [94, 70, 52, 84],
      aw: [6, 10, 4, 16],
      before: [
        { step: "Inquiry lands in a shared inbox overnight", value: "14 hrs" },
        { step: "Someone qualifies it between client work", value: "manual" },
        { step: "Routed to the wrong practice, then re-routed", value: "1 in 3" },
        { step: "Leads that never get a second touch", value: "38%" },
      ],
      after: [
        { step: "Answered and qualified on arrival, day or night", value: "under 5 min" },
        { step: "Scored against your own close data", value: "automatic" },
        { step: "Routed to the right owner the first time", value: "—" },
        { step: "Follow-up sequence runs until someone replies", value: "always" },
      ],
    },
    stat: "36.2%",
    statLabel: "sourcing time saved at Qualigence with one agent",
    cta: "See the professional services playbook",
  },
];

export const verticals: Vertical[] = rawVerticals.map((v) => {
  const wf = v.workflow;
  const zip = (list: { step: string; value: string }[], ws: number[]) =>
    list.map((x, k) => ({ ...x, w: (ws[k] ?? 50) + "%" }));
  return {
    name: v.name,
    buyer: v.buyer,
    headline: v.headline,
    bullets: v.bullets,
    tools: v.tools,
    complianceTag: v.complianceTag,
    compliance: v.compliance,
    workflow: {
      subject: wf.subject,
      before: zip(wf.before, wf.bw),
      after: zip(wf.after, wf.aw),
    },
    stat: v.stat,
    statLabel: v.statLabel,
    cta: v.cta,
  };
});

export const adGroups: Record<string, AdGroup> = {
  "AI Process Automation": {
    eyebrow: "AI process automation for professional services",
    headline: "The process eating your margin, running as software.",
    subhead:
      "We evaluate which manual workflow costs you most, build the automation on your real data, and run it after go-live — live in 45 days.",
    points: [
      "Priced against the hire you'd otherwise make, not by the hour",
      "Built inside your own tenancy and access controls",
      "We operate it after launch and answer for the number",
    ],
    formTitle: "Tell us the one process",
    fieldHint: "What process is eating the most hours?",
  },
  "Intake & Legal Operations": {
    eyebrow: "Intake & legal operations automation",
    headline: "Every inquiry answered and qualified before anyone picks up.",
    subhead:
      "Matter-aware intake that routes, scores, and follows up on its own — wired into the practice management system you already run.",
    points: [
      "Answered in under 5 minutes, day or night",
      "Scored against your own close data, routed right the first time",
      "Privilege-first: no public models, audit trail per action",
    ],
    formTitle: "Tell us where intake breaks",
    fieldHint: "Where does intake break down today?",
  },
  "Billing, Time & AR": {
    eyebrow: "Billing, time capture & AR automation",
    headline: "The hours your team worked, actually on the bill.",
    subhead:
      "Time capture assembled from calendar, email, and documents; coded, approved, and written to your system the same day — then AR chases itself.",
    points: [
      "10-25% of billable hours typically recovered",
      "Approval in minutes, not a Friday afternoon reconstruction",
      "Billing stops chasing narratives that never arrive",
    ],
    formTitle: "Tell us where hours leak",
    fieldHint: "Where are billable hours leaking?",
  },
};

export const defaultAdGroup = "AI Process Automation";

export const compareRows: CompareRow[] = [
  { label: "Builds it and runs it day to day", ri: "Yes", consult: "No", internal: "If staffed", tool: "No" },
  { label: "Working system in the first 100 days", ri: "Yes", consult: "Rarely", internal: "Varies", tool: "Partial" },
  { label: "Knows your unit of work", ri: "Yes", consult: "Sometimes", internal: "Yes", tool: "No" },
  { label: "Fixed-scope entry, priced against a hire", ri: "Yes", consult: "No", internal: "n/a", tool: "Seat-based" },
  { label: "Accountable for the number afterward", ri: "Yes", consult: "No", internal: "Yes", tool: "No" },
  { label: "Compliance handled per firm type", ri: "Yes", consult: "Sometimes", internal: "Yes", tool: "No" },
];

export const faqItems = [
  {
    q: "How is this different from an AI consultant?",
    a: "Consultants deliver a recommendation and leave. We build the system and run it as an operating partner, measured on hours recovered and revenue moved.",
  },
  {
    q: "What's the smallest way to start?",
    a: "One fixed-scope automation on your highest-cost manual workflow — often live in 10 days, priced against the payroll it avoids.",
  },
  {
    q: "Are you telling me to replace my people?",
    a: "No. The target is the roles you haven't hired yet. Your people keep the judgment work; most firms redeploy the freed hours.",
  },
  {
    q: "Is it safe under confidentiality or regulatory obligations?",
    a: "No client data in public models, systems built inside your tenancy and access controls, and an audit trail on every automated action.",
  },
  {
    q: "Who owns the system afterward?",
    a: "You do — in your tenancy, in your tools, documented. We run it while that's the cheaper answer, then hand over and stay on call.",
  },
];

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Revenue Institute",
      description:
        "Revenue Institute evaluates, builds, and operates AI process automation and revenue systems for professional services firms of 50 to 500 people.",
      areaServed: "United States",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Novi",
        addressRegion: "MI",
        addressCountry: "US",
      },
      founder: { "@type": "Person", name: "Stephen Lowisz" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Revenue Institute do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Revenue Institute evaluates, builds, and operates the systems a professional services firm runs on. Engagements start with a fixed-scope process automation, prove out on the firm's own data, and expand into AI Operators that own a process end to end. A working system is live inside 100 days.",
          },
        },
        {
          "@type": "Question",
          name: "How is this different from hiring an AI consultant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Consultants deliver a recommendation and leave. Revenue Institute builds the system and then runs it day to day as an operating partner, measured on hours recovered and revenue moved rather than on deliverables.",
          },
        },
        {
          "@type": "Question",
          name: "What is the smallest way to start?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A single fixed-scope process automation on the firm's highest-cost manual workflow, typically live in as little as 10 days and priced against the payroll it avoids.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a full implementation take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Audit to deployed system inside 100 days: weeks 1-3 capture, weeks 4-10 orchestrate, weeks 11-14 run. The client team commits roughly four hours, all during capture.",
          },
        },
        {
          "@type": "Question",
          name: "Is this about replacing employees with AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The target is the roles a firm has not hired yet. Existing staff keep the judgment work; systems absorb repetitive process work, and most firms redeploy freed hours instead of reducing headcount.",
          },
        },
        {
          "@type": "Question",
          name: "Is it safe for a firm under confidentiality or regulatory obligations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. No client data goes into public models, systems are built inside the firm's own tenancy and access controls, every automated action carries an audit trail, and privilege or books-and-records constraints are handled per firm type.",
          },
        },
      ],
    },
  ],
};
