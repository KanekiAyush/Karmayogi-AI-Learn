import React, { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  ExternalLink,
  Filter,
  PlayCircle,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { IGotCourse, OfficerProfile } from "../types";

interface IGotKarmayogiHubProps {
  currentOfficer: OfficerProfile;
  courses: IGotCourse[];
  onToggleEnrollment: (courseId: string) => void;
  onUpdateProgress: (courseId: string, progress: number) => void;
  onLaunchQuizForCourse: (course: IGotCourse) => void;
  language: "en" | "hi";
  selectedCourseId?: string | null;
}

export const IGotKarmayogiHub: React.FC<IGotKarmayogiHubProps> = ({
  currentOfficer,
  courses,
  onToggleEnrollment,
  onUpdateProgress,
  onLaunchQuizForCourse,
  language,
  selectedCourseId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [filterEnrolledOnly, setFilterEnrolledOnly] = useState(false);
  const [activeCourse, setActiveCourse] = useState<IGotCourse>(
    courses.find((c) => c.courseId === selectedCourseId) || courses[0]
  );
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.competencyTargeted
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel =
      selectedLevel === "All" || course.level === selectedLevel;
    const matchesEnrollment = !filterEnrolledOnly || course.isEnrolled;
    return matchesSearch && matchesLevel && matchesEnrollment;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Karmayogi Hub Header & Sync Status */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                iGOT Karmayogi Bharat Sync: Active (SSO-Validated)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                NSSTA MoSPI Academy
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {language === "hi"
                ? "iGOT कर्मयोगी सांख्यिकी प्रशिक्षण हब"
                : "iGOT Karmayogi Statistical Training Catalog"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Curated official capacity building courses mapped to Indian Statistical Service (ISS) & Subordinate Statistical Service (SSS) competencies. Complete modules to earn Karmayogi credits.
            </p>
          </div>

          {/* Sync Stats Cards */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center min-w-[110px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">
                Credits Earned
              </div>
              <div className="text-lg font-bold text-amber-400">
                {currentOfficer.igotCreditsEarned} pts
              </div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center min-w-[110px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">
                Active Enrolled
              </div>
              <div className="text-lg font-bold text-emerald-400">
                {courses.filter((c) => c.isEnrolled).length} Courses
              </div>
            </div>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses by topic (SNA 2008, PLFS, CPI, R/Python, SDGs)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {["All", "Foundational", "Intermediate", "Advanced"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? "bg-amber-500 text-slate-950 shadow-sm font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={() => setFilterEnrolledOnly(!filterEnrolledOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                filterEnrolledOnly
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Enrolled Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Catalog List (5 cols) & Active Course Syllabus Player (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Course Cards */}
        <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1">
          {filteredCourses.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
              No courses matching your criteria.
            </div>
          ) : (
            filteredCourses.map((course) => {
              const isSelected = activeCourse?.courseId === course.courseId;

              return (
                <div
                  key={course.courseId}
                  onClick={() => {
                    setActiveCourse(course);
                    setActiveModuleIndex(0);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-50/70 border-indigo-400 shadow-md ring-2 ring-indigo-400/20"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        course.level === "Advanced"
                          ? "bg-purple-100 text-purple-800"
                          : course.level === "Intermediate"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {course.level}
                    </span>
                    <span className="text-xs font-extrabold text-amber-600 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>{course.credits} Credits</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-2 leading-snug">
                    {course.title}
                  </h3>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-3">
                    <span>{course.provider}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {course.duration}
                    </span>
                  </div>

                  {/* Competency Tag */}
                  <div className="mt-2.5">
                    <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-medium">
                      Target: {course.competencyTargeted}
                    </span>
                  </div>

                  {/* Enrollment / Progress Bar */}
                  {course.isEnrolled && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span>Progress</span>
                        <span className="text-indigo-700 font-bold">
                          {course.progressPercent || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${course.progressPercent || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Active Course Player & Syllabus Details */}
        <div className="lg:col-span-7 space-y-4">
          {activeCourse ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              {/* Header Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    {activeCourse.provider}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{activeCourse.rating || 4.8}</span>
                    </div>
                    <span className="text-xs text-slate-400">•</span>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeCourse.learnersEnrolled || 1200} officers</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {activeCourse.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeCourse.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 flex-wrap">
                <button
                  id="enroll-toggle-btn"
                  onClick={() => onToggleEnrollment(activeCourse.courseId)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeCourse.isEnrolled
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {activeCourse.isEnrolled
                      ? "Enrolled in iGOT (Active)"
                      : "Enroll on iGOT Karmayogi"}
                  </span>
                </button>

                <button
                  id="launch-quiz-from-course-btn"
                  onClick={() => onLaunchQuizForCourse(activeCourse)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Generate AI Quiz for this Course</span>
                </button>

                {activeCourse.isEnrolled && (
                  <button
                    onClick={() => {
                      const newProgress = Math.min(
                        100,
                        (activeCourse.progressPercent || 0) + 25
                      );
                      onUpdateProgress(activeCourse.courseId, newProgress);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  >
                    +25% Progress
                  </button>
                )}
              </div>

              {/* Course Syllabus / Modules List */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Curriculum & Interactive Learning Modules</span>
                  </h3>
                  <span className="text-xs text-slate-500">
                    {activeCourse.modules?.length || 3} Core Modules
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeCourse.modules?.map((mod, mIdx) => {
                    const isModActive = activeModuleIndex === mIdx;

                    return (
                      <div
                        key={mod.id}
                        onClick={() => setActiveModuleIndex(mIdx)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isModActive
                            ? "bg-slate-900 text-white border-slate-800 shadow-md"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isModActive
                                  ? "bg-amber-400 text-slate-950"
                                  : "bg-indigo-100 text-indigo-800"
                              }`}
                            >
                              {mIdx + 1}
                            </span>
                            <h4 className="text-xs font-bold leading-tight">
                              {mod.title}
                            </h4>
                          </div>

                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              isModActive
                                ? "bg-slate-800 text-slate-300"
                                : "bg-white border border-slate-200 text-slate-600"
                            }`}
                          >
                            {mod.durationMinutes} mins • {mod.type}
                          </span>
                        </div>

                        {isModActive && (
                          <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                            <p>{mod.summary}</p>
                            <div className="flex items-center gap-2 text-[11px] text-amber-300 font-semibold pt-1">
                              <PlayCircle className="w-3.5 h-3.5" />
                              <span>Click to open interactive video & lab sandbox</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
              Select a course from the catalog to view syllabus details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
