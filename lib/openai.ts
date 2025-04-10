import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getSummary(pdfText: string, model: string) {
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SUMMARY_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Transform this document into an engaging, easy-to-read summary 
        with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  return completion.choices[0].message.content;
}

async function withRetry(
  pdfText: string,
  model: string,
  retries = 3,
  delay = 1000
): Promise<string> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const summary = await getSummary(pdfText, model);
      if (summary === null) {
        throw new Error("Summary generation failed: received null.");
      }
      return summary;
    } catch (error: any) {
      if (error?.status === 429 && attempt < retries - 1) {
        console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
      } else {
        throw error;
      }
    }
  }
  throw new Error("RATE_LIMIT_EXCEEDED");
}

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    return await withRetry(pdfText, "gpt-4o");
  } catch (error: any) {
    if (error?.status === 404 && error?.code === "model_not_found") {
      console.warn("GPT-4 not available. Falling back to GPT-3.5-Turbo.");
      return await withRetry(pdfText, "gpt-3.5-turbo");
    }
    throw error;
  }
}
