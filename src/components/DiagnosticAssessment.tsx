import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  TrendingUp,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import {
  CompetencyItem,
  GapAnalysisResponse,
  OfficerProfile,
} from "../types";
import {
  DIAGNOSTIC_ASSESSMENT_QUESTIONS,
  DiagnosticQuestion,
} from "../data/diagnosticQuizData";

interface DiagnosticAssessmentProps {
  currentOfficer: OfficerProfile;
  competencies: CompetencyItem[];
  onCompleteDiagnostic: (
    updatedScores: Record<string, number>,
    overallScore: number
  ) => void;
  onNavigateToRadar: () => void;
  onNavigateToCourse: (courseId: string) => void;
}

export const DiagnosticAssessment: React.FC<DiagnosticAssessmentProps> = ({
  currentOfficer,
  competencies,
  onCompleteDiagnostic,
  onNavigateToRadar,
  onNavigateToCourse,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600); // 10 minutes
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<{
    scorePercent: number;
    correctCount: number;
    domainScores: Record<string, { correct: number; total: number; percent: number; newLevel: number }>;
  } | null>(null);

  const questions: DiagnosticQuestion[] = DIAGNOSTIC_ASSESSMENT_QUESTIONS;

  // Countdown timer
  useEffect(() => {
    let interval: any = null;
    if (isTestStarted && !quizSubmitted && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestStarted, quizSubmitted, timeRemainingSeconds]);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmitTest = () => {
    let correct = 0;
    const domainBreakdown: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctOptionIndex;
      if (isCorrect) correct += 1;

      if (!domainBreakdown[q.competencyId]) {
        domainBreakdown[q.competencyId] = { correct: 0, total: 0 };
      }
      domainBreakdown[q.competencyId].total += 1;
      if (isCorrect) {
        domainBreakdown[q.competencyId].correct += 1;
      }
    });

    const scorePct = Math.round((correct / questions.length) * 100);

    const calculatedDomainScores: Record<
      string,
      { correct: number; total: number; percent: number; newLevel: number }
    > = {};
    const updatedCompetencyLevels: Record<string, number> = {};

    Object.entries(domainBreakdown).forEach(([compId, data]) => {
      const pct = Math.round((data.correct / data.total) * 100);
      // Map accuracy percent to 1-5 level
      let level = 2;
      if (pct === 100) level = 4;
      else if (pct >= 50) level = 3;
      else level = 2;

      calculatedDomainScores[compId] = {
        correct: data.correct,
        total: data.total,
        percent: pct,
        newLevel: level,
      };
      updatedCompetencyLevels[compId] = level;
    });

    setDiagnosticResult({
      scorePercent: scorePct,
      correctCount: correct,
      domainScores: calculatedDomainScores,
    });

    setQuizSubmitted(true);

    if (scorePct >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    onCompleteDiagnostic(updatedCompetencyLevels, scorePct);
  };

  const handleResetTest = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setDiagnosticResult(null);
    setTimeRemainingSeconds(600);
    setIsTestStarted(true);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  const currentQ = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  if (!isTestStarted && !quizSubmitted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Intro Hero Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Step 1 of Karmayogi Competency Engine</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Official Statistical Competency Diagnostic Assessment
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Welcome, <span className="font-semibold text-amber-300">{currentOfficer.name}</span> ({currentOfficer.designation}). This 15-minute diagnostic assessment dynamically evaluates your operational proficiency against the{" "}
              <span className="font-semibold text-white">MoSPI Functional Competency Dictionary (FRAC)</span> for target role{" "}
              <span className="font-semibold text-sky-300">{currentOfficer.targetRole}</span>.
            </p>

            {/* Test Blueprint Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
                <div className="text-xs text-slate-400 font-semibold uppercase">Questions</div>
                <div className="text-xl font-bold text-white mt-1">8 Core MCQs</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Bloom's Taxonomy Level 2–5</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
                <div className="text-xs text-slate-400 font-semibold uppercase">Time Allotted</div>
                <div className="text-xl font-bold text-amber-400 mt-1">10 Minutes</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Flexible pacing with timer</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
                <div className="text-xs text-slate-400 font-semibold uppercase">Outcome</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">Live Radar Chart</div>
                <div className="text-[11px] text-slate-400 mt-0.5">70:20:10 iGOT learning path</div>
              </div>
            </div>

            {/* Domains Tested */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2 mt-4">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Competency Domains Evaluated in this Diagnostic:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span>National Accounts & SUT Compilation (SNA 2008)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
                  <span>Survey Sampling Theory & Variance (NSSO / PLFS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>Price & Industrial Indices (CPI / IIP Formulae)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Data Quality, Admin Linkages & SDC Protocols</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                id="start-diagnostic-test-btn"
                onClick={() => {
                  setIsTestStarted(true);
                  setTimeRemainingSeconds(600);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Begin Diagnostic Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Submitted Results View
  if (quizSubmitted && diagnosticResult) {
    const isPassing = diagnosticResult.scorePercent >= 60;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Result Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center font-extrabold text-2xl border-2 shadow-inner flex-shrink-0 ${
                  isPassing
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                    : "bg-amber-500/20 border-amber-500 text-amber-300"
                }`}
              >
                {diagnosticResult.scorePercent}%
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Diagnostic Assessment Complete
                </div>
                <h2 className="text-2xl font-bold text-white mt-0.5">
                  {isPassing
                    ? "Competencies Calibrated Successfully!"
                    : "Initial Baseline Established"}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Answered {diagnosticResult.correctCount} of {totalQuestions} questions correctly. Your MoSPI Competency Radar profile and 70:20:10 capacity roadmap have been updated in real time!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                id="view-updated-radar-btn"
                onClick={onNavigateToRadar}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" />
                <span>View Competency Radar Matrix</span>
              </button>
              <button
                id="retake-diagnostic-btn"
                onClick={handleResetTest}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Diagnostic</span>
              </button>
            </div>
          </div>

          {/* Domain Breakdown Cards */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Calibrated Domain Proficiency Levels:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(diagnosticResult.domainScores).map(([compId, scoreData]) => {
                const d = scoreData as { correct: number; total: number; percent: number; newLevel: number };
                const comp = competencies.find((c) => c.id === compId);
                const isMet = d.percent >= 75;

                return (
                  <div
                    key={compId}
                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-medium text-slate-400 truncate">
                        {comp?.name || compId}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-white">
                          Level {d.newLevel} / 5
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            isMet
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {d.percent}% Score
                        </span>
                      </div>
                    </div>
                    <div className="mt-2.5 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isMet ? "bg-emerald-400" : "bg-amber-400"
                        }`}
                        style={{ width: `${d.percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              <span>Diagnostic Question Review & Official Citations</span>
            </h3>
            <span className="text-xs text-slate-500">
              Verified against MoSPI Standard Operating Procedures
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const selectedOpt = userAnswers[idx];
              const isCorrect = selectedOpt === q.correctOptionIndex;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCorrect
                      ? "bg-emerald-50/60 border-emerald-200"
                      : "bg-rose-50/60 border-rose-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                          isCorrect
                            ? "bg-emerald-600 text-white"
                            : "bg-rose-600 text-white"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {q.questionText}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            {q.domainName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Bloom's: {q.bloomsLevel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isUserPick = selectedOpt === optIdx;
                      const isRightOption = optIdx === q.correctOptionIndex;

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                            isRightOption
                              ? "bg-emerald-100/90 border-emerald-300 font-semibold text-emerald-950"
                              : isUserPick
                              ? "bg-rose-100/90 border-rose-300 font-semibold text-rose-950"
                              : "bg-white border-slate-200 text-slate-600"
                          }`}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation & Citation */}
                  <div className="mt-3 p-3 bg-white/80 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                    <div>
                      <span className="font-bold text-slate-900">Official Rationale: </span>
                      {q.explanation}
                    </div>
                    {q.citation && (
                      <div className="text-[11px] text-indigo-700 font-medium pt-1">
                        📖 Source: {q.citation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz In Progress
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Test Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl text-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">
              Diagnostic Assessment
            </div>
            <div className="text-sm sm:text-base font-bold text-white">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
          </div>
        </div>

        {/* Progress & Countdown Timer */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-mono font-bold text-amber-300">
              {formatTimer(timeRemainingSeconds)}
            </span>
          </div>

          <div className="text-xs text-slate-400">
            <span className="font-bold text-white">{answeredCount}</span> / {totalQuestions} Answered
          </div>
        </div>
      </div>

      {/* Question Navigation Bubbles */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-500 mr-2 flex-shrink-0">
          Navigator:
        </span>
        {questions.map((q, idx) => {
          const isAnswered = userAnswers[idx] !== undefined;
          const isCurrent = currentQuestionIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                isCurrent
                  ? "bg-amber-500 text-slate-950 ring-2 ring-amber-400 ring-offset-1 font-extrabold"
                  : isAnswered
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{currentQ.domainName}</span>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Cognitive Level: {currentQ.bloomsLevel}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug pt-1">
            {currentQ.questionText}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = userAnswers[currentQuestionIndex] === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? "bg-amber-50 border-amber-400 text-slate-950 shadow-sm ring-1 ring-amber-400 font-semibold"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-100 text-slate-600 border border-slate-300"
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="text-sm leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center gap-3">
            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(totalQuestions - 1, prev + 1)
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Diagnostic Test</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
