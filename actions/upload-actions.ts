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
      console.log("OpenAI Summary:", summary);
    } catch (error) {
      const errorMessage = (error as any)?.message || "";
      const errorCode = (error as any)?.code || "";

      const isQuotaError =
        errorMessage.includes("You exceeded your current quota") ||
        errorCode === "insufficient_quota" ||
        errorMessage.includes("insufficient_quota") ||
        errorMessage === "RATE_LIMIT_EXCEEDED";

      if (isQuotaError) {
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log("Gemini Summary:", summary);
        } catch (geminiError) {
          console.error("Gemini Failed:", geminiError);
          try {
            summary = await generateSummaryFromHuggingFace(pdfText);
            console.log("HuggingFace Summary:", summary);
          } catch (huggingFaceError) {
            console.error("Hugging Face Failed:", huggingFaceError);
            return {
              success: false,
              message:
                "All AI providers failed to generate the summary. Please try again later.",
              data: null,
            };
          }
        }
      } else {
        console.error("OpenAI Error:", error);
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
