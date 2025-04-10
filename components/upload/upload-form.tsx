"use client";

import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a pdf"
    ),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("File uploaded successfully.", {
        action: { label: "X", onClick: () => toast.dismiss() },
      });
    },
    onUploadError: () => {
      toast.error("Upload failed. Please try again.", {
        action: { label: "X", onClick: () => toast.dismiss() },
      });
    },
    onUploadBegin: () => {
      toast("Uploading file...", {
        action: { label: "X", onClick: () => toast.dismiss() },
      });
    },
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    resetInput: () => void
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      const errorMsg =
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file";
      toast.error(errorMsg, {
        action: { label: "X", onClick: () => toast.dismiss() },
      });
      return;
    }

    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Something went wrong while uploading.", {
        action: { label: "X", onClick: () => toast.dismiss() },
      });
      return;
    }

    const formattedResp = resp.map((file) => ({
      serverData: {
        userId: file?.serverData?.userId || "anonymous",
        file: {
          url: file?.ufsUrl,
          name: file?.name || file?.ufsUrl.split("/").pop() || "unknown",
        },
      },
    }));

    const summary = await generatePdfSummary([formattedResp[0]]);
    console.log("PDF Summary:", summary);

    resetInput();
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
