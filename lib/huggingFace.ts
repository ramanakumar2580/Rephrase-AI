const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN || "";

function splitTextIntoChunks(text: string, chunkSize = 2800): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

async function summarizeChunk(chunk: string): Promise<string> {
  const response = await fetch(HUGGINGFACE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: chunk,
      parameters: {
        max_length: 200,
        min_length: 60,
        do_sample: false,
      },
    }),
  });

  const data = await response.json();
  console.log("Hugging Face status:", response.status);
  console.log("Hugging Face response:", data);

  if (!response.ok || data.error) {
    throw new Error("Summary generation failed from Hugging Face");
  }

  const summary = Array.isArray(data)
    ? data[0]?.summary_text
    : data?.summary_text;

  if (!summary) {
    throw new Error("Summary generation failed from Hugging Face");
  }

  return summary;
}

export const generateSummaryFromHuggingFace = async (pdfText: string) => {
  try {
    const chunks = splitTextIntoChunks(pdfText, 2800);
    const allSummaries: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Summarizing chunk ${i + 1}/${chunks.length}`);
      const summary = await summarizeChunk(chunks[i]);
      allSummaries.push(summary);
    }

    const finalSummary = allSummaries.join("\n\n");
    console.log("Final HuggingFace Summary:", finalSummary);
    return finalSummary;
  } catch (error: any) {
    console.error("HuggingFace Error:", error);
    throw error;
  }
};
