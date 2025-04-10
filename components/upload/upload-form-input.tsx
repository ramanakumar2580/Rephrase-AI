"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    resetInput: () => void
  ) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    await onSubmit(e, resetInput);
    setIsUploading(false);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          ref={fileInputRef}
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
        />
        <Button
          className="bg-violet-600 text-white hover:bg-violet-700"
          disabled={isUploading}
        >
          {isUploading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              Processing...
            </span>
          ) : (
            "Upload Your PDF"
          )}
        </Button>
      </div>
    </form>
  );
}
