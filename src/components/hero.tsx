"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  DollarSign,
  FileText,
  Clock,
  Check,
  ChevronDown,
  MapPin,
  Search,
} from "lucide-react";
import { createClient } from "../../supabase/client";
import { useSupabaseDropdowns } from "@/hooks/useSupabaseDropdowns";
import MultiSelectDropdown from "./MultiSelectDropdown";

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
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
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

  const [selections, setSelections] = useState({
    supportNeeded: [] as string[],
    supportTypes: [] as string[],
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("label");

        if (error) {
          console.error("Error fetching categories:", error);
          return;
        }

        setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    async function fetchServiceTypes() {
      try {
        const { data, error } = await supabase
          .from("service_types")
          .select("*")
          .order("name");

        if (error) {
          console.error("Error fetching service types:", error);
          return;
        }

        setServiceTypes(data || []);
      } catch (error) {
        console.error("Failed to fetch service types:", error);
      }
    }

    fetchCategories();
    fetchServiceTypes();
  }, [supabase]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if the click was outside the search input and its dropdown
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }

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
  }, [
    isSearchDropdownOpen,
    isDropdownOpen,
    isLocationDropdownOpen,
    isServiceTypeDropdownOpen,
  ]); // Re-run effect if any dropdown state changes

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // Close other dropdowns when category dropdown is opened
    setIsSearchDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsServiceTypeDropdownOpen(false);
  };

  const toggleServiceTypeDropdown = () => {
    setIsServiceTypeDropdownOpen(!isServiceTypeDropdownOpen);
    // Close other dropdowns when service type dropdown is opened
    setIsSearchDropdownOpen(false);
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

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.length >= 2) {
      setIsLoadingSearchSuggestions(true);
      setIsSearchDropdownOpen(true);

      searchTimeoutRef.current = setTimeout(async () => {
        try {
          // Fetch search suggestions from Supabase
          const { data, error } = await supabase
            .from("services")
            .select("name")
            .ilike("name", `%${value}%`)
            .limit(10);

          if (error) {
            console.error("Error fetching search suggestions:", error);
            setSearchSuggestions([]);
            return;
          }

          // Extract names from the results
          const suggestions = data.map((item) => item.name);
          setSearchSuggestions(suggestions);
        } catch (error) {
          console.error("Error generating search suggestions:", error);
          setSearchSuggestions([]);
        } finally {
          setIsLoadingSearchSuggestions(false);
        }
      }, 300);
    } else {
      setSearchSuggestions([]);
      setIsSearchDropdownOpen(false);
    }
  };

  const selectSearchSuggestion = (suggestion: string) => {
    setSearchInput(suggestion);
    setIsSearchDropdownOpen(false);
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
    console.log("Search with:", {
      selections,
      location: locationInput,
      keyword: searchInput,
      filters: checkboxStates,
      rating: ratingValue,
    });
  };

  return (
    <div className="relative bg-[#F7EFE2] py-8 md:py-12 lg:py-16 border-[#0B6445]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mx-auto mb-8 max-w-7xl w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b6344] mb-4">
              Find Mental Health & Wellness Services
            </h1>

            <p className="text-base sm:text-lg mb-6 md:mb-8 max-w-2xl mx-auto font-semibold text-[#004B2A]">
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
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
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
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
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
                  className={`flex items-center justify-start bg-blue-200 px-3 py-2 cursor-pointer transition-colors rounded-2xl`}
                  onClick={() => {
                    setCheckboxStates((prev) => ({
                      ...prev,
                      online: !prev.online,
                    }));
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
                  className={`flex items-center justify-start bg-green-200 px-3 py-2 cursor-pointer transition-colors rounded-2xl`}
                  onClick={() => {
                    setCheckboxStates((prev) => ({
                      ...prev,
                      free: !prev.free,
                    }));
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
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    Free Services
                  </div>
                </div>

                <div
                  className={`flex items-center justify-start bg-purple-200 px-3 py-2 cursor-pointer transition-colors rounded-2xl`}
                  onClick={() => {
                    setCheckboxStates((prev) => ({
                      ...prev,
                      referral: !prev.referral,
                    }));
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
                  className={`flex items-center justify-start bg-yellow-200 px-3 py-2 cursor-pointer transition-colors rounded-2xl`}
                  onClick={() => {
                    setCheckboxStates((prev) => ({
                      ...prev,
                      open: !prev.open,
                    }));
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

              <div className="mt-6">
                <div className="flex items-end flex-row gap-x-10">
                  <label className="text-sm mb-1 grow min-w-[120px]">
                    Minimum Rating
                  </label>
                  <div className="w-full flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={ratingValue}
                      onChange={handleRatingChange}
                      className="w-full max-w-3xl flex flex-row justify-center items-center"
                    />
                    <span className="ml-2 text-sm w-10">{ratingValue} / 5</span>
                  </div>
                </div>
              </div>

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
