import { QuizQuestion } from "../types";

export interface DiagnosticQuestion extends QuizQuestion {
  competencyId: string;
  domainName: string;
  weight: number;
}

export const DIAGNOSTIC_ASSESSMENT_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "diag-q1",
    competencyId: "comp-dom-01",
    domainName: "National Accounts & SUT Compilation",
    questionText: "Under the System of National Accounts (SNA 2008) adopted by India, what is the precise mathematical relationship between Gross Value Added (GVA) at Basic Prices and GVA at Factor Cost?",
    options: [
      "GVA at Basic Prices = GVA at Factor Cost + (Production Taxes − Production Subsidies)",
      "GVA at Basic Prices = GVA at Factor Cost + (Product Taxes − Product Subsidies)",
      "GVA at Basic Prices = GVA at Factor Cost − Consumption of Fixed Capital (CFC)",
      "GVA at Basic Prices = GVA at Factor Cost + Net Factor Income from Abroad (NFIA)"
    ],
    correctOptionIndex: 0,
    explanation: "GVA at Basic Prices = GVA at Factor Cost + Net Production Taxes (Production Taxes minus Production Subsidies). Production taxes (e.g., land revenues, stamp duties, municipal taxes) are levied on production activity regardless of the quantity of output produced.",
    bloomsLevel: "Analyzing",
    competencyTag: "National Accounts Statistics (NAS)",
    citation: "MoSPI Sources & Methods of National Accounts 2024, Chapter 3",
    weight: 20
  },
  {
    id: "diag-q2",
    competencyId: "comp-dom-02",
    domainName: "Survey Sampling Design & Variance Estimation",
    questionText: "In multi-stage stratified sampling designs implemented by NSSO for socio-economic rounds, why are First Stage Units (FSUs) selected with Probability Proportional to Size (PPS)?",
    options: [
      "To ensure equal sample sizes across rural and urban administrative districts",
      "To assign higher selection probability to larger clusters, reducing the overall sampling variance when paired with self-weighting second stage units",
      "To eliminate the need for non-response adjustments in subsequent rounds",
      "To restrict data collection strictly to high-density commercial centers"
    ],
    correctOptionIndex: 1,
    explanation: "PPS selection of FSUs (Census villages/Urban Frame Survey blocks) accounts for heteroskedasticity and size disparities across clusters, significantly minimizing between-unit sampling variance while allowing uniform interviewer workloads.",
    bloomsLevel: "Evaluating",
    competencyTag: "Survey Sampling Theory & Design",
    citation: "NSSO Survey Design & Estimation Procedures Manual, Sec 4.2",
    weight: 20
  },
  {
    id: "diag-q3",
    competencyId: "comp-dom-04",
    domainName: "Labour Market & Employment Dynamics",
    questionText: "In the Periodic Labour Force Survey (PLFS), how is a person categorized under 'Current Weekly Status' (CWS) as employed?",
    options: [
      "Worked for at least 1 hour on any single day during the 7 days preceding the survey date",
      "Worked for at least 30 days during the preceding 365 days",
      "Worked for at least 4 hours each day for all 7 days of the survey week",
      "Held a formal written employment contract with paid leave benefits"
    ],
    correctOptionIndex: 0,
    explanation: "Under CWS criteria, a person is treated as employed in the labor force if they pursued economic activity for at least 1 hour on at least 1 day during the 7-day reference period preceding the interview.",
    bloomsLevel: "Understanding",
    competencyTag: "Labour Force Statistics & PLFS",
    citation: "NSSO PLFS Concepts and Definitions Handbook, Section 2.5",
    weight: 20
  },
  {
    id: "diag-q4",
    competencyId: "comp-dom-03",
    domainName: "Index Number Theory & Base Revision",
    questionText: "Which aggregative index formula is officially utilized by the Central Statistics Office (CSO) to compile the Index of Industrial Production (IIP)?",
    options: [
      "Paasche's Current-Weighted Formula",
      "Fisher's Ideal Geometric Mean Formula",
      "Laspeyres' Base-Weighted Aggregative Formula",
      "Marshall-Edgeworth Symmetrical Ratio Formula"
    ],
    correctOptionIndex: 2,
    explanation: "The IIP is compiled using Laspeyres' formula: IIP = (∑ Wi * (Qit / Qi0)) / (∑ Wi) * 100, where Wi represents the fixed base-year gross value added weights (Base Year 2011-12).",
    bloomsLevel: "Applying",
    competencyTag: "Index Numbers & Economic Indicators",
    citation: "CSO Manual on Index of Industrial Production (IIP), Methodology Sec 1.3",
    weight: 20
  },
  {
    id: "diag-q5",
    competencyId: "comp-func-01",
    domainName: "Statistical Computing in R/Python & Microdata",
    questionText: "During official microdata dissemination of NSS and ASI unit-level records, which Statistical Disclosure Control (SDC) technique is mandated to prevent identification of extreme outliers?",
    options: [
      "Top-coding and bottom-coding of extreme income/capital expenditure values and micro-aggregation",
      "Deleting all records belonging to rural female respondents",
      "Publishing raw identifiers with signed confidentiality declarations only",
      "Replacing all categorical classifications with random integer tokens"
    ],
    correctOptionIndex: 0,
    explanation: "SDC protocols mandate top/bottom-coding of extreme values (e.g. 99th percentile threshold for plant capital or annual earnings) alongside perturbation and cell suppression to protect respondent anonymity.",
    bloomsLevel: "Applying",
    competencyTag: "Statistical Disclosure Control & Dissemination",
    citation: "MoSPI Microdata Dissemination Policy & Guidelines, 2025",
    weight: 20
  },
  {
    id: "diag-q6",
    competencyId: "comp-func-02",
    domainName: "Data Quality Audit & Administrative Linkage",
    questionText: "When cross-validating administrative data (e.g., GSTN e-way bills or MCA-21 company filings) with the Annual Survey of Industries (ASI), what is the primary statistical challenge?",
    options: [
      "Unit mismatches between legal enterprise identifiers (PAN/CIN) and local operational establishment units (Factories)",
      "Inability to run relational database queries in SQL",
      "Different calendar day counts between leap years and normal years",
      "Total absence of tax records in the manufacturing sector"
    ],
    correctOptionIndex: 0,
    explanation: "Administrative filings (MCA21/GSTN) are typically registered at the Enterprise level (Head Office PAN), whereas industrial surveys (ASI) sample individual establishment/factory units, requiring complex entity-resolution and allocation algorithms.",
    bloomsLevel: "Analyzing",
    competencyTag: "Data Quality Framework & Admin Linkage",
    citation: "MoSPI Data Quality Assurance Framework (DQAF) Guidance Note",
    weight: 20
  },
  {
    id: "diag-q7",
    competencyId: "comp-dom-05",
    domainName: "SDG National Indicator Framework (NIF)",
    questionText: "Under MoSPI's SDG National Indicator Framework (NIF), what defines a 'Tier I' indicator?",
    options: [
      "An indicator with internationally/nationally established methodology and regular, verified official data flow across states",
      "An indicator monitored exclusively by United Nations international consultants",
      "An indicator applicable solely to municipal corporations with population > 1 million",
      "An indicator that requires no historical baseline data point"
    ],
    correctOptionIndex: 0,
    explanation: "Tier I indicators possess standardized methodologies and routine data collection mechanisms through existing censuses, surveys, or administrative registries with universal coverage.",
    bloomsLevel: "Understanding",
    competencyTag: "SDG Monitoring & Data Governance",
    citation: "MoSPI SDG National Indicator Framework Progress Report 2025",
    weight: 20
  },
  {
    id: "diag-q8",
    competencyId: "comp-func-03",
    domainName: "Data Privacy, Ethics & Legal Frameworks",
    questionText: "Under Section 9 of the Collection of Statistics Act 2008 (amended 2017), what legal protection is afforded to information furnished by survey informants?",
    options: [
      "Information is strictly confidential and cannot be used as evidence against the informant in any court proceedings, except for prosecutions under this Act",
      "Information is public domain and can be sold to commercial marketing firms",
      "Information must be shared immediately with credit rating bureaus",
      "Information is retained for 30 days and then permanently destroyed without aggregation"
    ],
    correctOptionIndex: 0,
    explanation: "The Collection of Statistics Act guarantees statutory confidentiality: individual responses cannot be disclosed or used in taxation/police court proceedings, ensuring trust between respondents and statistical agencies.",
    bloomsLevel: "Evaluating",
    competencyTag: "Official Statistics Legal Architecture",
    citation: "The Collection of Statistics Act, 2008 (Govt of India)",
    weight: 20
  }
];
