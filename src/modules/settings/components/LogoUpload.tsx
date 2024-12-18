import React from 'react';
import { Upload, X } from 'lucide-react';

interface LogoUploadProps {
  currentLogo?: string;
  onLogoChange: (file: File) => void;
  onLogoRemove: () => void;
}

export function LogoUpload({ currentLogo, onLogoChange, onLogoRemove }: LogoUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onLogoChange(file);
    }
  };

  return (
    <div className="space-y-4">
      {currentLogo ? (
        <div className="relative inline-block group">
          <img
            src={currentLogo}
            alt="Platform Logo"
            className="h-16 w-auto rounded transition-transform hover:scale-105"
          />
          <button
            onClick={onLogoRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors touch-manipulation"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 transition-colors group-hover:text-gray-500" />
          <p className="mt-2 text-sm text-gray-500">Click to upload logo</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}