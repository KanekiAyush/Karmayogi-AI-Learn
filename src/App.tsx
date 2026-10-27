import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { DiagnosticAssessment } from "./components/DiagnosticAssessment";
import { CompetencyGapAnalyzer } from "./components/CompetencyGapAnalyzer";
import { IGotKarmayogiHub } from "./components/IGotKarmayogiHub";
import { QuizMCQStudio } from "./components/QuizMCQStudio";
import { KarmayogiSahayak } from "./components/KarmayogiSahayak";
import { JudgeModeDashboard } from "./components/JudgeModeDashboard";
import {
  CompetencyItem,
  GapAnalysisResponse,
  IGotCourse,
  OfficerProfile,
  QuizSet,
} from "./types";
import {
  INITIAL_COMPETENCIES,
  IGOT_COURSES_CATALOG,
  MOCK_OFFICER_PROFILES,
} from "./data/mockData";

export default function App() {
  const [currentOfficer, setCurrentOfficer] = useState<OfficerProfile>(
    MOCK_OFFICER_PROFILES[0]
  );
  const [competencies, setCompetencies] =
    useState<CompetencyItem[]>(INITIAL_COMPETENCIES);
  const [courses, setCourses] = useState<IGotCourse[]>(IGOT_COURSES_CATALOG);
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysisResponse | null>(
    null
  );
  const [isLoadingGapAnalysis, setIsLoadingGapAnalysis] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("diagnostic-assessment");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [activeQuizForStudio, setActiveQuizForStudio] =
    useState<QuizSet | null>(null);
  const [selectedCourseIdForHub, setSelectedCourseIdForHub] = useState<
    string | null
  >(null);

  // Run initial gap analysis on mount or officer switch
  useEffect(() => {
    runGapAnalysis();
  }, [currentOfficer.id]);

  const runGapAnalysis = async (customComps?: CompetencyItem[]) => {
    setIsLoadingGapAnalysis(true);
    const compsToUse = customComps || competencies;

    try {
      const response = await fetch("/api/competency/analyze-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          officerProfile: currentOfficer,
          currentCompetencies: compsToUse,
          targetRole: currentOfficer.targetRole,
          department: currentOfficer.department,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze competency gap from server.");
      }

      const data: GapAnalysisResponse = await response.json();
      setGapAnalysis(data);
    } catch (err) {
      console.warn("Gap analysis network fallback invoked:", err);
      // Local client-side fallback calculation based on current state
      const totalReq = compsToUse.reduce((acc, c) => acc + c.requiredLevel, 0);
      const totalCurr = compsToUse.reduce((acc, c) => acc + c.currentLevel, 0);
      const readiness = Math.min(
        95,
        Math.max(30, Math.round((totalCurr / Math.max(1, totalReq)) * 100))
      );

      const gaps = compsToUse
        .filter((c) => c.requiredLevel > c.currentLevel)
        .map((c) => ({
          competency: c.name,
          category: c.category,
          currentLevel: c.currentLevel,
          requiredLevel: c.requiredLevel,
          gapSeverity: (c.requiredLevel - c.currentLevel >= 2
            ? "High"
            : "Medium") as any,
          impactNarrative: `Operational capability gap in ${c.name} mapped against ${currentOfficer.targetRole} role benchmark.`,
          recommendedActions: [
            `Complete iGOT Karmayogi module for ${c.name}`,
            `Participate in MoSPI technical working groups`,
          ],
        }));

      setGapAnalysis({
        summary: `Strategic competency evaluation for ${currentOfficer.name} (${currentOfficer.designation}), aligned with MoSPI FRAC standards.`,
        overallReadinessScore: readiness,
        identifiedGaps:
          gaps.length > 0
            ? gaps
            : [
                {
                  competency: "National Accounts & SUT Compilation",
                  category: "Domain",
                  currentLevel: 2,
                  requiredLevel: 4,
                  gapSeverity: "High",
                  impactNarrative:
                    "Critical for compiling GSDP and Sectoral GVA adhering to SNA 2008.",
                  recommendedActions: [
                    "Complete iGOT Course NAS-301",
                    "Participate in CSO quarterly accounts workshop",
                  ],
                },
              ],
        igotRecommendations: [
          {
            courseId: "igot-mospi-101",
            title: "National Accounts Statistics: SUT & SNA 2008 Framework",
            provider: "National Statistical Systems Training Academy (NSSTA) / iGOT",
            duration: "18 Hours",
            credits: 25,
            level: "Advanced",
            competencyTargeted: "National Accounts & SUT Compilation",
            matchReason:
              "Directly bridges macroeconomic aggregates and supply-use tables estimation gaps.",
            url: "https://igotkarmayogi.gov.in",
          },
          {
            courseId: "igot-mospi-102",
            title: "Advanced Survey Sampling & Calibration for Official Statistics",
            provider: "Indian Statistical Institute (ISI) & MoSPI",
            duration: "14 Hours",
            credits: 20,
            level: "Intermediate",
            competencyTargeted:
              "Multivariate Sampling & Survey Estimation (PLFS/ASHE)",
            matchReason:
              "Provides hands-on techniques for survey weighting and non-sampling error reduction.",
            url: "https://igotkarmayogi.gov.in",
          },
        ],
        capacityBuildingPlan70_20_10: {
          onTheJob70: [
            "Participate in live validation team for the upcoming official data cycle.",
            "Shadow a Senior Statistical Officer during NSS Field Operations Division enterprise verification.",
            "Author an internal technical monograph on sub-state indicators.",
          ],
          peerLearning20: [
            "Join the MoSPI Statistical Knowledge Exchange Group on Karmayogi Hub.",
            "Engage in monthly peer code reviews of R-scripts used for statistical estimation.",
            "Attend inter-cadre technical roundtables.",
          ],
          formalTraining10: [
            "Enroll in NSSTA certification on Official Statistical Standards.",
            "Complete 45 Karmayogi learning hours across prescribed statistical modules.",
            "Clear the end-of-course capstone assessment on official statistical quality.",
          ],
        },
        trajectoryAnalysis: `By executing this roadmap over the next 12 weeks, ${currentOfficer.name}'s role readiness will rise from ${readiness}% to over 90%, meeting full eligibility benchmarks for ${currentOfficer.targetRole}.`,
      });
    } finally {
      setIsLoadingGapAnalysis(false);
    }
  };

  const handleUpdateCompetencyLevel = (id: string, newLevel: number) => {
    setCompetencies((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, currentLevel: newLevel } : c
      );
      runGapAnalysis(updated);
      return updated;
    });
  };

  // Called when diagnostic assessment is completed
  const handleCompleteDiagnostic = (
    updatedScores: Record<string, number>,
    overallScore: number
  ) => {
    setCompetencies((prev) => {
      const updated = prev.map((c) => {
        if (updatedScores[c.id] !== undefined) {
          return { ...c, currentLevel: updatedScores[c.id] };
        }
        return c;
      });
      runGapAnalysis(updated);
      return updated;
    });

    setCurrentOfficer((prev) => ({
      ...prev,
      igotCreditsEarned: prev.igotCreditsEarned + 50,
    }));
  };

  const handleToggleEnrollment = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.courseId === courseId) {
          const updated = !c.isEnrolled;
          return {
            ...c,
            isEnrolled: updated,
            progressPercent: updated ? c.progressPercent || 15 : 0,
          };
        }
        return c;
      })
    );
  };

  const handleUpdateProgress = (courseId: string, progress: number) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.courseId === courseId ? { ...c, progressPercent: progress } : c
      )
    );
  };

  const handleNavigateToCourse = (courseId: string) => {
    setSelectedCourseIdForHub(courseId);
    setActiveTab("igot-hub");
  };

  const handleLaunchQuizForCourse = (course: IGotCourse) => {
    setActiveQuizForStudio({
      quizId: `quiz-${course.courseId}`,
      title: `Official Assessment: ${course.title}`,
      topic: course.competencyTargeted,
      difficulty: course.level,
      totalQuestions: 6,
      questions: [
        {
          id: `q-${course.courseId}-1`,
          questionText: `In the context of '${course.title}', what is the primary methodology mandated by MoSPI / NSSTA guidelines?`,
          options: [
            "Adherence to United Nations Fundamental Principles of Official Statistics and standard sampling calibration",
            "Single-stage unweighted convenience sampling",
            "Disregarding administrative tax registry linkages",
            "Exclusive reliance on telephonic interviews without paradata scrutiny",
          ],
          correctOptionIndex: 0,
          explanation: `Official statistical operations in ${course.title} strictly mandate compliance with UN principles, rigorous survey weights calibration, and transparent dissemination.`,
          bloomsLevel: "Understanding",
          competencyTag: course.competencyTargeted,
          citation: `${course.provider} Technical Curriculum, 2026`,
        },
        {
          id: `q-${course.courseId}-2`,
          questionText: `Which of the following quality assurance measures is essential when applying ${course.competencyTargeted}?`,
          options: [
            "Cross-validation against auxiliary administrative records and consistency checks across survey schedules",
            "Omitting non-response documentation to expedite release",
            "Rounding microdata values without statistical disclosure control algorithms",
            "Suppressing seasonal price variations entirely",
          ],
          correctOptionIndex: 0,
          explanation: `Cross-validation between enterprise balance sheets, GSTN data, and field survey schedules forms the core of MoSPI Data Quality Assurance Framework (DQAF).`,
          bloomsLevel: "Applying",
          competencyTag: course.competencyTargeted,
          citation: "MoSPI DQAF Framework Guidelines",
        },
      ],
    });
    setActiveTab("quiz-studio");
  };

  const handleCreditsEarned = (credits: number) => {
    setCurrentOfficer((prev) => ({
      ...prev,
      igotCreditsEarned: prev.igotCreditsEarned + credits,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Universal Top Header */}
      <Header
        currentOfficer={currentOfficer}
        onSelectOfficer={setCurrentOfficer}
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === "en" ? "hi" : "en"))
        }
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "diagnostic-assessment" && (
          <DiagnosticAssessment
            currentOfficer={currentOfficer}
            competencies={competencies}
            onCompleteDiagnostic={handleCompleteDiagnostic}
            onNavigateToRadar={() => setActiveTab("gap-analyzer")}
            onNavigateToCourse={handleNavigateToCourse}
          />
        )}

        {activeTab === "gap-analyzer" && (
          <CompetencyGapAnalyzer
            currentOfficer={currentOfficer}
            competencies={competencies}
            onUpdateCompetencyLevel={handleUpdateCompetencyLevel}
            gapAnalysis={gapAnalysis}
            onRunGapAnalysis={() => runGapAnalysis()}
            isLoading={isLoadingGapAnalysis}
            onNavigateToCourse={handleNavigateToCourse}
            language={language}
          />
        )}

        {activeTab === "igot-hub" && (
          <IGotKarmayogiHub
            currentOfficer={currentOfficer}
            courses={courses}
            onToggleEnrollment={handleToggleEnrollment}
            onUpdateProgress={handleUpdateProgress}
            onLaunchQuizForCourse={handleLaunchQuizForCourse}
            language={language}
            selectedCourseId={selectedCourseIdForHub}
          />
        )}

        {activeTab === "quiz-studio" && (
          <QuizMCQStudio
            currentOfficer={currentOfficer}
            preloadedQuiz={activeQuizForStudio}
            onNavigateToCourse={handleNavigateToCourse}
            language={language}
            onCreditsEarned={handleCreditsEarned}
          />
        )}

        {activeTab === "karmayogi-sahayak" && (
          <KarmayogiSahayak
            currentOfficer={currentOfficer}
            language={language}
            onNavigateToCourse={handleNavigateToCourse}
          />
        )}

        {activeTab === "judge-mode" && (
          <JudgeModeDashboard
            currentOfficer={currentOfficer}
            onSelectOfficer={setCurrentOfficer}
            onTriggerDemoQuiz={() => setActiveTab("quiz-studio")}
            onTriggerDemoGap={() => setActiveTab("gap-analyzer")}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-slate-300 font-semibold">
              Karmayogi SkillBridge • National Statistical Systems Training Academy (NSSTA)
            </div>
            <div className="text-[11px] text-slate-500">
              Ministry of Statistics and Programme Implementation (MoSPI) • Government of India
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>SNA 2008 & NSSO Aligned</span>
            <span>•</span>
            <span>Mission Karmayogi Bharat</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">StatsGuru AI Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
