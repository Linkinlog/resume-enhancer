import React, { useState, useCallback, useRef } from 'react';
import { ArrowUpDown, Upload, File as FileIcon, X } from 'lucide-react';
import { FormData } from '@/components/types/types';

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  name: string;
  type: "file" | "text";
}

export default function TextInput({ formData, setFormData, name, type }: Props) {
  const [showFileInput, setShowFileInput] = useState<boolean>(type === "file");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((file: File | null) => {
    setFormData(prev => ({ ...prev, file }));
    if (!file && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setFormData]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      text: e.target.value
    }));
  }, [setFormData]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'text/plain')) {
      handleFileChange(file);
    }
  }, [handleFileChange]);

  return (
    <div className="mb-8">
      <div className={`
        relative overflow-hidden
        bg-background backdrop-blur-sm
        rounded-xl p-6
        border border-primary
        transition-all duration-300
        hover:shadow-[0_0_20px_rgba(155,139,244,0.1)]
      `}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-foreground">{name}</h2>
          <button
            type="button"
            onClick={() => setShowFileInput(!showFileInput)}
            className="
              flex items-center gap-2 px-4 py-2
              text-sm text-foreground
              bg-background
              border border-primary
              rounded-full
              transition-all duration-300
              hover:bg-primary
              hover:text-background
              group
            "
          >
            <ArrowUpDown className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Switch to {showFileInput ? 'Text' : 'File'}</span>
          </button>
        </div>

        {showFileInput ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className="relative"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.txt"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
              id={`file-input-${name}`}
            />
            <label
              htmlFor={`file-input-${name}`}
              className={`
                flex flex-col items-center justify-center
                w-full h-40
                border-2 border-dashed
                rounded-lg cursor-pointer
                transition-all duration-300
                border-primary
                hover:bg-secondary
                ${isDragging && 'border-primary bg-primary'}
              `}
            >
              {formData.file ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <FileIcon className="w-8 h-8 text-primary" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleFileChange(null);
                      }}
                      className="text-red-500 p-1 rounded-full hover:opacity-90 transition-opacity"
                    >
                      <X className="w-8 h-8" />
                    </button>
                  </div>
                  <span className="text-sm text-foreground">{formData.file.name}</span>
                </div>
              ) : (
                <>
                  <Upload className={`
                    w-8 h-8 mb-2
                    transition-transform duration-300
                    ${isDragging ? 'scale-110 text-primary' : 'text-primary'}
                  `} />
                  <span className="text-foreground">
                    {isDragging ? 'Drop to upload' : 'Drop PDF/TXT or click to upload'}
                  </span>
                </>
              )}
            </label>
          </div>
        ) : (
          <textarea
            value={formData.text}
            onChange={handleTextChange}
            placeholder="Paste your text here..."
            className="
              w-full h-40
              p-4 rounded-lg
              bg-background
              border border-primary
              text-white
              resize-none
              transition-all duration-300
              focus:outline-none focus:border-primary
              focus:shadow-[0_0_20px_rgba(155,139,244,0.1)]
            "
          />
        )}
      </div>
    </div>
  );
}
