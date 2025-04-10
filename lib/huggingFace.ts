import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

async function getSummaryFromHuggingFace(pdfText: string): Promise<string> {
  const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

  const response = await fetch(HUGGINGFACE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `${SUMMARY_SYSTEM_PROMPT}\n\n${pdfText.slice(0, 4096)}`, // Limit input
    }),
  });

  const data = await response.json();

  if (!Array.isArray(data) || !data[0]?.summary_text) {
    console.error("Invalid response from HuggingFace:", data);
    throw new Error("HuggingFace summarization failed");
  }

  return data[0].summary_text;
}

async function withRetry(
  pdfText: string,
  retries = 3,
  delay = 1000
): Promise<string> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const summary = await getSummaryFromHuggingFace(pdfText);
      if (!summary) throw new Error("Received empty summary from HuggingFace");
      return summary;
    } catch (error: any) {
      if (error?.status === 429 && attempt < retries - 1) {
        console.warn(`HuggingFace rate limit hit. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
  throw new Error("HUGGINGFACE_RATE_LIMIT_EXCEEDED");
}

export async function generateSummaryFromHuggingFace(pdfText: string) {
  return await withRetry(pdfText);
}
