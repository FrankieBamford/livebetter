import React, { useState } from "react";
import { Filter, X } from "lucide-react";

const AGE_OPTIONS = ["Young People", "Adults", "Over 60s"];
const LANGUAGE_OPTIONS = ["Multilingual Available", "Culturally Sensitive"];
const PROVIDER_TYPES = ["NHS", "Private", "Charity"];
const ACCESSIBILITY_OPTIONS = [
  "Wheelchair Accessible",
  "Neurodivergent-friendly",
  "Interpreters available",
];

export interface AdvancedFilters {
  inPerson: boolean;
  ageGroups: string[];
  languages: string[];
  providerTypes: string[];
  accessibility: string[];
  distance: number; // in miles or km
}

interface Props {
  open: boolean;
  onClose: () => void;
  filters: AdvancedFilters;
  setFilters: (filters: AdvancedFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

const AdvancedFiltersDropdown: React.FC<Props> = ({
  open,
  onClose,
  filters,
  setFilters,
  onApply,
  onReset,
}) => {
  if (!open) return null;

  const toggleMulti = (key: keyof AdvancedFilters, value: string) => {
    if (Array.isArray(filters[key])) {
      setFilters({
        ...filters,
        [key]: (filters[key] as string[]).includes(value)
          ? (filters[key] as string[]).filter((v: string) => v !== value)
          : [...(filters[key] as string[]), value],
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close advanced filters"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-[#3A3FC1] w-5 h-5" />
          <h3 className="font-bold text-lg text-[#0b6344]">Advanced Filters</h3>
        </div>
        <div className="space-y-4">
          {/* In-Person Services */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inPerson}
                onChange={() =>
                  setFilters({ ...filters, inPerson: !filters.inPerson })
                }
                className="accent-[#3A3FC1]"
              />
              <span>In-Person Services</span>
            </label>
          </div>

          {/* Age Group */}
          <div>
            <div className="font-medium mb-1">Age Group</div>
            <div className="flex flex-wrap gap-2">
              {AGE_OPTIONS.map((age) => (
                <button
                  key={age}
                  type="button"
                  className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                    filters.ageGroups.includes(age)
                      ? "bg-[#3A3FC1] text-white border-[#3A3FC1]"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-[#e6e8fa]"
                  }`}
                  onClick={() => toggleMulti("ageGroups", age)}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Language / Cultural Support */}
          <div>
            <div className="font-medium mb-1">Language / Cultural Support</div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                    filters.languages.includes(lang)
                      ? "bg-[#3A3FC1] text-white border-[#3A3FC1]"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-[#e6e8fa]"
                  }`}
                  onClick={() => toggleMulti("languages", lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Type of Provider */}
          <div>
            <div className="font-medium mb-1">Type of Provider</div>
            <div className="flex flex-wrap gap-2">
              {PROVIDER_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                    filters.providerTypes.includes(type)
                      ? "bg-[#045741] text-white border-[#045741]"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-[#e6e8fa]"
                  }`}
                  onClick={() => toggleMulti("providerTypes", type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Features */}
          <div>
            <div className="font-medium mb-1">Accessibility Features</div>
            <div className="flex flex-wrap gap-2">
              {ACCESSIBILITY_OPTIONS.map((acc) => (
                <button
                  key={acc}
                  type="button"
                  className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                    filters.accessibility.includes(acc)
                      ? "bg-[#FF5000] text-white border-[#FF5000]"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-[#ffe6d9]"
                  }`}
                  onClick={() => toggleMulti("accessibility", acc)}
                >
                  {acc}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Slider */}
          <div>
            <div className="font-medium mb-1 flex justify-between items-center">
              <span>Distance</span>
              <span className="text-xs text-gray-500">
                {filters.distance} miles
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={filters.distance}
              onChange={(e) =>
                setFilters({ ...filters, distance: Number(e.target.value) })
              }
              className="w-full accent-[#3A3FC1]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>100+</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6 gap-2">
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              onClick={onReset}
              type="button"
            >
              Reset
            </button>
            <button
              className="px-4 py-2 rounded-md bg-[#3A3FC1] text-white hover:bg-[#2e32a6] transition-colors"
              onClick={() => {
                onApply();
                onClose();
              }}
              type="button"
            >
              Done
            </button>
          </div>
          <button
            className="px-4 py-2 rounded-md bg-[#3A3FC1] text-white hover:bg-[#2e32a6] transition-colors"
            onClick={onApply}
            type="button"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFiltersDropdown;
