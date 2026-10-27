import React from "react";
import {
  Award,
  BookOpen,
  ChevronDown,
  Globe,
  GraduationCap,
  Scale,
  Sparkles,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";
import { OfficerProfile } from "../types";
import { MOCK_OFFICER_PROFILES } from "../data/mockData";

interface HeaderProps {
  currentOfficer: OfficerProfile;
  onSelectOfficer: (officer: OfficerProfile) => void;
  language: "en" | "hi";
  onToggleLanguage: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentOfficer,
  onSelectOfficer,
  language,
  onToggleLanguage,
  activeTab,
  onTabChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top micro-bar */}
      <div className="bg-slate-950 px-4 py-1 text-xs text-slate-400 flex flex-wrap justify-between items-center border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider text-amber-400">
            GOVERNMENT OF INDIA • MINISTRY OF STATISTICS & PROGRAMME IMPLEMENTATION (MoSPI)
          </span>
          <span className="hidden md:inline-block text-slate-600">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            iGOT Karmayogi Bharat Integrated
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Quick Judge Mode Badge Button */}
          <button
            id="quick-judge-mode-toggle"
            onClick={() => onTabChange("judge-mode")}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "judge-mode"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Judge Mode</span>
          </button>

          <button
            id="lang-toggle-btn"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-medium cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>{language === "hi" ? "English" : "हिंदी"}</span>
          </button>
        </div>
      </div>

      {/* Main navigation & Identity bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-indigo-700 p-0.5 shadow-lg flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Karmayogi SkillBridge</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    StatsGuru AI
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-300">
                AI-Powered Competency Discovery & Quiz Engine for India's Official Statistical System
              </p>
            </div>
          </div>

          {/* Officer Selector & Stats pill */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            {/* Karmayogi Credits badge */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-1.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  iGOT Credits
                </div>
                <div className="text-xs font-bold text-amber-300">
                  {currentOfficer.igotCreditsEarned} pts
                </div>
              </div>
            </div>

            {/* Officer Profile Switcher Dropdown */}
            <div className="relative">
              <button
                id="officer-profile-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-slate-800 hover:bg-slate-700/90 border border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-left transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-600/80 border border-indigo-400/40 flex items-center justify-center text-xs font-bold text-white">
                  {currentOfficer.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-white leading-tight">
                    {currentOfficer.name}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {currentOfficer.designation} • {currentOfficer.employeeId}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Officer Profile (Cadre Testing)
                  </div>
                  {MOCK_OFFICER_PROFILES.map((prof) => (
                    <button
                      key={prof.id}
                      onClick={() => {
                        onSelectOfficer(prof);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        prof.id === currentOfficer.id
                          ? "bg-slate-800/80 text-amber-300 font-semibold"
                          : "text-slate-200"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-white">{prof.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {prof.designation} ({prof.cadre.split(" ")[0]})
                        </div>
                      </div>
                      {prof.id === currentOfficer.id && (
                        <UserCheck className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800 overflow-x-auto no-scrollbar">
          {[
            {
              id: "diagnostic-assessment",
              label: "Diagnostic Assessment",
              icon: Target,
            },
            {
              id: "gap-analyzer",
              label: "Competency Radar & Gaps",
              icon: Sparkles,
            },
            {
              id: "quiz-studio",
              label: "AI Quiz & MCQ Studio",
              icon: Award,
            },
            {
              id: "igot-hub",
              label: "iGOT Courses & Pathways",
              icon: BookOpen,
            },
            {
              id: "karmayogi-sahayak",
              label: "StatsGuru AI Mentor",
              icon: GraduationCap,
            },
            {
              id: "judge-mode",
              label: "Judge & Admin Mode",
              icon: Scale,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
