import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Flame,
  Info,
  Loader2,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  CompetencyCategory,
  CompetencyItem,
  GapAnalysisResponse,
  OfficerProfile,
} from "../types";
import { generateCompetencyPassportPDF } from "../lib/pdfExport";

interface CompetencyGapAnalyzerProps {
  currentOfficer: OfficerProfile;
  competencies: CompetencyItem[];
  onUpdateCompetencyLevel: (id: string, newLevel: number) => void;
  gapAnalysis: GapAnalysisResponse | null;
  onRunGapAnalysis: () => Promise<void>;
  isLoading: boolean;
  onNavigateToCourse: (courseId: string) => void;
  language: "en" | "hi";
}

export const CompetencyGapAnalyzer: React.FC<CompetencyGapAnalyzerProps> = ({
  currentOfficer,
  competencies,
  onUpdateCompetencyLevel,
  gapAnalysis,
  onRunGapAnalysis,
  isLoading,
  onNavigateToCourse,
  language,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    CompetencyCategory | "All"
  >("All");
  const [selectedCompetency, setSelectedCompetency] =
    useState<CompetencyItem | null>(null);

  const filteredCompetencies =
    selectedCategory === "All"
      ? competencies
      : competencies.filter((c) => c.category === selectedCategory);

  // Compute live stats
  const totalCompetencies = competencies.length;
  const metCount = competencies.filter(
    (c) => c.currentLevel >= c.requiredLevel
  ).length;
  const gapCount = totalCompetencies - metCount;
  const averageCurrent = (
    competencies.reduce((acc, c) => acc + c.currentLevel, 0) /
    totalCompetencies
  ).toFixed(1);
  const averageRequired = (
    competencies.reduce((acc, c) => acc + c.requiredLevel, 0) /
    totalCompetencies
  ).toFixed(1);

  const levelLabels: Record<number, string> = {
    1: "L1: Basic Awareness",
    2: "L2: Working Knowledge",
    3: "L3: Practitioner",
    4: "L4: Specialist / Lead",
    5: "L5: Expert / Master",
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Context Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>MoSPI FRAC Standards • Mission Karmayogi Alignment</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {language === "hi"
                ? "योग्यता अंतर एवं क्षमता निर्माण विश्लेषण"
                : "Competency Gap & Capacity Building Diagnostic"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === "hi"
                ? `अधिकारी ${currentOfficer.name} (${currentOfficer.designation}) के लिए आधिकारिक सांख्यिकी भूमिका बेंचमार्क के विरुद्ध योग्यता का मूल्यांकन करें एवं AI-निर्देशित 70:20:10 प्रशिक्षण योजना प्राप्त करें।`
                : `Diagnostic evaluation for ${currentOfficer.name} (${currentOfficer.designation}) mapped against target role standards (${currentOfficer.targetRole}). Adjust self-ratings to trigger real-time AI gap analysis and tailored iGOT Karmayogi learning paths.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="run-ai-gap-analysis-btn"
              onClick={onRunGapAnalysis}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing MoSPI FRAC Standards...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 text-slate-950" />
                  <span>Run AI Gap Analysis</span>
                </>
              )}
            </button>

            {gapAnalysis && (
              <button
                id="export-passport-pdf-btn"
                onClick={() =>
                  generateCompetencyPassportPDF(currentOfficer, gapAnalysis)
                }
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Export Passport (PDF)</span>
              </button>
            )}
          </div>
        </div>

        {/* Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">
              Total Competencies
            </div>
            <div className="text-lg font-bold text-white mt-0.5">
              {totalCompetencies} Dimensions
            </div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">
              Current Competency Avg
            </div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">
              Level {averageCurrent} / 5.0
            </div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">
              Target Role Benchmark
            </div>
            <div className="text-lg font-bold text-sky-400 mt-0.5">
              Level {averageRequired} / 5.0
            </div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">
              Identified Deficits
            </div>
            <div className="text-lg font-bold text-rose-400 mt-0.5 flex items-center gap-1.5">
              <span>{gapCount} Skills to Bridge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Grid: Assessment Table & AI Gap Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Competency Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <span>FRAC Official Competency Framework</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Select and tune proficiency ratings (1 to 5) to reflect current operational capability.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {(["All", "Domain", "Functional", "Behavioral"] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* List of Competency Cards */}
            <div className="divide-y divide-slate-100 mt-3 max-h-[640px] overflow-y-auto pr-1">
              {filteredCompetencies.map((comp) => {
                const delta = comp.requiredLevel - comp.currentLevel;
                const hasGap = delta > 0;

                return (
                  <div
                    key={comp.id}
                    className="py-4 hover:bg-slate-50/80 p-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              comp.category === "Domain"
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                : comp.category === "Functional"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                            }`}
                          >
                            {comp.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">
                            {comp.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {comp.description}
                        </p>
                      </div>

                      {/* Delta Indicator */}
                      <div className="flex-shrink-0 text-right">
                        {hasGap ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            <Flame className="w-3 h-3 text-rose-600" />
                            <span>-{delta} Gap</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Target Met</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Slider & Level Visualizer */}
                    <div className="mt-3 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-700">
                          Current Score:{" "}
                          <strong className="text-indigo-700">
                            {levelLabels[comp.currentLevel]}
                          </strong>
                        </span>
                        <span className="text-slate-500">
                          Target Benchmark:{" "}
                          <strong className="text-slate-900">
                            {levelLabels[comp.requiredLevel]}
                          </strong>
                        </span>
                      </div>

                      {/* Interactive 5-step range selector */}
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((lvl) => {
                          const isCurrent = comp.currentLevel === lvl;
                          const isRequired = comp.requiredLevel === lvl;

                          return (
                            <button
                              key={lvl}
                              onClick={() =>
                                onUpdateCompetencyLevel(comp.id, lvl)
                              }
                              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all border text-center cursor-pointer ${
                                isCurrent
                                  ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                                  : isRequired
                                  ? "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
                                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                              title={`Set Level ${lvl}`}
                            >
                              <span>L{lvl}</span>
                              {isRequired && !isCurrent && (
                                <span className="block text-[9px] font-normal text-amber-700">
                                  Req
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Subdimensions expandable snippet */}
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <button
                          onClick={() =>
                            setSelectedCompetency(
                              selectedCompetency?.id === comp.id ? null : comp
                            )
                          }
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Info className="w-3 h-3" />
                          <span>
                            {selectedCompetency?.id === comp.id
                              ? "Hide Sub-dimensions"
                              : `View ${comp.subDimensions.length} Sub-dimensions`}
                          </span>
                        </button>

                        <span className="text-[10px] text-slate-400">
                          Last evaluated: {comp.lastAssessedDate || "Recent"}
                        </span>
                      </div>

                      {selectedCompetency?.id === comp.id && (
                        <div className="mt-2.5 p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                          <div className="font-semibold text-slate-900 text-[11px]">
                            Evaluation Sub-dimensions:
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                            {comp.subDimensions.map((sub, sIdx) => (
                              <li key={sIdx}>{sub}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Personalized 70:20:10 Roadmap (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {isLoading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto animate-bounce">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Synthesizing Official Statistical Competencies...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Gemini 3.7 is cross-referencing your profile against MoSPI FRAC roles, NSSO/CSO standards, and the iGOT Karmayogi curriculum.
              </p>
            </div>
          ) : gapAnalysis ? (
            <div className="space-y-4">
              {/* Readiness Score Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Overall Role Readiness Score
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {currentOfficer.targetRole}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={
                          gapAnalysis.overallReadinessScore >= 80
                            ? "text-emerald-500"
                            : gapAnalysis.overallReadinessScore >= 60
                            ? "text-amber-500"
                            : "text-rose-500"
                        }
                        strokeDasharray={`${gapAnalysis.overallReadinessScore}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-lg font-extrabold text-slate-900 leading-none">
                        {gapAnalysis.overallReadinessScore}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-700 leading-snug">
                      {gapAnalysis.summary}
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      {gapAnalysis.trajectoryAnalysis}
                    </p>
                  </div>
                </div>
              </div>

              {/* Priority Gaps List */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Prioritized Skill Deficits ({gapAnalysis.identifiedGaps.length})</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    MoSPI Impact
                  </span>
                </div>

                <div className="space-y-2.5">
                  {gapAnalysis.identifiedGaps.map((gap, gIdx) => (
                    <div
                      key={gIdx}
                      className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-xs text-slate-900">
                          {gap.competency}
                        </div>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            gap.gapSeverity === "Critical"
                              ? "bg-rose-100 text-rose-800"
                              : gap.gapSeverity === "High"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {gap.gapSeverity} Deficit
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {gap.impactNarrative}
                      </p>

                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {gap.recommendedActions?.map((act, aIdx) => (
                          <span
                            key={aIdx}
                            className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700"
                          >
                            ✓ {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 70:20:10 Capacity Building Plan */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm space-y-4 border border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>70:20:10 Capacity Building Plan</span>
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Mission Karmayogi
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* 70% On the job */}
                  <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>70% On-the-Job Experience (OJT)</span>
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                      {gapAnalysis.capacityBuildingPlan70_20_10?.onTheJob70?.map(
                        (item, i) => (
                          <li key={i}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* 20% Peer learning */}
                  <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                      <span>20% Peer Learning & Karmayogi Hub</span>
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                      {gapAnalysis.capacityBuildingPlan70_20_10?.peerLearning20?.map(
                        (item, i) => (
                          <li key={i}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* 10% Formal training */}
                  <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>10% Structured iGOT Courses</span>
                    </div>
                    <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                      {gapAnalysis.capacityBuildingPlan70_20_10?.formalTraining10?.map(
                        (item, i) => (
                          <li key={i}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recommended iGOT Courses Hook */}
              {gapAnalysis.igotRecommendations &&
                gapAnalysis.igotRecommendations.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span>Recommended iGOT Modules</span>
                      </h3>
                      <span className="text-xs text-indigo-600 font-semibold">
                        Direct Mapping
                      </span>
                    </div>

                    <div className="space-y-2">
                      {gapAnalysis.igotRecommendations.map((course, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all bg-slate-50/50 flex items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-900 leading-tight">
                              {course.title}
                            </h4>
                            <div className="text-[11px] text-slate-500">
                              {course.provider} • {course.duration} •{" "}
                              <strong className="text-amber-600">
                                {course.credits} Credits
                              </strong>
                            </div>
                            <div className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded inline-block">
                              Target: {course.competencyTargeted}
                            </div>
                          </div>

                          <button
                            onClick={() => onNavigateToCourse(course.courseId)}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer flex-shrink-0"
                          >
                            <span>Learn</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Ready for AI Gap Analysis
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click "Run AI Gap Analysis" above to process your current competency ratings against the official MoSPI capacity framework.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
