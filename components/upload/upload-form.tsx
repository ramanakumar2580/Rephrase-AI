"use client";

import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("File uploaded successfully.", {
        action: { label: "Close", onClick: () => toast.dismiss() },
      });
    },
    onUploadError: () => {
      toast.error("Upload failed. Please try again.", {
        action: { label: "Close", onClick: () => toast.dismiss() },
      });
    },
    onUploadBegin: () => {
      toast("Uploading file...", {
        action: { label: "Close", onClick: () => toast.dismiss() },
      });
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    resetInput: () => void
  ) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validated = schema.safeParse({ file });
      if (!validated.success) {
        const msg =
          validated.error.flatten().fieldErrors.file?.[0] || "Invalid file.";
        toast.error(msg);
        return;
      }

      const uploadResponse = await startUpload([file]);

      if (!uploadResponse) {
        toast.error("Something went wrong during upload.");
        return;
      }

      const fileName = file?.name || "file.pdf";
      const formattedFileName = formatFileNameAsTitle(fileName);

      const formatted = uploadResponse.map((file) => ({
        serverData: {
          userId: file?.serverData?.userId || "anonymous",
          file: {
            url: file?.ufsUrl,
            name: fileName,
          },
          title: formattedFileName,
        },
      }));

      toast("Generating summary...", {
        action: { label: "Close", onClick: () => toast.dismiss() },
      });

      const summaryResult = await generatePdfSummary([formatted[0]]);
      if (!summaryResult.success || !summaryResult.data?.summary) {
        toast.error(summaryResult.message || "Failed to generate summary.");
        return;
      }

      const storeResult = await storePdfSummaryAction({
        summary: summaryResult.data.summary,
        fileUrl: formatted[0].serverData.file.url,
        title: formatted[0].serverData.title,
        fileName: formatted[0].serverData.file.name,
      });

      if (!storeResult.success || !storeResult.data?.id) {
        toast.error(storeResult.message || "Failed to save summary.");
        return;
      }

      toast.success("Your PDF has been successfully summarized and saved.");
      resetInput();
      router.push(`/summaries/${storeResult.data.id}`);
    } catch (err) {
      console.error("Summary generation error:", err);
      toast.error("Unexpected error during summary generation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
