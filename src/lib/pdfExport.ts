import jsPDF from "jspdf";
import { GapAnalysisResponse, OfficerProfile, QuizSet } from "../types";

export function generateCompetencyPassportPDF(
  officer: OfficerProfile,
  analysis: GapAnalysisResponse
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(15, 42, 74); // Deep Navy
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("GOVERNMENT OF INDIA", pageWidth / 2, 14, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Ministry of Statistics and Programme Implementation (MoSPI)",
    pageWidth / 2,
    22,
    { align: "center" }
  );
  doc.setFontSize(10);
  doc.text("Mission Karmayogi - Statistical Capacity Building Passport", pageWidth / 2, 30, {
    align: "center",
  });

  // Officer Profile Card
  doc.setFillColor(245, 248, 252);
  doc.setDrawColor(200, 215, 235);
  doc.roundedRect(14, 46, pageWidth - 28, 38, 3, 3, "FD");

  doc.setTextColor(20, 30, 50);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`Officer Name: ${officer.name}`, 20, 54);
  doc.text(`Employee ID: ${officer.employeeId}`, 120, 54);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Cadre: ${officer.cadre}`, 20, 62);
  doc.text(`Designation: ${officer.designation}`, 120, 62);
  doc.text(`Department: ${officer.department}`, 20, 70);
  doc.text(`Target Role: ${officer.targetRole}`, 120, 70);
  doc.text(`Overall Readiness: ${analysis.overallReadinessScore}%`, 20, 78);
  doc.text(`Karmayogi Credits: ${officer.igotCreditsEarned} pts`, 120, 78);

  // Executive Summary
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 42, 74);
  doc.text("1. Executive Competency Evaluation Summary", 14, 94);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  const splitSummary = doc.splitTextToSize(analysis.summary, pageWidth - 28);
  doc.text(splitSummary, 14, 100);

  let currentY = 100 + splitSummary.length * 4.5 + 4;

  // Identified Competency Gaps
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 42, 74);
  doc.text("2. Identified Competency Deficits (MoSPI FRAC Standards)", 14, currentY);
  currentY += 6;

  analysis.identifiedGaps.slice(0, 4).forEach((gap, idx) => {
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(220, 220, 220);
    doc.rect(14, currentY, pageWidth - 28, 16, "FD");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 20, 20);
    doc.text(`${idx + 1}. ${gap.competency} (${gap.category})`, 18, currentY + 5);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 40, 40);
    doc.text(
      `Current: Lvl ${gap.currentLevel}/5 | Benchmark: Lvl ${gap.requiredLevel}/5 | Severity: ${gap.gapSeverity}`,
      18,
      currentY + 10
    );

    doc.setTextColor(70, 70, 70);
    const impactSnippet = doc.splitTextToSize(gap.impactNarrative, pageWidth - 36);
    doc.text(impactSnippet[0] || "", 18, currentY + 14);

    currentY += 19;
  });

  // 70:20:10 Roadmap
  if (currentY < 230) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 42, 74);
    doc.text("3. Prescribed 70:20:10 Capacity Building Action Plan", 14, currentY);
    currentY += 6;

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 90, 40);
    doc.text("• 70% On-the-Job Experience:", 16, currentY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    analysis.capacityBuildingPlan70_20_10.onTheJob70.slice(0, 2).forEach((task) => {
      currentY += 4.5;
      const lines = doc.splitTextToSize(`  - ${task}`, pageWidth - 34);
      doc.text(lines, 18, currentY);
      currentY += (lines.length - 1) * 4;
    });

    currentY += 5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 70, 130);
    doc.text("• 20% Peer Coaching & Knowledge Hub:", 16, currentY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    analysis.capacityBuildingPlan70_20_10.peerLearning20.slice(0, 2).forEach((task) => {
      currentY += 4.5;
      const lines = doc.splitTextToSize(`  - ${task}`, pageWidth - 34);
      doc.text(lines, 18, currentY);
      currentY += (lines.length - 1) * 4;
    });

    currentY += 5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(130, 70, 30);
    doc.text("• 10% Formal iGOT Karmayogi Courses:", 16, currentY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    analysis.capacityBuildingPlan70_20_10.formalTraining10.slice(0, 2).forEach((task) => {
      currentY += 4.5;
      const lines = doc.splitTextToSize(`  - ${task}`, pageWidth - 34);
      doc.text(lines, 18, currentY);
      currentY += (lines.length - 1) * 4;
    });
  }

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(130, 130, 130);
  doc.text(
    `Official Document Generated by MoSPI Karmayogi Sankhyiki AI Engine • Date: ${new Date().toLocaleDateString(
      "en-IN"
    )} • Verification Key: KS-${officer.employeeId}-${Date.now().toString(36).toUpperCase()}`,
    14,
    288
  );

  doc.save(`MoSPI_Karmayogi_Passport_${officer.employeeId}.pdf`);
}

export function generateQuizCertificatePDF(
  officer: OfficerProfile,
  quiz: QuizSet,
  score: number,
  total: number,
  percentage: number
) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Border & Frames
  doc.setDrawColor(15, 42, 74);
  doc.setLineWidth(2);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setDrawColor(218, 165, 32); // Gold inner border
  doc.setLineWidth(0.8);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Background Watermark emblem tone
  doc.setFillColor(252, 250, 242);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26, "F");

  // Header Title
  doc.setTextColor(15, 42, 74);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("GOVERNMENT OF INDIA", pageWidth / 2, 26, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Ministry of Statistics and Programme Implementation (MoSPI)",
    pageWidth / 2,
    33,
    { align: "center" }
  );

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("National Statistical Systems Training Academy (NSSTA) & iGOT Karmayogi", pageWidth / 2, 39, {
    align: "center",
  });

  // Certificate Heading
  doc.setFontSize(22);
  doc.setFont("times", "bold");
  doc.setTextColor(180, 120, 20); // Gold tone
  doc.text("CERTIFICATE OF STATISTICAL COMPETENCY", pageWidth / 2, 54, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(70, 70, 70);
  doc.text("This is to officially certify that", pageWidth / 2, 64, { align: "center" });

  // Recipient Name
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 42, 74);
  doc.text(officer.name, pageWidth / 2, 75, { align: "center" });

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text(
    `${officer.designation} (${officer.cadre}) • ID: ${officer.employeeId}`,
    pageWidth / 2,
    83,
    { align: "center" }
  );

  doc.text(
    "has successfully demonstrated high analytical proficiency in the official assessment on",
    pageWidth / 2,
    92,
    { align: "center" }
  );

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 45, 95);
  doc.text(`"${quiz.title}"`, pageWidth / 2, 101, { align: "center" });

  // Score Badge Box
  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(180, 200, 230);
  doc.roundedRect(pageWidth / 2 - 50, 109, 100, 20, 3, 3, "FD");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 42, 74);
  doc.text(
    `Score: ${score} / ${total} (${percentage}%) • Level: ${quiz.difficulty}`,
    pageWidth / 2,
    119,
    { align: "center" }
  );

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 110, 50);
  doc.text(
    `Status: ${percentage >= 70 ? "PASSED WITH DISTINCTION" : "PASSED - COMPETENCY VERIFIED"}`,
    pageWidth / 2,
    125,
    { align: "center" }
  );

  // Signatures
  doc.setDrawColor(120, 120, 120);
  doc.line(40, 162, 95, 162);
  doc.line(pageWidth - 95, 162, pageWidth - 40, 162);

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "bold");
  doc.text("Director General (Training)", 67.5, 167, { align: "center" });
  doc.text("NSSTA, MoSPI", 67.5, 172, { align: "center" });

  doc.text("Chief Learning Officer", pageWidth - 67.5, 167, { align: "center" });
  doc.text("iGOT Karmayogi Bharat", pageWidth - 67.5, 172, { align: "center" });

  // Footer / Verification Code
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Certificate ID: MOSPI-NSSTA-${quiz.quizId}-${Date.now().toString(36).toUpperCase()} • Date of Issue: ${new Date().toLocaleDateString(
      "en-IN"
    )}`,
    pageWidth / 2,
    184,
    { align: "center" }
  );

  doc.save(`MoSPI_Certificate_${quiz.quizId}.pdf`);
}
