"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  FileText,
  Clock,
  Check,
  ChevronDown,
  MapPin,
  Search,
  Filter,
} from "lucide-react";
import Sterling from "./ui/sterling-icon";
import { createClient } from "../../supabase/client";
import { useSupabaseDropdowns } from "@/hooks/useSupabaseDropdowns";
import MultiSelectDropdown from "./MultiSelectDropdown";
import AdvancedFiltersDropdown, {
  AdvancedFilters,
} from "./AdvancedFiltersDropdown";

interface Category {
  id: number;
  label: string;
}

interface ServiceType {
  id: number;
  name: string;
}

interface LocationSuggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

export default function Hero() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<number[]>(
    [],
  );
  const [isServiceTypeDropdownOpen, setIsServiceTypeDropdownOpen] =
    useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    online: false,
    free: false,
    referral: false,
    open: false,
  });

  // Search state
  const [searchInput, setSearchInput] = useState("");
  const [predictiveText, setPredictiveText] = useState("");
  const [isLoadingSearchSuggestions, setIsLoadingSearchSuggestions] =
    useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Location search state
  const [locationInput, setLocationInput] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const locationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Refs for click outside functionality
  const categoryButtonRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const serviceTypeButtonRef = useRef<HTMLDivElement>(null);
  const serviceTypeDropdownRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  const { supportNeeded, supportTypes, retryFetch } = useSupabaseDropdowns();

  useEffect(() => {
    console.log("Dropdown Data:", {
      supportNeeded: supportNeeded.options,
      supportTypes: supportTypes.options,
    });
  }, [supportNeeded, supportTypes]);

  // Debug checkboxStates changes
  useEffect(() => {
    console.log("checkboxStates changed:", checkboxStates);
  }, [checkboxStates]);

  const [selections, setSelections] = useState({
    supportNeeded: [] as string[],
    supportTypes: [] as string[],
  });

  useEffect(() => {
    // Temporarily disabled due to table access issues
    // async function fetchCategories() {
    //   try {
    //     const { data, error } = await supabase
    //       .from("provider_categories")
    //       .select("*")
    //       .order("label");

    //     if (error) {
    //       console.error("Error fetching categories:", error);
    //       return;
    //     }

    //     setCategories(data || []);
    //   } catch (error) {
    //     console.error("Failed to fetch categories:", error);
    //   }
    // }

    // async function fetchServiceTypes() {
    //   try {
    //     const { data, error } = await supabase
    //       .from("service_type")
    //       .select("*")
    //       .order("name");

    //     if (error) {
    //       console.error("Error fetching service types:", error);
    //       return;
    //     }

    //     setServiceTypes(data || []);
    //   } catch (error) {
    //     console.error("Failed to fetch service types:", error);
    //   }
    // }

    // fetchCategories();
    // fetchServiceTypes();

    console.log("Database fetches temporarily disabled for testing");
  }, [supabase]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if the click was outside the category button and its dropdown
      if (
        categoryButtonRef.current &&
        !categoryButtonRef.current.contains(event.target as Node) &&
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }

      // Check if the click was outside the location input and its dropdown
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node) &&
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLocationDropdownOpen(false);
      }

      // Check if the click was outside the service type button and its dropdown
      if (
        serviceTypeButtonRef.current &&
        !serviceTypeButtonRef.current.contains(event.target as Node) &&
        serviceTypeDropdownRef.current &&
        !serviceTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceTypeDropdownOpen(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isLocationDropdownOpen, isServiceTypeDropdownOpen]); // Re-run effect if any dropdown state changes

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // Close other dropdowns when category dropdown is opened
    setIsLocationDropdownOpen(false);
    setIsServiceTypeDropdownOpen(false);
  };

  const toggleServiceTypeDropdown = () => {
    setIsServiceTypeDropdownOpen(!isServiceTypeDropdownOpen);
    // Close other dropdowns when service type dropdown is opened
    setIsDropdownOpen(false);
    setIsLocationDropdownOpen(false);
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const toggleServiceType = (serviceTypeId: number) => {
    setSelectedServiceTypes((prev) => {
      if (prev.includes(serviceTypeId)) {
        return prev.filter((id) => id !== serviceTypeId);
      } else {
        return [...prev, serviceTypeId];
      }
    });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatingValue(parseInt(e.target.value));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setPredictiveText("");

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.length >= 2) {
      setIsLoadingSearchSuggestions(true);

      searchTimeoutRef.current = setTimeout(async () => {
        try {
          // Fetch providers to build keyword dictionary
          const { data, error } = await supabase
            .from("providers")
            .select("name, description")
            .limit(100); // Get more providers to build better keyword dictionary

          if (error) {
            console.error("Error fetching providers for keywords:", error);
            setPredictiveText("");
            return;
          }

          // Build word dictionary from all provider names and descriptions
          const allWords = new Set<string>();

          data?.forEach((provider) => {
            // Add words from provider name
            const nameWords = provider.name
              .toLowerCase()
              .replace(/[^\w\s]/g, " ") // Replace punctuation with spaces
              .split(/\s+/)
              .filter((word: string) => word.length >= 3); // Only words 3+ characters

            nameWords.forEach((word: string) => allWords.add(word));

            // Add words from provider description
            if (provider.description) {
              const descWords = provider.description
                .toLowerCase()
                .replace(/[^\w\s]/g, " ")
                .split(/\s+/)
                .filter((word: string) => word.length >= 3);

              descWords.forEach((word: string) => allWords.add(word));
            }
          });

          // Find the best word completion for the current input
          const currentWord = value.toLowerCase().trim();
          const matchingWords = Array.from(allWords)
            .filter(
              (word) => word.startsWith(currentWord) && word !== currentWord,
            )
            .sort((a, b) => a.length - b.length); // Prefer shorter completions

          if (matchingWords.length > 0) {
            setPredictiveText(matchingWords[0]);
          }
        } catch (error) {
          console.error("Error generating keyword suggestions:", error);
          setPredictiveText("");
        } finally {
          setIsLoadingSearchSuggestions(false);
        }
      }, 300);
    } else {
      setPredictiveText("");
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && predictiveText && predictiveText !== searchInput) {
      e.preventDefault();
      setSearchInput(predictiveText);
      setPredictiveText("");
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (predictiveText && predictiveText !== searchInput) {
        // If there's a prediction, use it first then search
        setSearchInput(predictiveText);
        setPredictiveText("");
        // Delay search slightly to allow state to update
        setTimeout(() => handleSearch(), 100);
      } else {
        // Otherwise, perform the search immediately
        handleSearch();
      }
    }
  };

  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setLocationInput(value);

    if (locationTimeoutRef.current) {
      clearTimeout(locationTimeoutRef.current);
    }

    if (value.length >= 3) {
      setIsLoadingSuggestions(true);
      setIsLocationDropdownOpen(true);

      locationTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              value,
            )}&countrycodes=gb&limit=5`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch location suggestions");
          }

          const data = await response.json();
          setLocationSuggestions(data);
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
          setLocationSuggestions([]);
        } finally {
          setIsLoadingSuggestions(false);
        }
      }, 500);
    } else {
      setLocationSuggestions([]);
    }
  };

  const selectLocation = (suggestion: LocationSuggestion) => {
    setLocationInput(suggestion.display_name);
    setIsLocationDropdownOpen(false);
  };

  const getSelectedCategoriesText = () => {
    if (selectedCategories.length === 0) {
      return "What do you need help with?";
    } else if (selectedCategories.length === 1) {
      const category = categories.find((c) => c.id === selectedCategories[0]);
      return category ? category.label : "1 Category";
    } else {
      return `${selectedCategories.length} Categories`;
    }
  };

  const getSelectedServiceTypesText = () => {
    if (selectedServiceTypes.length === 0) {
      return "Service Type";
    } else if (selectedServiceTypes.length === 1) {
      const serviceType = serviceTypes.find(
        (st) => st.id === selectedServiceTypes[0],
      );
      return serviceType ? serviceType.name : "1 Service Type";
    } else {
      return `${selectedServiceTypes.length} Service Types`;
    }
  };

  const handleSearch = () => {
    // Build query parameters for the directory page
    const params = new URLSearchParams();

    // Add search keyword if present
    if (searchInput) {
      params.append("keyword", searchInput);
    }

    // Add location if present
    if (locationInput) {
      params.append("location", locationInput);
    }

    // Add rating if set
    if (ratingValue > 0) {
      params.append("rating", ratingValue.toString());
    }

    // Add filter options
    if (checkboxStates.online) params.append("online", "true");
    if (checkboxStates.free) params.append("free", "true");
    if (checkboxStates.referral) params.append("referral", "true");
    if (checkboxStates.open) params.append("open", "true");

    // Add support needed selections
    if (selections.supportNeeded.length > 0) {
      params.append("supportNeeded", selections.supportNeeded.join(","));
    }

    // Add support types selections
    if (selections.supportTypes.length > 0) {
      params.append("supportTypes", selections.supportTypes.join(","));
    }

    // Navigate to directory page with query parameters
    window.location.href = `/directory?${params.toString()}`;
  };

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    inPerson: false,
    ageGroups: [],
    languages: [],
    providerTypes: [],
    accessibility: [],
    distance: 0,
  });

  const handleApplyAdvanced = () => {
    setIsAdvancedOpen(false);
    // Optionally trigger search here or just let user click Search
  };
  const handleResetAdvanced = () => {
    setAdvancedFilters({
      inPerson: false,
      ageGroups: [],
      languages: [],
      providerTypes: [],
      accessibility: [],
      distance: 0,
    });
  };

  return (
    <div className="relative bg-[#F7EFE2] py-8 md:py-12 lg:py-16 border-[#0B6445]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mx-auto mb-8 max-w-7xl w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#00573F]">
              Find Mental Health & Wellness Services
            </h1>

            <p className="sm:text-lg mb-6 md:mb-8 max-w-2xl mx-auto font-semibold text-[#00573F]">
              Connect with the right support across the UK for your wellbeing
              journey
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 w-full max-w-6xl mx-auto px-0">
              <div className="relative z-30">
                <MultiSelectDropdown
                  options={supportNeeded.options}
                  placeholder="What are you struggling with?"
                  loading={supportNeeded.loading}
                  error={supportNeeded.error}
                  selectedValues={selections.supportNeeded}
                  onSelectionChange={(values) => {
                    console.log("Selected support needs:", values);
                    setSelections((prev) => ({
                      ...prev,
                      supportNeeded: values,
                    }));
                  }}
                  onRetry={retryFetch}
                />
              </div>

              <div className="relative z-20">
                <MultiSelectDropdown
                  options={supportTypes.options}
                  placeholder="What type of support?"
                  loading={supportTypes.loading}
                  error={supportTypes.error}
                  selectedValues={selections.supportTypes}
                  onSelectionChange={(values) => {
                    console.log("Support Types Selection:", values);
                    setSelections((prev) => ({
                      ...prev,
                      supportTypes: values,
                    }));
                  }}
                  onRetry={retryFetch}
                />
              </div>

              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by keywords"
                    className="w-full px-10 py-2 text-left bg-[#F8EFE2] border-2 border-[#004B2A] rounded-lg"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleSearchKeyDown}
                  />
                  {/* Predictive text overlay */}
                  {predictiveText &&
                    predictiveText !== searchInput &&
                    searchInput.length > 0 && (
                      <div
                        className="absolute pointer-events-none flex items-center"
                        style={{
                          left: "42px", // Adjust this to move the text left/right
                          top: "2px", // Adjust this to move the text up/down
                          paddingTop: "8px",
                          paddingBottom: "8px",
                        }}
                      >
                        <span className="text-transparent select-none">
                          {searchInput}
                        </span>
                        <span className="text-gray-400">
                          {predictiveText.substring(searchInput.length)}
                        </span>
                      </div>
                    )}
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  {predictiveText &&
                    predictiveText !== searchInput &&
                    searchInput.length > 0 && (
                      <div
                        className="absolute pointer-events-none text-xs text-gray-400"
                        style={{
                          right: "10px", // Adjust this value to move left/right
                          top: "14px", // Adjust this value to move up/down
                        }}
                      >
                        Tab to complete
                      </div>
                    )}
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-10 py-2 text-left bg-[#F8EFE2] border-2 border-[#004B2A] rounded-lg"
                    value={locationInput}
                    onChange={handleLocationInputChange}
                    onFocus={() =>
                      locationInput.length >= 3 &&
                      setIsLocationDropdownOpen(true)
                    }
                  />
                  <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>

                {isLocationDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#004B2A] rounded-lg shadow-lg">
                    {isLoadingSuggestions ? (
                      <div className="p-4 text-center">
                        <div className="animate-pulse space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ) : locationSuggestions.length > 0 ? (
                      <ul className="max-h-60 overflow-auto">
                        {locationSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.place_id}
                            className="px-4 py-2 cursor-pointer hover:bg-[rgba(0,75,42,0.1)]"
                            onClick={() => selectLocation(suggestion)}
                          >
                            {suggestion.display_name}
                          </li>
                        ))}
                      </ul>
                    ) : locationInput.length >= 3 ? (
                      <div className="p-4 text-center text-gray-500">
                        No locations found
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#F7EFE2] rounded-lg p-4 md:p-6 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 w-full px-0">
                <div
                  className={`flex items-center justify-start px-3 py-2 cursor-pointer transition-all duration-200 rounded-2xl ${
                    checkboxStates.online
                      ? "bg-blue-300 hover:bg-blue-300"
                      : "bg-blue-200 hover:bg-blue-300"
                  }`}
                  onClick={() => {
                    console.log(
                      "Online Services clicked, current state:",
                      checkboxStates.online,
                    );
                    setCheckboxStates((prev) => {
                      const newState = {
                        ...prev,
                        online: !prev.online,
                      };
                      console.log("New state will be:", newState);
                      return newState;
                    });
                  }}
                >
                  <input
                    type="checkbox"
                    id="online"
                    className="hidden"
                    checked={checkboxStates.online}
                    onChange={() => {}}
                  />
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-2 text-blue-500" />
                    Online Services
                  </div>
                </div>

                <div
                  className={`flex items-center justify-start px-3 py-2 cursor-pointer transition-all duration-200 rounded-2xl ${
                    checkboxStates.free
                      ? "bg-green-300 hover:bg-green-300"
                      : "bg-green-200 hover:bg-green-300"
                  }`}
                  onClick={() => {
                    console.log(
                      "Free Services clicked, current state:",
                      checkboxStates.free,
                    );
                    setCheckboxStates((prev) => {
                      const newState = {
                        ...prev,
                        free: !prev.free,
                      };
                      console.log("New state will be:", newState);
                      return newState;
                    });
                  }}
                >
                  <input
                    type="checkbox"
                    id="free"
                    className="hidden"
                    checked={checkboxStates.free}
                    onChange={() => {}}
                  />
                  <div className="flex items-center text-sm">
                    <Sterling className="w-4 h-4 mr-2 text-green-500" />
                    Free Services
                  </div>
                </div>

                <div
                  className={`flex items-center justify-start px-3 py-2 cursor-pointer transition-all duration-200 rounded-2xl ${
                    checkboxStates.referral
                      ? "bg-purple-300 hover:bg-purple-300"
                      : "bg-purple-200 hover:bg-purple-300"
                  }`}
                  onClick={() => {
                    console.log(
                      "Requires Referral clicked, current state:",
                      checkboxStates.referral,
                    );
                    setCheckboxStates((prev) => {
                      const newState = {
                        ...prev,
                        referral: !prev.referral,
                      };
                      console.log("New state will be:", newState);
                      return newState;
                    });
                  }}
                >
                  <input
                    type="checkbox"
                    id="referral"
                    className="hidden"
                    checked={checkboxStates.referral}
                    onChange={() => {}}
                  />
                  <div className="flex items-center text-sm">
                    <FileText className="w-4 h-4 mr-2 text-purple-500" />
                    Requires Referral
                  </div>
                </div>

                <div
                  className={`flex items-center justify-start px-3 py-2 cursor-pointer transition-all duration-200 rounded-2xl ${
                    checkboxStates.open
                      ? "bg-yellow-300 hover:bg-yellow-300"
                      : "bg-yellow-200 hover:bg-yellow-300"
                  }`}
                  onClick={() => {
                    console.log(
                      "Open Now clicked, current state:",
                      checkboxStates.open,
                    );
                    setCheckboxStates((prev) => {
                      const newState = {
                        ...prev,
                        open: !prev.open,
                      };
                      console.log("New state will be:", newState);
                      return newState;
                    });
                  }}
                >
                  <input
                    type="checkbox"
                    id="open"
                    className="hidden"
                    checked={checkboxStates.open}
                    onChange={() => {}}
                  />
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                    Open Now
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center w-full">
                <button
                  className="flex items-center gap-2 px-4 py-2 border border-[#3A3FC1] text-[#3A3FC1] rounded-lg shadow-sm hover:bg-[#f0f3ff] transition-all duration-150 bg-[#F6EFE1] border-solid border-4 border-2"
                  onClick={() => setIsAdvancedOpen(true)}
                  type="button"
                >
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </button>
              </div>

              <AdvancedFiltersDropdown
                open={isAdvancedOpen}
                onClose={() => setIsAdvancedOpen(false)}
                filters={advancedFilters}
                setFilters={setAdvancedFilters}
                onApply={handleApplyAdvanced}
                onReset={handleResetAdvanced}
              />

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSearch}
                  className="px-8 py-3 bg-[#FF5000] text-white font-medium rounded-md hover:bg-[#cc4001] hover:text-white transform hover:scale-105 transition-all duration-200"
                >
                  Search Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
