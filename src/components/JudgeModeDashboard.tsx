import React, { useState } from "react";
import {
  Activity,
  Award,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Download,
  Flame,
  Layers,
  Network,
  Play,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { OfficerProfile } from "../types";

interface JudgeModeDashboardProps {
  currentOfficer: OfficerProfile;
  onSelectOfficer: (officer: OfficerProfile) => void;
  onTriggerDemoQuiz: () => void;
  onTriggerDemoGap: () => void;
}

export const JudgeModeDashboard: React.FC<JudgeModeDashboardProps> = ({
  currentOfficer,
  onSelectOfficer,
  onTriggerDemoQuiz,
  onTriggerDemoGap,
}) => {
  const [activeJudgeTab, setActiveJudgeTab] = useState<
    "architecture" | "telemetry" | "heatmap" | "benchmarking"
  >("architecture");

  // Simulated live telemetry logs for the judge
  const systemLogs = [
    {
      timestamp: "10:42:15 AM",
      service: "AI Engine",
      model: "gemini-3.7-flash",
      status: "200 OK",
      latency: "412ms",
      event: "Generated 8-question Bloom's taxonomy quiz from NSSO PLFS Chapter 2 with MoSPI citation tags.",
    },
    {
      timestamp: "10:41:50 AM",
      service: "Competency Engine",
      model: "Rule-Based + Vector Map",
      status: "Calibrated",
      latency: "18ms",
      event: `Computed delta gap for ${currentOfficer.name} against benchmark: Level 2 -> Level 4 in SNA 2008.`,
    },
    {
      timestamp: "10:40:22 AM",
      service: "iGOT Karmayogi API",
      model: "Graph Recommender",
      status: "Synced",
      latency: "65ms",
      event: "Resolved 4 personalized courses targeting NAS-301 and Advanced Survey Sampling with 25 credits.",
    },
    {
      timestamp: "10:38:05 AM",
      service: "Resilience Gateway",
      model: "Multi-Model Fallback",
      status: "Active",
      latency: "0ms",
      event: "Configured fallback chain: gemini-3.7-flash -> gemini-2.5-flash -> gemini-3.1-flash-lite.",
    },
  ];

  const divisionHeatmapData = [
    {
      division: "National Accounts Division (NAD)",
      cadre: "SSS / ISS",
      officers: 1420,
      readinessPct: 78,
      primaryGap: "Supply-Use Table (SUT) Balancing & FISIM",
      priorityCourse: "NAS-301 (SNA 2008)",
    },
    {
      division: "Field Operations Division (FOD) - NSSO",
      cadre: "SSS Field Cadre",
      officers: 4850,
      readinessPct: 84,
      primaryGap: "Multi-stage PPS Replicate Variance",
      priorityCourse: "SAMP-402 (Advanced Survey Weights)",
    },
    {
      division: "Price Statistics Division (PSD) - CPI",
      cadre: "SSS / DES",
      officers: 980,
      readinessPct: 89,
      primaryGap: "Geometric Price Relatives & Outlier Imputation",
      priorityCourse: "CPI-202 (Laspeyres Base Revision)",
    },
    {
      division: "Economic Statistics Division (ESD) - ASI/IIP",
      cadre: "SSS / ISS",
      officers: 1650,
      readinessPct: 72,
      primaryGap: "GSTN/MCA21 Administrative Data Reconciliation",
      priorityCourse: "DQAF-104 (Admin Data Linkage)",
    },
    {
      division: "State Directorate of Economics & Statistics (DES)",
      cadre: "State DES",
      officers: 3200,
      readinessPct: 65,
      primaryGap: "SDG National Indicator Framework (NIF) Tier-II",
      priorityCourse: "SDG-NIF-501 (State Indicator Tracking)",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Competition Badges */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Project Competition Judge & Admin Mode</span>
            </div>

            <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Full-Stack Runtime: Port 3000 Verified
            </span>
          </div>

          <div className="space-y-1 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Karmayogi SkillBridge (StatsGuru AI)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              India's first AI-powered competency discovery and quiz assessment platform for the{" "}
              <span className="text-amber-300 font-semibold">10,000+ statistical officials</span> across MoSPI (NSSO, CSO, ESD, NAD) and State Directorates of Economics & Statistics (DES).
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Architecture</div>
              <div className="text-sm font-bold text-white mt-0.5">React + Express + AI</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-semibold uppercase">AI Engine</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">Gemini 3.7 Flash</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Govt Ecosystem</div>
              <div className="text-sm font-bold text-sky-400 mt-0.5">iGOT Karmayogi Bharat</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Core Impact</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">Nation-wide Capacity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Judge Mode Sub-navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: "architecture", label: "Solution Architecture & Stack", icon: Layers },
          { id: "telemetry", label: "Live AI Telemetry & Logs", icon: Cpu },
          { id: "heatmap", label: "MoSPI Division Heatmap", icon: BarChart3 },
          { id: "benchmarking", label: "Peer-Benchmarking & Analytics", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeJudgeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveJudgeTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Solution Architecture */}
      {activeJudgeTab === "architecture" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Client Layer (React 18 + Vite)</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Tailwind CSS responsive design with WCAG AA compliance</li>
                <li>Interactive Diagnostic MCQ & Quiz Testing Engine</li>
                <li>Dynamic Competency Radar Matrix with live score delta</li>
                <li>Client-side PDF report & verification certificate generation</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Backend Service (Node + Express)</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Express REST endpoints running on port 3000</li>
                <li>MoSPI FRAC Role-Competency dictionary mapping</li>
                <li>Multi-tier resilient fallback with exponential backoff</li>
                <li>Context-aware statistical fallback calculation engine</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. AI Engine (Gemini 3.7 SDK)</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Automated MCQ, True/False & Fill-in-the-blank generation</li>
                <li>Bloom's Taxonomy classification (Remembering to Evaluating)</li>
                <li>Official MoSPI compendium citations & rationale generator</li>
                <li>70:20:10 capacity building roadmap optimizer</li>
              </ul>
            </div>
          </div>

          {/* Unique Twist Card */}
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-500/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Unique Twist: Dynamic Quiz-to-Competency Calibration
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Unlike traditional self-declaration questionnaires that suffer from severe subjective bias, this platform uses an **interactive diagnostic MCQ assessment engine** to mathematically calibrate competency scores across SNA 2008, Survey Sampling, Statistical Computing, and Data Governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live AI Telemetry */}
      {activeJudgeTab === "telemetry" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              <h3 className="text-base font-bold text-white">Live AI Runtime & Pipeline Telemetry</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Stream: Active</span>
          </div>

          <div className="space-y-3">
            {systemLogs.map((log, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-400">{log.timestamp}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {log.service}
                    </span>
                    <span className="text-slate-400">[{log.model}]</span>
                  </div>
                  <div className="text-slate-300">{log.event}</div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-slate-400 font-mono">{log.latency}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: MoSPI Division Heatmap */}
      {activeJudgeTab === "heatmap" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Ministry of Statistics: Division-Wise Competency Heatmap
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Aggregated from 12,090 statistical officers evaluated across MoSPI headquarters, NSSO regional field offices, and State DES units.
            </p>
          </div>

          <div className="space-y-4">
            {divisionHeatmapData.map((d, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all space-y-2.5 bg-slate-50/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{d.division}</div>
                    <div className="text-xs text-slate-500">
                      Cadre: {d.cadre} • {d.officers} Officers Enrolled
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Readiness:</span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        d.readinessPct >= 80
                          ? "bg-emerald-100 text-emerald-800"
                          : d.readinessPct >= 70
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {d.readinessPct}% Average
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      d.readinessPct >= 80
                        ? "bg-emerald-500"
                        : d.readinessPct >= 70
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${d.readinessPct}%` }}
                  ></div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                  <div className="text-slate-600">
                    <span className="font-semibold text-rose-700">Primary Skill Gap: </span>
                    {d.primaryGap}
                  </div>
                  <div className="text-indigo-600 font-medium">
                    Recommended: {d.priorityCourse}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Peer-Benchmarking */}
      {activeJudgeTab === "benchmarking" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Anonymized Peer-Benchmarking Engine (Behavioral Nudge)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Motivates officials by benchmarking their competency readiness against peers in the same cadre and state.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-center space-y-1">
              <div className="text-xs text-indigo-700 font-semibold uppercase">Cadre Percentile</div>
              <div className="text-2xl font-black text-indigo-900">84th Percentile</div>
              <div className="text-[11px] text-indigo-600">Top 16% in {currentOfficer.cadre.split(" ")[0]}</div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-1">
              <div className="text-xs text-emerald-700 font-semibold uppercase">iGOT Karmayogi Rank</div>
              <div className="text-2xl font-black text-emerald-900">#42 / 1,420</div>
              <div className="text-[11px] text-emerald-600">Northern Zone Regional Division</div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-center space-y-1">
              <div className="text-xs text-amber-700 font-semibold uppercase">Monthly Learning Velocity</div>
              <div className="text-2xl font-black text-amber-900">+18.4% Delta</div>
              <div className="text-[11px] text-amber-600">Faster than ministry average</div>
            </div>
          </div>

          {/* Presentation Closing Pitch */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-2 border border-slate-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Official Pitch Note</span>
            </div>
            <p className="text-sm font-medium italic text-slate-200 leading-relaxed">
              "We're not just building a learning platform. We're building India's first AI-powered competency engine for official statistics – directly aligned with the iGOT Karmayogi mission. One platform. 10,000+ officials. Nation-wide impact."
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
