"use server";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromHuggingFace } from "@/lib/huggingFace";

export async function generatePdfSummary(
  uploadResponse: [
    { serverData: { userId: string; file: { url: string; name: string } } }
  ]
) {
  if (!uploadResponse) {
    return { success: false, message: "File upload failed", data: null };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return { success: false, message: "File upload failed", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    let summary;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log({ summary });
        } catch {
          try {
            summary = await generateSummaryFromHuggingFace(pdfText);
            console.log({ summary });
          } catch {
            return {
              success: false,
              message:
                "All AI providers failed to generate the summary. Please try again later.",
              data: null,
            };
          }
        }
      } else {
        return {
          success: false,
          message: "An error occurred while generating the summary.",
          data: null,
        };
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: { summary },
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      data: null,
    };
  }
}
