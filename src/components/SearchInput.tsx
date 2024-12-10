import React from 'react';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

export function SearchInput({ value, onChange, error }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search players..."
        className={clsx(
          "w-full px-4 py-2 pl-10 bg-white border rounded-lg focus:outline-none focus:ring-2",
          error 
            ? "border-red-300 focus:ring-red-500" 
            : "border-gray-300 focus:ring-blue-500"
        )}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      {error && (
        <div className="mt-1 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}