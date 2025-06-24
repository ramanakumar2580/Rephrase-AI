import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getSummary(pdfText: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // ✅ free tier
    messages: [
      { role: "system", content: SUMMARY_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  return completion.choices[0].message.content;
}

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const summary = await getSummary(pdfText);
    if (!summary) throw new Error("Summary generation returned empty.");
    return summary;
  } catch (error: any) {
    if (error?.status === 429) {
      console.error("Rate limit exceeded:", {
        status: error.status,
        statusText: error.statusText || "Too Many Requests",
      });
    } else {
      console.error("OpenAI Error:", error);
    }
    throw error;
  }
}
