import { convertPdfToWord } from "../../services/api";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  UploadCloud,
  FileText,
  FileCheck2,
  Loader2,
  CheckCircle2,
  Download,
  X,
  RotateCcw,
  FileWarning,
} from "lucide-react";

import Button from "../ui/Button";

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const PROCESSING_STEPS = [
  "Uploading document",
  "Running OCR",
  "Rebuilding layout",
  "Finalizing .docx",
];

function formatSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ConvertCard() {
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef(null);

  // Only cycles the processing text while the real backend request is running.
  useEffect(() => {
    if (status !== "processing") return;

    const interval = setInterval(() => {
      setStepIndex((i) =>
        Math.min(i + 1, PROCESSING_STEPS.length - 1)
      );
    }, 900);

    return () => clearInterval(interval);
  }, [status]);

  const validateAndSetFile = useCallback((candidate) => {
    if (!candidate) return;

    if (candidate.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      setStatus("error");
      return;
    }

    if (candidate.size > MAX_SIZE_BYTES) {
      setError(`File is larger than ${MAX_SIZE_MB} MB.`);
      setStatus("error");
      return;
    }

    setError("");
    setResult(null);
    setFile(candidate);
    setStatus("ready");
  }, []);

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e) => {
    validateAndSetFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleConvert = async () => {
    if (!file) return;

    setStepIndex(0);
    setError("");
    setStatus("processing");

    try {
      const data = await convertPdfToWord(file);

      if (!data?.success) {
        throw new Error(
          data?.message || "Conversion failed."
        );
      }

      setResult(data);
      setStatus("done");
    } catch (err) {
      console.error("Conversion error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while converting your PDF."
      );

      setStatus("error");
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError("");
    setStepIndex(0);
    setStatus("idle");
  };

  const handleDownload = () => {
    if (!result?.downloadUrl) return;

    window.location.href = `http://localhost:5000${result.downloadUrl}`;
  };

  const isDropzoneState =
    status === "idle" ||
    status === "ready" ||
    status === "error";

  const resultName =
    result?.fileName ||
    (file
      ? file.name.replace(/\.pdf$/i, ".docx")
      : "document.docx");

  return (
    <div className="mx-auto mt-14 max-w-2xl animate-fade-up">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(39,52,105,0.04),0_12px_32px_-16px_rgba(39,52,105,0.12)] sm:p-8">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={handleInputChange}
          aria-label="Choose a PDF file"
        />

        {isDropzoneState && (
          <div
            role="button"
            tabIndex={0}
            onClick={handleBrowseClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleBrowseClick();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors duration-200 ${
              isDragging
                ? "border-primary bg-accent-soft"
                : "border-border hover:border-primary/50 hover:bg-accent-soft/40"
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
              <UploadCloud
                size={22}
                className="text-primary"
                strokeWidth={2}
              />
            </span>

            <h2 className="mt-5 text-[17px] font-bold text-text">
              Drop your PDF here
            </h2>

            <p className="mt-1.5 text-[13.5px] text-muted">
              or click to browse — up to {MAX_SIZE_MB} MB
            </p>

            {status === "error" && (
              <div
                className="mt-4 flex items-center gap-1.5 text-[13px] font-medium text-[#B3261E]"
                role="alert"
              >
                <FileWarning size={14} />
                {error}
              </div>
            )}

            {status === "ready" && file && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-6 flex w-full max-w-sm items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left"
              >
                <FileText
                  size={18}
                  className="shrink-0 text-primary"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-text">
                    {file.name}
                  </p>

                  <p className="text-[12px] text-muted">
                    {formatSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Remove file"
                  className="shrink-0 rounded-md p-1.5 text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-text"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {status === "ready" && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleConvert}
              size="lg"
              className="w-full sm:w-auto"
            >
              Convert to Word
            </Button>
          </div>
        )}

        {status === "processing" && (
          <div
            className="flex flex-col items-center px-6 py-10 text-center"
            aria-live="polite"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
              <Loader2
                size={22}
                className="animate-spin text-primary"
                strokeWidth={2}
              />
            </span>

            <h2 className="mt-5 text-[17px] font-bold text-text">
              Converting your document
            </h2>

            <p className="mt-1.5 text-[13.5px] text-muted">
              {PROCESSING_STEPS[stepIndex]}…
            </p>

            <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-border">
              <div className="h-full w-1/3 rounded-full bg-primary animate-progress" />
            </div>
          </div>
        )}

        {status === "done" && (
          <div
            className="flex flex-col items-center px-6 py-8 text-center"
            aria-live="polite"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-soft">
              <CheckCircle2
                size={22}
                className="text-success"
                strokeWidth={2}
              />
            </span>

            <h2 className="mt-5 text-[17px] font-bold text-text">
              Conversion complete
            </h2>

            <p className="mt-1.5 text-[13.5px] text-muted">
              Your Word document is ready to download.
            </p>

            <div className="mt-6 flex w-full max-w-sm items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left">
              <FileCheck2
                size={18}
                className="shrink-0 text-success"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-text">
                  {resultName}
                </p>

                <p className="text-[12px] text-muted">
                  Ready
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleReset}
              >
                <RotateCcw size={15} className="mr-2" />
                Convert another
              </Button>

              <Button
                size="lg"
                onClick={handleDownload}
              >
                <Download size={15} className="mr-2" />
                Download Word document
              </Button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-[12px] text-muted">
        Files are processed securely and removed automatically after
        conversion.
      </p>
    </div>
  );
}