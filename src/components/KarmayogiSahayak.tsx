import React, { useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { OfficerProfile, TutorMessage } from "../types";

interface KarmayogiSahayakProps {
  currentOfficer: OfficerProfile;
  language: "en" | "hi";
  onNavigateToCourse: (courseId: string) => void;
}

export const KarmayogiSahayak: React.FC<KarmayogiSahayakProps> = ({
  currentOfficer,
  language,
  onNavigateToCourse,
}) => {
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: "msg-welcome",
      sender: "tutor",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: `Namaste ${currentOfficer.name}! I am your AI Statistical Mentor (Karmayogi Sahayak), trained on MoSPI manuals, National Statistical Systems Training Academy (NSSTA) compendiums, and international standards (UN SNA 2008, ILO, IMF SDDS). How can I assist with your official statistical tasks today?`,
      keyTakeaways: [
        "Authoritative guidance grounded in CSO, NSSO, and UN standards",
        "Assistance with National Accounts, Sampling Design, CPI/IIP indices, and PLFS schedules",
        "Direct linkages to iGOT Karmayogi capacity building modules",
      ],
      suggestedNextTopics: [
        "How is FISIM calculated and allocated across institutional sectors in National Accounts?",
        "What is the mathematical formulation for Hansen-Hurwitz estimator in PPS sampling?",
        "How do we distinguish Usual Principal Status from Subsidiary Status in PLFS?",
        "What are the 6 dimensions of the MoSPI Data Quality Assurance Framework (DQAF)?",
      ],
    },
  ]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: TutorMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/tutor/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          officerCadre: `${currentOfficer.cadre} - ${currentOfficer.designation}`,
          language: language === "hi" ? "Hindi" : "English",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get mentor response.");
      }

      const data = await response.json();

      const tutorMsg: TutorMessage = {
        id: `tutor-${Date.now()}`,
        sender: "tutor",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: data.answer,
        keyTakeaways: data.keyTakeaways,
        practicalApplication: data.practicalApplication,
        commonPitfalls: data.commonPitfalls,
        relatedCompetencies: data.relatedCompetencies,
        suggestedNextTopics: data.suggestedNextTopics,
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error("Tutor error:", err);
      const errorMsg: TutorMessage = {
        id: `error-${Date.now()}`,
        sender: "tutor",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: "In official statistics, precise methodology is paramount. Please verify that your query adheres to MoSPI / NSSTA documentation standards, and try again shortly.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {language === "hi"
                ? "कर्मयोगी सहायक • AI आधिकारिक सांख्यिकी मेंटर"
                : "Karmayogi Sahayak • Official Statistical AI Mentor"}
            </h2>
            <p className="text-xs text-slate-300">
              Grounded in MoSPI Sources & Methods, NSSTA training curricula, and Indian Statistical Service (ISS) technical compendiums.
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[640px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">
                    KS
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm space-y-3 leading-relaxed ${
                    isUser
                      ? "bg-indigo-600 text-white rounded-br-none shadow-sm"
                      : "bg-slate-50 border border-slate-200/80 text-slate-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] opacity-75 pb-1 border-b border-white/10">
                    <span className="font-semibold">
                      {isUser ? currentOfficer.name : "Karmayogi Sahayak (AI Mentor)"}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Key Takeaways */}
                  {msg.keyTakeaways && msg.keyTakeaways.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Core Official Statistical Takeaways:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                        {msg.keyTakeaways.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Practical Field Application */}
                  {msg.practicalApplication && (
                    <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-700 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 space-y-0.5">
                      <div className="font-bold text-amber-900 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>Practical Application in MoSPI Operations:</span>
                      </div>
                      <p>{msg.practicalApplication}</p>
                    </div>
                  )}

                  {/* Suggested Next Topics / Prompt Starters */}
                  {msg.suggestedNextTopics && msg.suggestedNextTopics.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Explore Related Topics:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedNextTopics.map((topic, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => handleSendMessage(topic)}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-indigo-700 hover:bg-indigo-50 font-medium text-[11px] transition-all cursor-pointer text-left"
                          >
                            → {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-500 text-xs italic">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 animate-spin">
                <Loader2 className="w-4 h-4" />
              </div>
              <span>Karmayogi Sahayak is consulting MoSPI manuals...</span>
            </div>
          )}
        </div>

        {/* Input Form Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask any official statistical question (e.g., 'Explain GSDP estimation methodology', 'How is Laspeyres price index compiled?')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />

          <button
            id="send-mentor-query-btn"
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputQuery.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
