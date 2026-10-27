import React from "react";
import {
  Activity,
  Award,
  BarChart3,
  Building2,
  CheckCircle,
  FileSpreadsheet,
  Globe2,
  Layers,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { OfficerProfile } from "../types";

interface InstitutionalDashboardProps {
  currentOfficer: OfficerProfile;
  language: "en" | "hi";
}

export const InstitutionalDashboard: React.FC<InstitutionalDashboardProps> = ({
  language,
}) => {
  const cadreStats = [
    {
      cadre: "Subordinate Statistical Service (SSS)",
      totalOfficers: "3,840 Officers",
      avgReadiness: "74%",
      activeLearners: "2,980 on iGOT",
      topSkillDeficit: "R/Python Automation & SDC Anonymization",
      statusColor: "emerald",
    },
    {
      cadre: "Indian Statistical Service (ISS)",
      totalOfficers: "812 Officers",
      avgReadiness: "86%",
      activeLearners: "745 on iGOT",
      topSkillDeficit: "Advanced High-Frequency Macro Forecasting",
      statusColor: "indigo",
    },
    {
      cadre: "State Directorate of Economics & Stats (DES)",
      totalOfficers: "6,420 Officers",
      avgReadiness: "62%",
      activeLearners: "4,120 on iGOT",
      topSkillDeficit: "GSDP & District Indicator Framework (DIF)",
      statusColor: "amber",
    },
    {
      cadre: "NSSO Field Operations Division (FOD)",
      totalOfficers: "4,150 Investigators",
      avgReadiness: "79%",
      activeLearners: "3,650 on iGOT",
      topSkillDeficit: "CAPI Telemetry Scrutiny & Paradata Audit",
      statusColor: "sky",
    },
  ];

  const stateRankings = [
    { state: "Tamil Nadu", score: 88, hours: "42 hrs/officer", status: "Leader" },
    { state: "Maharashtra", score: 85, hours: "39 hrs/officer", status: "Leader" },
    { state: "Karnataka", score: 82, hours: "36 hrs/officer", status: "Achiever" },
    { state: "Gujarat", score: 80, hours: "35 hrs/officer", status: "Achiever" },
    { state: "Odisha", score: 76, hours: "31 hrs/officer", status: "Achiever" },
    { state: "Uttar Pradesh", score: 71, hours: "28 hrs/officer", status: "Fast Mover" },
    { state: "Bihar", score: 68, hours: "25 hrs/officer", status: "Fast Mover" },
    { state: "Assam", score: 65, hours: "22 hrs/officer", status: "Fast Mover" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>National Statistical Capacity Building Dashboard • MoSPI & NSSTA</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {language === "hi"
                ? "संस्थागत आधिकारिक सांख्यिकी क्षमता मैट्रिक्स"
                : "Institutional Statistical Capacity & Cadre Analytics"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Macro-level oversight of competency readiness, learning hours, and critical statistical skill deficits across Central and State Statistical Organizations in India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center min-w-[120px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">
                Total Cadre Strength
              </div>
              <div className="text-xl font-bold text-white">15,222</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center min-w-[120px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">
                iGOT Coverage
              </div>
              <div className="text-xl font-bold text-emerald-400">76.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cadre Health Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cadreStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Cadre Division
              </span>
              <span className="text-sm font-extrabold text-indigo-600">
                {stat.avgReadiness}
              </span>
            </div>

            <h3 className="text-xs font-bold text-slate-900 leading-snug">
              {stat.cadre}
            </h3>

            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Strength:</span>
                <span className="font-semibold text-slate-700">
                  {stat.totalOfficers}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">iGOT Adoption:</span>
                <span className="font-semibold text-emerald-600">
                  {stat.activeLearners}
                </span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
              <strong className="text-slate-700 block mb-0.5">Top Deficit:</strong>
              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-block font-medium">
                {stat.topSkillDeficit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Split Grid: Priority Domain Deficits vs State Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Priority Competency Deficits in Official Statistics (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>National Statistical Deficit Heatmap (MoSPI FRAC)</span>
            </h3>
            <span className="text-xs text-slate-500">Q2 2026 Assessment</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                domain: "Statistical Computing & Microdata SDC Anonymization",
                gapLevel: 42,
                cadresAffected: "SSS (JSO/SSO), State DES",
                priority: "Critical",
              },
              {
                domain: "National Accounts SUT 140x140 Balancing (SNA 2008)",
                gapLevel: 36,
                cadresAffected: "CSO NAD, State DES",
                priority: "High",
              },
              {
                domain: "Administrative Data Linkage (GSTN, MCA21, EPFO)",
                gapLevel: 32,
                cadresAffected: "ISS Officers, Economic Statistics",
                priority: "High",
              },
              {
                domain: "Sub-Sample Variance Estimation in Complex Surveys",
                gapLevel: 28,
                cadresAffected: "NSSO SDRD, SSS Cadre",
                priority: "Medium",
              },
              {
                domain: "CAPI Telemetry Scrutiny & Paradata Anomaly Checks",
                gapLevel: 22,
                cadresAffected: "NSSO FOD Field Supervisors",
                priority: "Medium",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold text-slate-900 text-xs">
                    {item.domain}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.priority === "Critical"
                        ? "bg-rose-100 text-rose-800"
                        : item.priority === "High"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Affected: {item.cadresAffected}</span>
                  <span className="font-bold text-slate-700">
                    {item.gapLevel}% Deficit Gap
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      item.priority === "Critical"
                        ? "bg-rose-500"
                        : item.priority === "High"
                        ? "bg-amber-500"
                        : "bg-indigo-500"
                    }`}
                    style={{ width: `${item.gapLevel * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Statistical Capability Index (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>State DES Capacity Index</span>
            </h3>
            <span className="text-xs text-slate-500">iGOT Hours</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto pr-1 text-xs">
            {stateRankings.map((st, idx) => (
              <div
                key={idx}
                className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 font-bold text-slate-400 text-[11px]">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900">{st.state}</div>
                    <div className="text-[11px] text-slate-500">{st.hours}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-indigo-700 text-xs">
                    {st.score} / 100
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      st.status === "Leader"
                        ? "bg-emerald-100 text-emerald-800"
                        : st.status === "Achiever"
                        ? "bg-sky-100 text-sky-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {st.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
