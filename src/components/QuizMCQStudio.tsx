import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  AlertCircle,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Flag,
  HelpCircle,
  Loader2,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Upload,
  XCircle,
} from "lucide-react";
import {
  BloomsLevel,
  IGotCourse,
  OfficerProfile,
  PreloadedMaterial,
  QuizQuestion,
  QuizSet,
} from "../types";
import { PRELOADED_LEARNING_MATERIALS } from "../data/mockData";
import { generateQuizCertificatePDF } from "../lib/pdfExport";

interface QuizMCQStudioProps {
  currentOfficer: OfficerProfile;
  preloadedQuiz?: QuizSet | null;
  onNavigateToCourse: (courseId: string) => void;
  language: "en" | "hi";
  onCreditsEarned: (credits: number) => void;
}

export const QuizMCQStudio: React.FC<QuizMCQStudioProps> = ({
  currentOfficer,
  preloadedQuiz,
  onNavigateToCourse,
  language,
  onCreditsEarned,
}) => {
  // Upload / Content state
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(
    PRELOADED_LEARNING_MATERIALS[0].id
  );
  const [customText, setCustomText] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Generation Config State
  const [difficulty, setDifficulty] = useState<
    "Foundational" | "Intermediate" | "Advanced" | "Specialist"
  >("Intermediate");
  const [numQuestions, setNumQuestions] = useState<number>(6);
  const [focusArea, setFocusArea] = useState<string>("Comprehensive");
  const [includeHindi, setIncludeHindi] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Active Quiz State
  const [activeQuiz, setActiveQuiz] = useState<QuizSet | null>(
    preloadedQuiz || null
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<
    Record<number, boolean>
  >({});
  const [isInstantFeedbackMode, setIsInstantFeedbackMode] =
    useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600); // 10 mins
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Sync if preloaded quiz passed from iGOT course
  useEffect(() => {
    if (preloadedQuiz) {
      setActiveQuiz(preloadedQuiz);
      setUserAnswers({});
      setFlaggedQuestions({});
      setQuizSubmitted(false);
      setCurrentQuestionIndex(0);
      setTimeRemainingSeconds((preloadedQuiz.totalQuestions || 6) * 90);
      setTimerActive(true);
    }
  }, [preloadedQuiz]);

  // Countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !quizSubmitted && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, quizSubmitted, timeRemainingSeconds]);

  // Handle Generate Quiz API
  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    try {
      let materialText = "";
      let materialTitle = "";

      if (isCustomMode) {
        materialText = customText;
        materialTitle = customTitle || "Custom Statistical Material";
      } else {
        const mat = PRELOADED_LEARNING_MATERIALS.find(
          (m) => m.id === selectedMaterialId
        );
        materialText = mat?.content || "";
        materialTitle = mat?.title || "MoSPI Training Material";
      }

      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialText,
          materialTitle,
          topic: materialTitle,
          difficulty,
          numQuestions,
          focusArea,
          includeHindiTerms: includeHindi,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz from server.");
      }

      const data: QuizSet = await response.json();
      setActiveQuiz(data);
      setUserAnswers({});
      setFlaggedQuestions({});
      setQuizSubmitted(false);
      setCurrentQuestionIndex(0);
      setTimeRemainingSeconds((data.totalQuestions || numQuestions) * 90);
      setTimerActive(true);
    } catch (err) {
      console.error("Error generating quiz:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Option Select
  const handleSelectOption = (optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  // Toggle Flag
  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    setTimerActive(false);

    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    setQuizScore(correctCount);
    setQuizSubmitted(true);

    const percentage = Math.round(
      (correctCount / activeQuiz.questions.length) * 100
    );
    if (percentage >= 60) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onCreditsEarned(percentage >= 80 ? 25 : 15);
    }
  };

  // Reset / Retake
  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
    if (activeQuiz) {
      setTimeRemainingSeconds(activeQuiz.questions.length * 90);
      setTimerActive(true);
    }
  };

  // Format timer
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainderSecs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQ = activeQuiz?.questions[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Gemini 3.7 Official Statistical Assessment Engine</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {language === "hi"
                ? "AI प्रश्नोत्तरी एवं बहुविकल्पीय प्रश्न (MCQ) जनरेटर"
                : "AI Quiz & MCQ Generator from Learning Materials"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Upload official circulars, manuals, or training materials to automatically generate Bloom-taxonomized MCQs with official MoSPI citations, rationale, and instant competency remediation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeQuiz && (
              <button
                onClick={() => setActiveQuiz(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Generator Session</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* View Mode 1: Generator Setup & Material Ingestion Form */}
      {!activeQuiz && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Material Ingestion Source (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Select or Upload Learning Material</span>
                </h3>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setIsCustomMode(false)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      !isCustomMode
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    MoSPI Compendiums
                  </button>
                  <button
                    onClick={() => setIsCustomMode(true)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isCustomMode
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Upload / Custom Text
                  </button>
                </div>
              </div>

              {!isCustomMode ? (
                /* Preloaded Official MoSPI Manuals */
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {PRELOADED_LEARNING_MATERIALS.map((mat) => {
                    const isSelected = selectedMaterialId === mat.id;
                    return (
                      <div
                        key={mat.id}
                        onClick={() => setSelectedMaterialId(mat.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-400/20 shadow-sm"
                            : "bg-slate-50/60 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                            {mat.category}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {mat.pages} pages • {mat.authoringDivision}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">
                          {mat.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                          {mat.summary}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Custom Text / File Paste Form */
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Document Title / Circular Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MoSPI SOP on CAPI Tabulation & Non-sampling Error Audit"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Paste Training Text / Statistical Guidelines (or Drag File)
                    </label>
                    <textarea
                      rows={10}
                      placeholder="Paste statistical document text, concepts, formulas, sampling designs, or circular contents here..."
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-slate-50 font-mono text-slate-800 leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{customText.length} characters parsed</span>
                    <label className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Load Sample File</span>
                      <input
                        type="file"
                        accept=".txt,.md,.json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setCustomText(event.target?.result as string);
                              setCustomTitle(file.name.replace(/\.[^/.]+$/, ""));
                            };
                            reader.readAsText(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Generation Parameter Controls & Launch (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Assessment Parameters</span>
              </h3>

              {/* Difficulty */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Target Proficiency Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      "Foundational",
                      "Intermediate",
                      "Advanced",
                      "Specialist",
                    ] as const
                  ).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        difficulty === diff
                          ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Number of Questions</span>
                  <span className="text-indigo-600 font-bold">
                    {numQuestions} MCQs
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={12}
                  step={2}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>4 Questions (Quick Drill)</span>
                  <span>12 Questions (Full Assessment)</span>
                </div>
              </div>

              {/* Focus Area */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Evaluation Focus
                </label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="Comprehensive">Comprehensive MoSPI Framework</option>
                  <option value="Mathematical & Formulae">
                    Mathematical Proofs, Estimation & Formulas
                  </option>
                  <option value="Field Protocols & CAPI">
                    Field Procedures, Schedules & CAPI Rules
                  </option>
                  <option value="Data Quality & SDC">
                    Data Quality, Validation & Confidentiality
                  </option>
                </select>
              </div>

              {/* Bilingual toggle */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Bilingual Hindi Terminology
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Include authentic Rajbhasha statistical translations
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeHindi}
                  onChange={(e) => setIncludeHindi(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Generate Button */}
              <button
                id="generate-quiz-btn"
                onClick={handleGenerateQuiz}
                disabled={isGenerating || (isCustomMode && customText.length < 20)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Synthesizing Bloom's MCQs via Gemini 3.7...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Generate Official Quiz & MCQs</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Mode 2: Active Timed Quiz / Assessment Engine */}
      {activeQuiz && currentQ && (
        <div className="space-y-6">
          {/* Top Test Control Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                {activeQuiz.difficulty} Assessment • {activeQuiz.topic}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {activeQuiz.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {/* Timer Pill */}
              <div
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${
                  timeRemainingSeconds < 120
                    ? "bg-rose-50 text-rose-700 border-rose-300 animate-pulse"
                    : "bg-slate-50 text-slate-800 border-slate-200"
                }`}
              >
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>
                  {quizSubmitted ? "Finished" : formatTime(timeRemainingSeconds)}
                </span>
              </div>

              {/* Mode Toggle: Instant Feedback vs Exam */}
              {!quizSubmitted && (
                <button
                  onClick={() => setIsInstantFeedbackMode(!isInstantFeedbackMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isInstantFeedbackMode
                      ? "bg-amber-50 text-amber-900 border-amber-300"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                  title="Toggle Instant Feedback Mode"
                >
                  {isInstantFeedbackMode ? "Instant Explanations (ON)" : "Exam Mode"}
                </button>
              )}
            </div>
          </div>

          {/* Main Quiz Layout: Question Card (8 cols) & Navigation Grid (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Question Area */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                {/* Question Header & Bloom's badge */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      Q{currentQuestionIndex + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      of {activeQuiz.questions.length} Questions
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                      Bloom's: {currentQ.bloomsLevel}
                    </span>
                    <button
                      onClick={handleToggleFlag}
                      className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer flex items-center gap-1 ${
                        flaggedQuestions[currentQuestionIndex]
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                      title="Flag question for review"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question Text in English & Hindi */}
                <div className="space-y-2">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {currentQ.questionText}
                  </h4>
                  {currentQ.hindiText && (
                    <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 leading-relaxed">
                      {currentQ.hindiText}
                    </p>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected =
                      userAnswers[currentQuestionIndex] === optIdx;
                    const isCorrect = optIdx === currentQ.correctOptionIndex;
                    const showResult =
                      quizSubmitted ||
                      (isInstantFeedbackMode &&
                        userAnswers[currentQuestionIndex] !== undefined);

                    let optionStyle =
                      "bg-slate-50/80 border-slate-200 hover:bg-slate-100 text-slate-800";

                    if (isSelected && !showResult) {
                      optionStyle =
                        "bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-600";
                    } else if (showResult) {
                      if (isCorrect) {
                        optionStyle =
                          "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold";
                      } else if (isSelected && !isCorrect) {
                        optionStyle =
                          "bg-rose-50 border-rose-400 text-rose-950";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 border ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-700"
                              : "bg-white text-slate-600 border-slate-300"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="text-xs sm:text-sm leading-relaxed">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box (Visible if Instant Mode or Submitted) */}
                {(quizSubmitted ||
                  (isInstantFeedbackMode &&
                    userAnswers[currentQuestionIndex] !== undefined)) && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs border border-slate-800">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <HelpCircle className="w-4 h-4" />
                      <span>Official Statistical Rationale & Citation</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                    {currentQ.citation && (
                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                        Reference: {currentQ.citation}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() =>
                      setCurrentQuestionIndex(
                        Math.max(0, currentQuestionIndex - 1)
                      )
                    }
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                    <button
                      onClick={() =>
                        setCurrentQuestionIndex(currentQuestionIndex + 1)
                      }
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Next Question
                    </button>
                  ) : !quizSubmitted ? (
                    <button
                      id="submit-quiz-btn"
                      onClick={handleSubmitQuiz}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      Submit Assessment
                    </button>
                  ) : (
                    <button
                      onClick={handleRetakeQuiz}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Retake Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Question Navigation Matrix & Score Panel (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Question Grid Matrix */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Question Navigator</span>
                  <span className="text-slate-500 font-medium">
                    {answeredCount} / {activeQuiz.questions.length} Answered
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {activeQuiz.questions.map((_, qIdx) => {
                    const isAnswered = userAnswers[qIdx] !== undefined;
                    const isCurrent = currentQuestionIndex === qIdx;
                    const isFlagged = flaggedQuestions[qIdx];

                    return (
                      <button
                        key={qIdx}
                        onClick={() => setCurrentQuestionIndex(qIdx)}
                        className={`h-9 rounded-xl font-bold text-xs transition-all border flex items-center justify-center relative cursor-pointer ${
                          isCurrent
                            ? "ring-2 ring-indigo-600 border-indigo-600 text-indigo-700 bg-indigo-50"
                            : isAnswered
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span>{qIdx + 1}</span>
                        {isFlagged && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-1"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-slate-900"></span>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-slate-100 border"></span>
                    <span>Unanswered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span>Flagged</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded border-2 border-indigo-600"></span>
                    <span>Current</span>
                  </div>
                </div>
              </div>

              {/* Quiz Submission Result & Certificate Box */}
              {quizSubmitted && (
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-lg border border-slate-800 space-y-4">
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-amber-300">
                      Assessment Completed
                    </h3>
                    <div className="text-2xl font-extrabold text-white">
                      {quizScore} / {activeQuiz.questions.length}
                    </div>
                    <div className="text-xs font-semibold text-emerald-400">
                      {Math.round(
                        (quizScore / activeQuiz.questions.length) * 100
                      )}
                      % Competency Score
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <button
                      id="download-quiz-cert-btn"
                      onClick={() =>
                        generateQuizCertificatePDF(
                          currentOfficer,
                          activeQuiz,
                          quizScore,
                          activeQuiz.questions.length,
                          Math.round(
                            (quizScore / activeQuiz.questions.length) * 100
                          )
                        )
                      }
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-slate-950" />
                      <span>Download Official Certificate (PDF)</span>
                    </button>

                    <button
                      onClick={handleRetakeQuiz}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Retake Questions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
