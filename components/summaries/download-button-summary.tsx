"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DownloadSummaryButton({
  title,
  summaryText,
  fileName,
  createdAt,
}: {
  title: string;
  summaryText: string;
  fileName: string;
  createdAt: string;
}) {
  const handleDownload = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const formattedDate = new Date(createdAt).toLocaleDateString();

    let cleanTitle = title;
    let cleanContent = summaryText;

    try {
      const parsed = JSON.parse(summaryText);
      cleanTitle = parsed?.[0]?.title || title;
      cleanContent = parsed?.[0]?.content || summaryText;
    } catch {
      // fallback: use summaryText as-is
    }

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; font-size: 14px;">
        <h2>${cleanTitle}</h2>
        <p><strong>🗓️ Generated on:</strong> ${formattedDate}</p>
        <p><strong>📁 Original File:</strong> ${fileName}</p>
        <hr/>
        <h3>📝 Summary:</h3>
        <p style="white-space: pre-line;">${cleanContent}</p>
        <br/>
        <p>🔁 Generated by <strong>RephraseAI</strong></p>
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `summary-${cleanTitle.replace(/[^a-z0-9]/gi, "_")}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(html).save();
  };

  return (
    <Button
      size="sm"
      className="h-8 px-3 bg-violet-100 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4 mr-1" />
      Download Summary
    </Button>
  );
}
