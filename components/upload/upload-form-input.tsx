"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef } from "react";

interface UploadFormInputProps {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    resetInput: () => void
  ) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e, resetInput);
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
        <Button className="bg-violet-600 text-white hover:bg-violet-700">
          Upload Your PDF
        </Button>
      </div>
    </form>
  );
}
