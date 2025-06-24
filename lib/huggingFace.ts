const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN || "";

const SUMMARY_MODEL_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

function splitTextIntoChunks(text: string, chunkSize = 2800): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

function generateTitleFromFilename(fileName: string): string {
  const name = fileName
    .replace(/\.pdf$/i, "")
    .replace(/[_\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const titleCase = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCase ? ` ${titleCase} Summary` : "Summary";
}

async function summarizeChunk(chunk: string): Promise<string> {
  const response = await fetch(SUMMARY_MODEL_URL, {
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

  if (!response.ok || data.error) {
    console.error("Summary model error:", data);
    throw new Error("Summary generation failed from Hugging Face");
  }

  const summary = Array.isArray(data)
    ? data[0]?.summary_text
    : data?.summary_text;

  if (!summary) throw new Error("Empty summary returned");

  return summary.trim();
}

export const generateSummaryFromHuggingFace = async (
  pdfText: string,
  fileName: string
) => {
  try {
    const chunks = splitTextIntoChunks(pdfText, 2800);
    const allSummaries: string[] = [];

    console.log("Hugging Face model : ");

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Summarizing chunk ${i + 1}/${chunks.length}`);
      const summary = await summarizeChunk(chunks[i]);
      allSummaries.push(summary);
    }

    const finalSummary = allSummaries.join("\n\n");

    const smartTitle = generateTitleFromFilename(fileName);
    console.log("Generated Title:", smartTitle);

    const structuredSummary = JSON.stringify([
      {
        title: smartTitle,
        content: finalSummary,
      },
    ]);

    return structuredSummary;
  } catch (error: any) {
    console.error("HuggingFace Final Error:", error);
    throw error;
  }
};
