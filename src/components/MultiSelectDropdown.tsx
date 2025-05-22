'use client';

import { useState, useEffect, useRef } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'

interface Option {
  id: number
  name: string
}

interface MultiSelectDropdownProps {
  options: Option[]
  placeholder: string
  loading: boolean
  error: Error | null
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  onRetry?: () => void
}

export default function MultiSelectDropdown({
  options,
  placeholder,
  loading,
  error,
  selectedValues,
  onSelectionChange,
  onRetry
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const toggleOption = (optionName: string) => {
    const newSelection = selectedValues.includes(optionName)
      ? selectedValues.filter(value => value !== optionName)
      : [...selectedValues, optionName]
    onSelectionChange(newSelection)
  }

  const clearAll = () => {
    onSelectionChange([])
  }

  // Get display text based on selection
  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder
    }
    if (selectedValues.length === 1) {
      return selectedValues[0]
    }
    return `${selectedValues.length} selected`
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-[#F8EFE2] border-2 border-[#004B2A] rounded-lg flex items-center justify-between relative z-10"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate text-[#004B2A]">
          {getDisplayText()}
        </span>
        <ChevronDown 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-[#004B2A]`} 
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-[#F8EFE2] border-2 border-[#004B2A] rounded-lg shadow-lg top-full left-0"
          style={{ minWidth: '200px' }}
        >
          {/* Loading State */}
          {loading && (
            <div className="p-4 text-center">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-4 text-center text-red-600">
              <p>{error.message}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="mt-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                >
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Options List */}
          {!loading && !error && (
            <ul
              className="max-h-60 overflow-auto py-2"
              role="listbox"
              aria-multiselectable="true"
            >
              {options.map((option) => (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={selectedValues.includes(option.name)}
                  className={`px-4 py-2 cursor-pointer flex items-center space-x-3 hover:bg-[rgba(0,75,42,0.1)] ${
                    selectedValues.includes(option.name) ? 'bg-[rgba(0,75,42,0.15)]' : ''
                  }`}
                  onClick={() => toggleOption(option.name)}
                >
                  <div className={`w-5 h-5 border-2 border-[#004B2A] rounded flex items-center justify-center ${
                    selectedValues.includes(option.name) ? 'bg-[#004B2A]' : 'bg-white'
                  }`}>
                    {selectedValues.includes(option.name) && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="flex-1 text-left text-[#004B2A]">{option.name}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Clear All Button */}
          {selectedValues.length > 0 && (
            <div className="p-2 border-t border-gray-200">
              <button
                onClick={clearAll}
                className="w-full px-4 py-2 text-sm text-[#004B2A] hover:bg-[rgba(0,75,42,0.1)] rounded-md flex items-center justify-center"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 