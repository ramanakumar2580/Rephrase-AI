"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromHuggingFace } from "@/lib/huggingFace";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface pdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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
            summary = await generateSummaryFromHuggingFace(pdfText, fileName);
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

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummaryType) {
  try {
    const sql = await getDbConnection();
    return await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        status,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        'completed',
        ${title},
        ${fileName}
      )
      RETURNING id
    `;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummaryType) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const inserted = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!inserted || !inserted[0]?.id) {
      return {
        success: false,
        message: "Failed to save PDF Summary, please try again...",
      };
    }

    revalidatePath(`/summaries/${inserted[0].id}`);
    return {
      success: true,
      message: "PDF Summary saved successfully",
      data: {
        id: inserted[0].id,
      },
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving pdf summary",
    };
  }
}
