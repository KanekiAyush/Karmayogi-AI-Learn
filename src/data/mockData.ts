import {
  CompetencyItem,
  IGotCourse,
  OfficerProfile,
  PreloadedMaterial,
} from "../types";

export const MOCK_OFFICER_PROFILES: OfficerProfile[] = [
  {
    id: "off-001",
    name: "Smt. Ananya Sharma",
    employeeId: "SSS-2021-0842",
    cadre: "Subordinate Statistical Service (SSS)",
    designation: "Junior Statistical Officer (JSO)",
    department: "National Sample Survey Office (FOD) - Regional Office",
    postingZone: "Northern Zone (New Delhi)",
    experienceYears: 3,
    targetRole: "Senior Statistical Officer (SSO)",
    igotCreditsEarned: 145,
    completedCoursesCount: 6,
    weeklyTargetHours: 4,
  },
  {
    id: "off-002",
    name: "Shri Rajesh Kumar Verma",
    employeeId: "SSS-2016-0319",
    cadre: "Subordinate Statistical Service (SSS)",
    designation: "Senior Statistical Officer (SSO)",
    department: "Central Statistics Office (CSO) - National Accounts Division",
    postingZone: "Headquarters (New Delhi)",
    experienceYears: 8,
    targetRole: "Assistant Director (AD)",
    igotCreditsEarned: 310,
    completedCoursesCount: 14,
    weeklyTargetHours: 5,
  },
  {
    id: "off-003",
    name: "Dr. Meenakshi Iyer",
    employeeId: "ISS-2018-0094",
    cadre: "Indian Statistical Service (ISS)",
    designation: "Assistant Director (AD)",
    department: "MoSPI Economic Statistics Wing & Price Statistics Division",
    postingZone: "Southern Regional Hub (Chennai)",
    experienceYears: 6,
    targetRole: "Deputy Director (DD)",
    igotCreditsEarned: 420,
    completedCoursesCount: 18,
    weeklyTargetHours: 6,
  },
  {
    id: "off-004",
    name: "Shri Alok Ranjan Patra",
    employeeId: "DES-OD-4412",
    cadre: "State Directorate of Economics & Statistics (DES)",
    designation: "State Statistical Officer / Research Officer",
    department: "Directorate of Economics & Statistics, Odisha",
    postingZone: "State Headquarters (Bhubaneswar)",
    experienceYears: 5,
    targetRole: "Senior Statistical Officer (SSO)",
    igotCreditsEarned: 190,
    completedCoursesCount: 8,
    weeklyTargetHours: 4,
  },
];

export const INITIAL_COMPETENCIES: CompetencyItem[] = [
  // Domain Competencies
  {
    id: "comp-dom-01",
    name: "National Accounts & SUT Compilation (SNA 2008)",
    hindiName: "राष्ट्रीय लेखा एवं आपूर्ति-उपयोग सारणी (SUT) संकलन",
    category: "Domain",
    description:
      "Compilation of Gross Domestic Product (GDP), Sectoral Gross Value Added (GVA), Supply-Use Tables, and Capital Formation adhering to UN SNA 2008 standards.",
    currentLevel: 2,
    requiredLevel: 4,
    subDimensions: [
      "Production Taxes & Subsidies vs Product Taxes & Subsidies",
      "Financial Intermediation Services Indirectly Measured (FISIM)",
      "Supply and Use Tables (SUT) Balancing",
      "Consumption of Fixed Capital (CFC) Estimation",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-dom-02",
    name: "Survey Sampling Design & Variance Estimation (NSS/PLFS)",
    hindiName: "सर्वेक्षण प्रतिचयन डिजाइन एवं प्रसरण अनुमान",
    category: "Domain",
    description:
      "Formulation of multi-stage stratified sampling designs, PPS selection of FSUs, circular systematic sampling of households/enterprises, and sub-sample variance calculation.",
    currentLevel: 3,
    requiredLevel: 4,
    subDimensions: [
      "Probability Proportional to Size (PPS) Selection",
      "Stratification and Post-Stratification Weighting",
      "Sub-Sample Replicates and Variance Estimation",
      "Non-Sampling Error Mitigation in Household Surveys",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-dom-03",
    name: "Index Number Theory & Base Revision (CPI & IIP)",
    hindiName: "सूचकांक सिद्धांत एवं आधार वर्ष संशोधन (CPI एवं IIP)",
    category: "Domain",
    description:
      "Price and industrial quantity index compilation, Laspeyres vs Fisher formulas, chaining methodologies, item basket selection, and outlier treatments.",
    currentLevel: 3,
    requiredLevel: 4,
    subDimensions: [
      "Laspeyres Base-Weighted Quantity Index (IIP)",
      "CPI Urban, Rural and Combined Aggregation",
      "Price Imputation and Missing Quote Handling",
      "Geometric Mean of Price Relatives (Jevons Index)",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-dom-04",
    name: "Labour Market & Employment Dynamics (PLFS / ASHE)",
    hindiName: "श्रम बाजार एवं रोजगार सांख्यिकी (PLFS)",
    category: "Domain",
    description:
      "Measurement of Labour Force Participation Rate (LFPR), Worker Population Ratio (WPR), Usual Status (ps+ss) vs Current Weekly Status (CWS), and rotational panel design.",
    currentLevel: 3,
    requiredLevel: 4,
    subDimensions: [
      "Principal vs Subsidiary Activity Status Criteria",
      "Current Daily Status (CDS) & Underemployment",
      "Rotational Panel Sampling Scheme in Urban Blocks",
      "Informality Definition according to NCEUS & ILO",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-dom-05",
    name: "SDG National Indicator Framework (NIF) Monitoring",
    hindiName: "सतत विकास लक्ष्य (SDG) राष्ट्रीय संकेतक ढांचा",
    category: "Domain",
    description:
      "Tracking national and state-level Sustainable Development Goal indicators, metadata alignment with UN Tier standards, and composite score computation.",
    currentLevel: 2,
    requiredLevel: 3,
    subDimensions: [
      "Tier I, Tier II, Tier III Classification",
      "State Indicator Framework (SIF) Alignment",
      "Data Gaps Identification in Social Sectors",
      "NITI Aayog SDG India Index Methodology",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-dom-06",
    name: "Annual Survey of Industries (ASI) & Enterprise Accounting",
    hindiName: "वार्षिक उद्योग सर्वेक्षण (ASI) एवं उद्यम लेखांकन",
    category: "Domain",
    description:
      "Factory Act 1948 frame management, Census vs Sample sector coverage, balancing Block E (Capital), Block H (Inputs), and Block J (Products) verification.",
    currentLevel: 3,
    requiredLevel: 4,
    subDimensions: [
      "NIC-2008 & NPCMS Product Classification",
      "Gross Output, Intermediate Consumption & GVA in Factories",
      "Depreciation vs Replacement Cost in Block C",
      "Joint Factory Returns Cleansing",
    ],
    lastAssessedDate: "2026-07-15",
  },

  // Functional Competencies
  {
    id: "comp-func-01",
    name: "Statistical Programming & Data Wrangling (R / Python)",
    hindiName: "सांख्यिकीय प्रोग्रामिंग एवं डेटा प्रबंधन (R / Python)",
    category: "Functional",
    description:
      "Writing reproducible data pipelines in R (tidyverse, survey package) and Python (pandas, statsmodels) for microdata extraction, cleaning, and table generation.",
    currentLevel: 2,
    requiredLevel: 4,
    subDimensions: [
      "Handling Complex Survey Weights in R 'survey'",
      "Automated Tabulation of NSS Unit-Level Data",
      "Scripted Validation and Anomaly Detection",
      "Data Visualization for Official Statistical Bulletins",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-func-02",
    name: "Statistical Disclosure Control & Microdata Anonymization",
    hindiName: "सांख्यिकीय प्रकटीकरण नियंत्रण एवं माइक्रोडेटा गोपनीयता",
    category: "Functional",
    description:
      "Protecting respondent confidentiality during public microdata release using k-anonymity, top-coding, micro-aggregation, and cell suppression.",
    currentLevel: 1,
    requiredLevel: 3,
    subDimensions: [
      "Identifying Quasi-Identifiers in Census & NSS",
      "Top-coding and Bottom-coding of Extreme Values",
      "Microdata Dissemination Policy of MoSPI",
      "Synthetic Data Generation for Safe Enclaves",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-func-03",
    name: "Data Quality Audit & Administrative Registry Integration",
    hindiName: "डेटा गुणवत्ता ऑडिट एवं प्रशासनिक रजिस्ट्री एकीकरण",
    category: "Functional",
    description:
      "Conducting data quality assessments using MoSPI Data Quality Assurance Framework (DQAF) and linking administrative data (GSTN, MCA21, EPFO).",
    currentLevel: 2,
    requiredLevel: 4,
    subDimensions: [
      "MoSPI DQAF 6 Dimensions of Quality",
      "Probabilistic Record Linkage for Enterprise Registries",
      "Handling Reporting Lags and Revisions",
      "Cross-Validation between Survey and Tax Records",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-func-04",
    name: "CAPI / CATI Digital Survey Systems & Telemetry Monitoring",
    hindiName: "CAPI/CATI डिजिटल सर्वेक्षण प्रणालियाँ एवं टेलीमेट्री",
    category: "Functional",
    description:
      "Deploying Computer-Assisted Personal Interviewing (CAPI) on Android tablets, audit trail scrutiny, geo-tagging validation, and paradata analysis.",
    currentLevel: 4,
    requiredLevel: 4,
    subDimensions: [
      "Logic Check Scripting in Survey Solutions/CSPro",
      "GPS Timestamp & Audio Paradata Scrutiny",
      "Real-Time Field Progress Dashboards",
      "Offline Synchronization Protocol Management",
    ],
    lastAssessedDate: "2026-07-15",
  },

  // Behavioral Competencies
  {
    id: "comp-beh-01",
    name: "Ethical Integrity & Impartiality in Public Statistics",
    hindiName: "सार्वजनिक सांख्यिकी में नैतिक सत्यनिष्ठा एवं निष्पक्षता",
    category: "Behavioral",
    description:
      "Upholding the UN Fundamental Principles of Official Statistics, resisting data manipulation pressure, and guaranteeing transparent methodology.",
    currentLevel: 4,
    requiredLevel: 5,
    subDimensions: [
      "UN Fundamental Principles of Official Statistics",
      "Collection of Statistics Act 2008 Compliance",
      "Protection of Respondent Identity & Trust",
      "Transparent Dissemination of Revisions & Errors",
    ],
    lastAssessedDate: "2026-07-15",
  },
  {
    id: "comp-beh-02",
    name: "Evidence-Based Communication & Policy Translation",
    hindiName: "तथ्य-आधारित संचार एवं नीतिगत व्याख्या",
    category: "Behavioral",
    description:
      "Communicating complex statistical findings, confidence intervals, and limitations to non-technical policymakers, media, and academic researchers.",
    currentLevel: 3,
    requiredLevel: 4,
    subDimensions: [
      "Drafting Executive Briefs for Cabinet & Ministries",
      "Explaining Statistical Uncertainty & Confidence Bands",
      "Effective Visual Storytelling for Public Consumption",
      "Handling Media Inquiries on Inflation & GDP",
    ],
    lastAssessedDate: "2026-07-15",
  },
];

export const IGOT_COURSES_CATALOG: IGotCourse[] = [
  {
    courseId: "igot-mospi-101",
    title: "National Accounts Statistics: SUT & SNA 2008 Framework",
    hindiTitle: "राष्ट्रीय लेखा सांख्यिकी: आपूर्ति-उपयोग सारणी एवं SNA 2008",
    provider: "National Statistical Systems Training Academy (NSSTA) / CSO",
    duration: "18 Hours",
    credits: 25,
    level: "Advanced",
    competencyTargeted: "National Accounts & SUT Compilation (SNA 2008)",
    description:
      "In-depth capacity building course on macroeconomic accounting under UN SNA 2008. Covers gross value added derivation across 8 broad economic sectors, production vs product tax treatments, SUT matrix balancing, and capital stock compilation.",
    rating: 4.9,
    learnersEnrolled: 1840,
    tags: ["GDP", "SNA 2008", "Macroeconomics", "CSO", "SUT"],
    isEnrolled: true,
    progressPercent: 65,
    modules: [
      {
        id: "mod-101-1",
        title: "Introduction to SNA 2008 vs SNA 1993 Transition in India",
        durationMinutes: 90,
        type: "Video Lecture",
        summary: "Historical evolution of national income compilation in India and key conceptual shifts introduced in the 2011-12 base revision.",
      },
      {
        id: "mod-101-2",
        title: "Gross Value Added (GVA) at Basic Prices vs GDP at Market Prices",
        durationMinutes: 120,
        type: "Interactive Reading",
        summary: "Mathematical breakdown of production taxes/subsidies vs product taxes/subsidies and treatment of financial intermediaries (FISIM).",
      },
      {
        id: "mod-101-3",
        title: "Supply and Use Tables (SUT): Balancing 140x140 Commodity-Industry Matrices",
        durationMinutes: 150,
        type: "Practical Lab",
        summary: "Hands-on balancing exercise for intermediate consumption, trade and transport margins, and final demand components.",
      },
      {
        id: "mod-101-4",
        title: "Quarterly Estimates & High-Frequency Indicator Extrapolation",
        durationMinutes: 120,
        type: "Case Study",
        summary: "Benchmark-indicator ratio method for deriving advance quarterly GDP aggregates from GST, railway freight, and IIP data.",
      },
    ],
  },
  {
    courseId: "igot-mospi-102",
    title: "Advanced Survey Sampling & Weight Calibration for Official Statistics",
    hindiTitle: "उन्नत सर्वेक्षण प्रतिचयन एवं भार अंशांकन",
    provider: "Indian Statistical Institute (ISI) Kolkata & MoSPI",
    duration: "16 Hours",
    credits: 20,
    level: "Advanced",
    competencyTargeted: "Survey Sampling Design & Variance Estimation (NSS/PLFS)",
    description:
      "Rigorous training on complex multi-stage sampling designs used in large-scale socio-economic surveys in India. Focuses on PPS sampling, circular systematic selection, post-stratification weight calibration, and bootstrapping variance estimation.",
    rating: 4.8,
    learnersEnrolled: 2450,
    tags: ["Sampling", "NSSO", "Variance Estimation", "ISI", "PPS"],
    isEnrolled: true,
    progressPercent: 40,
    modules: [
      {
        id: "mod-102-1",
        title: "Foundations of Probability Proportional to Size (PPS) Selection",
        durationMinutes: 100,
        type: "Video Lecture",
        summary: "Hansen-Hurwitz and Horvitz-Thompson estimators under varying probability sampling schemes in rural villages and urban blocks.",
      },
      {
        id: "mod-102-2",
        title: "Multi-Stage Stratified Design in NSS Socio-Economic Rounds",
        durationMinutes: 110,
        type: "Interactive Reading",
        summary: "Frame creation, allocation of sample FSUs across strata and sub-strata, and second stage sub-stratification for household selection.",
      },
      {
        id: "mod-102-3",
        title: "Weight Derivation, Multipliers, and Post-Stratification Calibration",
        durationMinutes: 130,
        type: "Practical Lab",
        summary: "Calculating sub-sample weights, combined multipliers, and adjusting for non-response using auxiliary demographic totals.",
      },
    ],
  },
  {
    courseId: "igot-mospi-103",
    title: "Python & R for Official Statistical Processing & Microdata Anonymization",
    hindiTitle: "सांख्यिकीय प्रसंस्करण एवं माइक्रोडेटा गोपनीयता हेतु Python एवं R",
    provider: "Data Innovation Lab - MoSPI",
    duration: "24 Hours",
    credits: 30,
    level: "Intermediate",
    competencyTargeted: "Statistical Programming & Data Wrangling (R / Python)",
    description:
      "Comprehensive hands-on coding course tailored for statistical officers to modernize data workflows. Learn to read fixed-width NSS/PLFS raw data, apply sampling weights via survey libraries, create automated statistical bulletins, and apply SDC algorithms.",
    rating: 4.95,
    learnersEnrolled: 3100,
    tags: ["R Programming", "Python", "Data Science", "Microdata", "Automation"],
    isEnrolled: false,
    progressPercent: 0,
    modules: [
      {
        id: "mod-103-1",
        title: "Ingesting Fixed-Width Unit-Level Datasets from NSS & ASI in R/Python",
        durationMinutes: 120,
        type: "Practical Lab",
        summary: "Using readr/pandas layout parsers to rapidly load and merge multi-record survey blocks without memory bottlenecks.",
      },
      {
        id: "mod-103-2",
        title: "Estimating Population Parameters with Survey Weights in R 'survey'",
        durationMinutes: 140,
        type: "Practical Lab",
        summary: "Defining svydesign objects with cluster (FSU), stratum, and weight specifications to produce official estimates and standard errors.",
      },
      {
        id: "mod-103-3",
        title: "Statistical Disclosure Control (SDC) Implementation with sdcMicro",
        durationMinutes: 120,
        type: "Case Study",
        summary: "Assessing k-anonymity, l-diversity, and applying perturbative methods on public-use files before MoSPI portal release.",
      },
    ],
  },
  {
    courseId: "igot-mospi-104",
    title: "Index of Industrial Production (IIP) & CPI: Compilation Protocols",
    hindiTitle: "औद्योगिक उत्पादन सूचकांक (IIP) एवं उपभोक्ता मूल्य सूचकांक (CPI)",
    provider: "Economic Statistics Division (ESD) & CSO",
    duration: "12 Hours",
    credits: 18,
    level: "Intermediate",
    competencyTargeted: "Index Number Theory & Base Revision (CPI & IIP)",
    description:
      "Master the operational and mathematical procedures for compiling India's monthly headline macroeconomic indicators. Learn Laspeyres indexing, item basket selection, price imputation for missing quotes, and seasonal adjustment techniques.",
    rating: 4.75,
    learnersEnrolled: 1560,
    tags: ["IIP", "CPI", "Inflation", "Base Revision", "Price Statistics"],
    isEnrolled: false,
    progressPercent: 0,
    modules: [
      {
        id: "mod-104-1",
        title: "Mathematical Foundations of Laspeyres and Paasche Formulae",
        durationMinutes: 90,
        type: "Video Lecture",
        summary: "Theoretical properties, axiomatic tests, and substitution bias in base-weighted aggregative indexes.",
      },
      {
        id: "mod-104-2",
        title: "CPI Price Collection, Web Portal Validation, and Imputation SOPs",
        durationMinutes: 110,
        type: "Interactive Reading",
        summary: "Weekly/monthly price schedules, dealing with seasonal items (fruits/vegetables), and handling specification changes in consumer goods.",
      },
    ],
  },
  {
    courseId: "igot-mospi-105",
    title: "Periodic Labour Force Survey (PLFS): Concepts, Schedules & Field Protocols",
    hindiTitle: "आवधिक श्रम बल सर्वेक्षण (PLFS): अवधारणाएँ, अनुसूचियाँ एवं क्षेत्र प्रोटोकॉल",
    provider: "Survey Design and Research Division (SDRD) - NSSO",
    duration: "14 Hours",
    credits: 20,
    level: "Foundational",
    competencyTargeted: "Labour Market & Employment Dynamics (PLFS / ASHE)",
    description:
      "Mandatory course for all NSSO and State DES field officers. Covers Schedule 10.4, usual status vs current weekly status identification, enterprise informality classification, and rotational panel tracking in urban survey blocks.",
    rating: 4.85,
    learnersEnrolled: 4200,
    tags: ["PLFS", "NSSO", "Employment", "Field Operations", "CAPI"],
    isEnrolled: true,
    progressPercent: 90,
    modules: [
      {
        id: "mod-105-1",
        title: "Classifying Activity Status: Usual (ps+ss) vs Current Weekly Status (CWS)",
        durationMinutes: 120,
        type: "Video Lecture",
        summary: "Step-by-step decision tree for probing economic activity, major time spent criteria, and subsidiary work categorization.",
      },
      {
        id: "mod-105-2",
        title: "Rotational Panel Sampling Scheme in Urban Blocks",
        durationMinutes: 90,
        type: "Interactive Reading",
        summary: "Management of 25% sample replacement across 4 consecutive quarters in urban CAPI operations.",
      },
    ],
  },
  {
    courseId: "igot-mospi-106",
    title: "SDG National Indicator Framework: Data Governance & Local Indicator Mapping",
    hindiTitle: "सतत विकास लक्ष्य राष्ट्रीय संकेतक ढांचा: डेटा गवर्नेंस",
    provider: "Sustainable Development Goals Division, MoSPI",
    duration: "10 Hours",
    credits: 15,
    level: "Foundational",
    competencyTargeted: "SDG National Indicator Framework (NIF) Monitoring",
    description:
      "Learn how MoSPI coordinates with line ministries, NITI Aayog, and state planning boards to monitor 300+ national indicators across 17 SDGs. Includes guidance on creating State & District Indicator Frameworks (SIF/DIF).",
    rating: 4.7,
    learnersEnrolled: 1980,
    tags: ["SDGs", "NITI Aayog", "NIF", "Local Monitoring", "Data Governance"],
    isEnrolled: false,
    progressPercent: 0,
    modules: [
      {
        id: "mod-106-1",
        title: "Structure of National Indicator Framework (NIF) and UN Global Tier Alignments",
        durationMinutes: 80,
        type: "Video Lecture",
        summary: "Data flow architecture, custodian ministries, and verification protocols for SDG target metrics.",
      },
      {
        id: "mod-106-2",
        title: "Developing District Indicator Frameworks (DIF) for Grassroots Convergence",
        durationMinutes: 90,
        type: "Case Study",
        summary: "Practical examples from Aspirational Districts on institutionalizing monthly administrative data feeds.",
      },
    ],
  },
  {
    courseId: "igot-mospi-107",
    title: "Data Quality Assurance Framework (DQAF) for Official Statistics",
    hindiTitle: "आधिकारिक सांख्यिकी हेतु डेटा गुणवत्ता आश्वासन ढांचा (DQAF)",
    provider: "CSO & Quality Assurance Cell, MoSPI",
    duration: "12 Hours",
    credits: 18,
    level: "Intermediate",
    competencyTargeted: "Data Quality Audit & Administrative Registry Integration",
    description:
      "Institutionalizing quality checks across 6 core dimensions: Relevance, Accuracy & Reliability, Timeliness & Punctuality, Coherence & Comparability, Accessibility, and Interpretability.",
    rating: 4.8,
    learnersEnrolled: 1650,
    tags: ["DQAF", "Quality Audit", "Administrative Data", "Validation"],
    isEnrolled: false,
    progressPercent: 0,
  },
  {
    courseId: "igot-mospi-108",
    title: "Annual Survey of Industries: Enterprise Schedules & Balance Sheet Reconciliation",
    hindiTitle: "वार्षिक उद्योग सर्वेक्षण: उद्यम अनुसूचियाँ एवं तुलन पत्र समाधान",
    provider: "Field Operations Division (FOD) & Industrial Statistics Wing",
    duration: "15 Hours",
    credits: 22,
    level: "Intermediate",
    competencyTargeted: "Annual Survey of Industries (ASI) & Enterprise Accounting",
    description:
      "Practical reconciliation guide for ASI factory schedules. Learn to extract correct figures from audited Balance Sheets, Profit & Loss accounts, and GST returns into ASI Block C, E, F, H, and J.",
    rating: 4.9,
    learnersEnrolled: 2800,
    tags: ["ASI", "Factories Act", "Manufacturing", "FOD", "GVA"],
    isEnrolled: false,
    progressPercent: 0,
  },
];

export const PRELOADED_LEARNING_MATERIALS: PreloadedMaterial[] = [
  {
    id: "mat-plfs-2024",
    title: "Periodic Labour Force Survey (PLFS) - Operational Manual & Classification Guidelines",
    hindiTitle: "आवधिक श्रम बल सर्वेक्षण (PLFS) - परिचालन नियमावली",
    category: "Survey Sampling & PLFS",
    authoringDivision: "Survey Design and Research Division (SDRD), NSSO",
    pages: 142,
    summary:
      "Official operational guide detailing concepts, definitions of economic activity, Usual Status (ps+ss) versus Current Weekly Status (CWS), rotational panel sampling design in urban sectors, and CAPI verification rules.",
    content: `
MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION
NATIONAL SAMPLE SURVEY OFFICE (NSSO)
PERIODIC LABOUR FORCE SURVEY (PLFS) - CONCEPTS AND METHODOLOGY

1. INTRODUCTION & OBJECTIVES:
The Periodic Labour Force Survey (PLFS) is designed to estimate key labour market indicators—Labour Force Participation Rate (LFPR), Worker Population Ratio (WPR), and Unemployment Rate (UR)—at short quarterly intervals for urban areas and annually for both rural and urban areas.

2. ACTIVITY STATUS CLASSIFICATION:
The survey categorizes individuals aged 7 years and above into various activity statuses based on two distinct reference periods:

A. Usual Principal Status (UPS):
The status of activity on which a person spent relatively long time (major time criterion) during the 365 days preceding the date of survey. Activities are grouped into:
- Working (employed): Seeking/available for work (unemployed) - together constituting the Labour Force.
- Not in Labour Force: Students, domestic work, pensioners, rentiers, etc.

B. Usual Subsidiary Status (UPSS):
A person categorized as non-worker/unemployed on the basis of principal status can be pursued in a subsidiary economic activity for at least 30 days during the 365 days reference period. Combining UPS and UPSS gives the broad Usual Status (ps+ss) employment measure.

C. Current Weekly Status (CWS):
Determined on the basis of activity during the 7 days preceding the date of survey. A person is considered employed if they worked for at least 1 hour on any single day during the 7-day period.

3. SAMPLING DESIGN & ROTATIONAL PANEL:
- Rural: Stratified multi-stage sampling. FSUs are census villages (2011 Census). Large villages are divided into Hamlet Groups (hg). Households within FSUs are selected via circular systematic sampling after second stage stratification.
- Urban: Stratified multi-stage design using Urban Frame Survey (UFS) blocks as FSUs. Employs a Rotational Panel scheme where each selected UFS block is visited 4 times (quarters) with 25% rotation. This ensures reliable measurement of short-term changes while limiting respondent fatigue.

4. SECOND STAGE STRATIFICATION (SSS):
In both rural and urban FSUs, households are stratified into 3 sub-strata based on average monthly per capita consumption expenditure (MPCE) and household type/education levels, ensuring balanced representation of formal, informal, and vulnerable households.

5. ERROR MITIGATION & DATA QUALITY:
- Paradata Analysis: Timestamps, duration of interview per block, geo-location validation.
- Internal Consistency Checks: Validation between hours worked per day in Block 5.3 and income reported in Block 6.
- Supervisors conduct 10% re-interviews and 15% concurrent inspections to minimize investigator bias.
    `,
  },
  {
    id: "mat-nas-sna2008",
    title: "National Accounts Statistics (NAS) - Sources and Methods (SNA 2008 Framework)",
    hindiTitle: "राष्ट्रीय लेखा सांख्यिकी - स्रोत एवं पद्धतियाँ (SNA 2008)",
    category: "National Accounts",
    authoringDivision: "Central Statistics Office (CSO) - National Accounts Division",
    pages: 310,
    summary:
      "Comprehensive technical compendium explaining how India compiles Gross Value Added (GVA) across agriculture, manufacturing, services, and public administration. Details production taxes vs product taxes, SUT balancing, and capital formation.",
    content: `
CENTRAL STATISTICS OFFICE (CSO) - NATIONAL ACCOUNTS DIVISION
SOURCES AND METHODS OF NATIONAL ACCOUNTS STATISTICS (BASE 2011-12 & SNA 2008)

1. SYSTEM OF NATIONAL ACCOUNTS (SNA 2008) ARCHITECTURE:
The compilation of national aggregates in India follows the United Nations System of National Accounts 2008 (SNA 2008). 

Key Conceptual Distinctions:
1. GVA at Factor Cost: Sum of payments to factors of production (Compensation of Employees + Operating Surplus/Mixed Income + Consumption of Fixed Capital).
2. GVA at Basic Prices: GVA at Factor Cost + (Production Taxes - Production Subsidies).
   - Production Taxes: Taxes paid on ownership or use of land, buildings, or other assets used in production, irrespective of the volume produced (e.g., land revenue, stamp duties, municipal taxes).
   - Production Subsidies: Subsidies on production regardless of quantity (e.g., input subsidies to small farmers, interest subsidies).
3. GDP at Market Prices: GVA at Basic Prices + (Product Taxes - Product Subsidies).
   - Product Taxes: Taxes levied per unit of good or service produced/transacted (e.g., GST, customs, excise duties, sales tax).
   - Product Subsidies: Subsidies per unit produced/sold (e.g., food subsidy, petroleum subsidy, fertilizer subsidy).

2. INSTITUTIONAL SECTORS:
The economy is segregated into 5 mutually exclusive institutional sectors:
1. Non-Financial Corporations (Private corporate and Public enterprises)
2. Financial Corporations (RBI, commercial banks, insurance, NBFCs, mutual funds)
3. General Government (Central, State, and Local bodies)
4. Households (including unincorporated enterprises and non-profit institutions serving households - NPISH)
5. Rest of the World (external transactions)

3. FINANCIAL INTERMEDIATION SERVICES INDIRECTLY MEASURED (FISIM):
Financial institutions charge higher interest rates to borrowers than they pay to depositors. The difference between the actual interest received/paid and the value at a reference rate represents FISIM, which is apportioned between intermediate consumption of enterprises and final consumption of households.

4. SUPPLY AND USE TABLES (SUT):
SUT provides the comprehensive accounting framework ensuring macroeconomic consistency. The Supply Table depicts the output of goods and services by domestic industries and imports. The Use Table depicts the intermediate consumption by industries and final demand (Private Final Consumption Expenditure - PFCE, Government Final Consumption Expenditure - GFCE, Gross Fixed Capital Formation - GFCF, Change in Stocks, Valuables, and Exports).
    `,
  },
  {
    id: "mat-iip-cpi-manual",
    title: "Manual on Index of Industrial Production (IIP) and Consumer Price Index (CPI)",
    hindiTitle: "औद्योगिक उत्पादन सूचकांक (IIP) एवं उपभोक्ता मूल्य सूचकांक (CPI) नियमावली",
    category: "Price & Industrial Indices",
    authoringDivision: "Economic Statistics Division (ESD), MoSPI",
    pages: 185,
    summary:
      "Compilation guidelines covering Laspeyres weighted aggregate indexing, monthly source agency data feeds, CPI weighting diagram derived from Consumer Expenditure Survey, imputation rules, and outlier detection.",
    content: `
MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION
MANUAL ON COMPILATION OF IIP AND CPI

1. INDEX OF INDUSTRIAL PRODUCTION (IIP - BASE 2011-12):
The IIP measures the short-term volume changes in the production of a representative basket of industrial products.

Formula:
Uses the Laspeyres base-weighted formula:
IIP_t = [ ∑ (W_i * (Q_it / Q_i0)) ] / ∑ W_i * 100
Where:
- W_i: Weight allocated to the i-th item group based on Gross Value Added (GVA) from the Annual Survey of Industries (ASI) in the base year.
- Q_it: Production quantity of the i-th item in month t.
- Q_i0: Monthly average production quantity in the base year (2011-12).

Sectoral Classification:
1. Mining (Weight: 14.37%)
2. Manufacturing (Weight: 77.63%)
3. Electricity (Weight: 7.99%)

Use-Based Classification:
Primary Goods, Capital Goods, Intermediate Goods, Infrastructure/Construction Goods, Consumer Durables, Consumer Non-Durables.

2. CONSUMER PRICE INDEX (CPI - BASE 2012=100):
Measures changes over time in the general level of prices of goods and services that a reference population acquires, uses, or pays for consumption.

Series Compiled:
- CPI (Rural): Covers 1,181 selected rural villages across all States/UTs.
- CPI (Urban): Covers 1,114 selected urban markets.
- CPI (Combined): Macroeconomic headline inflation measure.

Price Aggregation Methodology:
At the elementary level (market/village level), elementary price relatives are calculated using the geometric mean (Jevons Index) to minimize upward substitution bias. Higher level aggregations into subgroups, groups, and general indices use the modified Laspeyres index with weights derived from the Household Consumer Expenditure Survey (CES).
    `,
  },
  {
    id: "mat-sampling-theory",
    title: "NSSO Survey Sampling Techniques & Non-Sampling Error Control",
    hindiTitle: "एनएसएसओ सर्वेक्षण प्रतिचयन तकनीक एवं गैर-प्रतिचयन त्रुटि नियंत्रण",
    category: "Survey Sampling & PLFS",
    authoringDivision: "National Statistical Systems Training Academy (NSSTA)",
    pages: 220,
    summary:
      "Theoretical and applied foundations of multi-stage stratified sampling, Horvitz-Thompson estimation, Hansen-Hurwitz PPSWR estimators, post-stratification, non-response imputation, and field supervision mechanisms.",
    content: `
NATIONAL STATISTICAL SYSTEMS TRAINING ACADEMY (NSSTA)
SURVEY SAMPLING DESIGNS AND ESTIMATION PROCEDURES IN OFFICIAL STATISTICS

1. SAMPLING THEORETICAL FRAMEWORK:
A. Probability Proportional to Size (PPS) Selection:
When sampling units vary dramatically in size (such as villages or census blocks), Simple Random Sampling (SRS) leads to high estimation variance. PPS sampling assigns each unit an inclusion probability proportional to an auxiliary measure of size (population or count of households).
- PPS With Replacement (PPSWR): Estimator of population total Y is:
  Y_hat = (1/n) * ∑ (y_i / p_i), where p_i = M_i / M_0 (relative size).
- Hansen-Hurwitz Variance: V(Y_hat) = (1/n) * ∑ p_i * (y_i/p_i - Y)^2.

B. Multi-Stage Stratified Sampling:
- Stage 1: Selection of First Stage Units (FSUs) - Villages in Rural, UFS Blocks in Urban.
- Stage 2: Listing and formation of Hamlet Groups (hg) or Sub-Blocks for large units (e.g. population > 1200).
- Stage 3: Second Stage Stratification of Ultimate Stage Units (Households or Enterprises) based on economic affluence/activity.
- Stage 4: Selection of sample households using Circular Systematic Sampling.

2. NON-SAMPLING ERRORS AND QUALITY CONTROL:
Non-sampling errors often exceed sampling errors in large-scale national surveys.
Sources:
1. Coverage error (incomplete or outdated frames).
2. Response error (respondent recall fatigue, telescoping of expenditure).
3. Non-response (refusals, locked houses).
4. Measurement/Investigator error (poorly worded questions, incorrect probing).

Standard Mitigation Protocol:
- Replacement rules for casualties.
- Two-subsample design: Sample FSUs are divided into Subsample 1 and Subsample 2 surveyed by different field investigators. Comparing sub-sample estimates provides an empirical check on field reliability.
    `,
  },
  {
    id: "mat-sdg-nif-2024",
    title: "National Indicator Framework (NIF) for Sustainable Development Goals - Handbook",
    hindiTitle: "सतत विकास लक्ष्यों हेतु राष्ट्रीय संकेतक ढांचा (NIF) - पुस्तिका",
    category: "SDGs & NIF",
    authoringDivision: "Social Statistics Division (SSD), MoSPI",
    pages: 160,
    summary:
      "Detailed manual on monitoring 17 SDGs through 300+ national indicators. Highlights metadata standardization, data validation across ministries, Tier I/II criteria, and state convergence index compilation.",
    content: `
MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION
SUSTAINABLE DEVELOPMENT GOALS - NATIONAL INDICATOR FRAMEWORK (NIF)

1. MANDATE & INSTITUTIONAL MECHANISM:
MoSPI is the nodal agency for developing and maintaining the National Indicator Framework (NIF) to monitor progress towards the 17 Sustainable Development Goals (SDGs) and 169 targets adopted by the UN in 2015.

2. TIER CLASSIFICATION:
- Tier I: Indicator is conceptually clear, has an internationally and nationally established methodology and standards, and data are regularly produced by countries for at least 50% of people or of the region.
- Tier II: Indicator is conceptually clear, has an established methodology, but data are not regularly produced across all states/UTs.
- Tier III: No established methodology or standards are yet available for the indicator (gradually phased out through R&D).

3. COORDINATION WITH STATE GOVERNMENTS:
To foster competitive and cooperative federalism, MoSPI facilitates states in institutionalizing:
1. State Indicator Framework (SIF): Tailored to state development priorities.
2. District Indicator Framework (DIF): Enabling district collectors and planning officers to identify lagging development blocks.

4. DATA QUALITY & STANDARDIZATION:
Metadata sheets for every NIF indicator explicitly document:
- Defining Ministry/Department.
- Computation Formula.
- Numerator and Denominator Data Sources.
- Periodicity of Release (Monthly, Quarterly, Annual, Triennial).
- Unit of Measurement (Percentage, Per 100,000 population, Metric tonnes).
    `,
  },
];
