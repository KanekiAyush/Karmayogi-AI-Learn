export type CadreType =
  | "Subordinate Statistical Service (SSS)"
  | "Indian Statistical Service (ISS)"
  | "State Directorate of Economics & Statistics (DES)"
  | "NSSO Field Operations Division (FOD)"
  | "Departmental Statistical Cell";

export type DesignationType =
  | "Junior Statistical Officer (JSO)"
  | "Senior Statistical Officer (SSO)"
  | "Assistant Director (AD)"
  | "Deputy Director (DD)"
  | "Joint Director / Director"
  | "State Statistical Officer / Research Officer"
  | "Field Investigator / Supervisor";

export interface OfficerProfile {
  id: string;
  name: string;
  employeeId: string;
  cadre: CadreType;
  designation: DesignationType;
  department: string;
  postingZone: string;
  experienceYears: number;
  avatarUrl?: string;
  targetRole: DesignationType;
  igotCreditsEarned: number;
  completedCoursesCount: number;
  weeklyTargetHours: number;
}

export type CompetencyCategory = "Domain" | "Functional" | "Behavioral";

export interface CompetencyItem {
  id: string;
  name: string;
  hindiName?: string;
  category: CompetencyCategory;
  description: string;
  currentLevel: number; // 1 to 5
  requiredLevel: number; // 1 to 5 (Role benchmark)
  subDimensions: string[];
  lastAssessedDate?: string;
  evidenceNotes?: string;
}

export interface IdentifiedGap {
  competency: string;
  category: CompetencyCategory;
  currentLevel: number;
  requiredLevel: number;
  gapSeverity: "Critical" | "High" | "Medium" | "Low";
  impactNarrative: string;
  recommendedActions: string[];
}

export interface CapacityBuildingPlan {
  onTheJob70: string[];
  peerLearning20: string[];
  formalTraining10: string[];
}

export interface GapAnalysisResponse {
  summary: string;
  overallReadinessScore: number;
  identifiedGaps: IdentifiedGap[];
  igotRecommendations: IGotCourse[];
  capacityBuildingPlan70_20_10: CapacityBuildingPlan;
  trajectoryAnalysis: string;
}

export interface CourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  type: "Video Lecture" | "Interactive Reading" | "Case Study" | "Practical Lab";
  summary: string;
  contentBody?: string;
}

export interface IGotCourse {
  courseId: string;
  title: string;
  hindiTitle?: string;
  provider: string; // e.g. NSSTA, ISI Kolkata, CSO, NSSO SDRD
  duration: string;
  credits: number;
  level: "Foundational" | "Intermediate" | "Advanced";
  competencyTargeted: string;
  matchReason?: string;
  description?: string;
  rating?: number;
  learnersEnrolled?: number;
  url?: string;
  modules?: CourseModule[];
  tags?: string[];
  isEnrolled?: boolean;
  progressPercent?: number;
  certificateEarned?: boolean;
}

export interface PreloadedMaterial {
  id: string;
  title: string;
  hindiTitle?: string;
  category: "National Accounts" | "Survey Sampling & PLFS" | "Price & Industrial Indices" | "SDGs & NIF" | "Data Quality & SDC" | "Official Statistics Law & Acts";
  authoringDivision: string;
  pages: number;
  summary: string;
  content: string;
}

export type BloomsLevel = "Remembering" | "Understanding" | "Applying" | "Analyzing" | "Evaluating" | "Creating";

export interface QuizQuestion {
  id: string;
  questionText: string;
  hindiText?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  bloomsLevel: BloomsLevel;
  competencyTag: string;
  citation?: string;
  userSelectedOption?: number;
  isFlagged?: boolean;
}

export interface QuizSet {
  quizId: string;
  title: string;
  topic: string;
  difficulty: "Foundational" | "Intermediate" | "Advanced" | "Specialist";
  totalQuestions: number;
  questions: QuizQuestion[];
  generatedAt?: string;
  sourceMaterialTitle?: string;
  timeLimitMinutes?: number;
  score?: number;
  passed?: boolean;
  completedAt?: string;
}

export interface TutorMessage {
  id: string;
  sender: "user" | "tutor";
  timestamp: string;
  text: string;
  keyTakeaways?: string[];
  practicalApplication?: string;
  commonPitfalls?: string;
  relatedCompetencies?: string[];
  suggestedNextTopics?: string[];
}
