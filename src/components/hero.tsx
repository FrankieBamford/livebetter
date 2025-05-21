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
} from "lucide-react";
import { createClient } from "../../supabase/client";

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

      searchTimeoutRef.current = setTimeout(() => {
        try {
          // Mock search suggestions based on input
          const mockSuggestions = [
            "Anxiety",
            "Depression",
            "Stress management",
            "Therapy",
            "Counseling",
            "Mental health support",
            "Wellness coaching",
            "Mindfulness",
            "Meditation",
          ].filter((item) => item.toLowerCase().includes(value.toLowerCase()));

          setSearchSuggestions(mockSuggestions);
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
      return "Specific Needs";
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

  return (
    <div className="relative bg-[#F7EFE2] py-16 border-[#004B2A]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-full mx-auto mb-8 max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-bold text-livebetter mb-4 text-[#004B2A]">
              Find Mental Health & Wellness Services
            </h1>

            <p className="text-lg mb-8 max-w-2xl mx-auto font-semibold text-[#004B2A]">
              Connect with the right support across the UK for your wellbeing
              journey
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by keywords"
                  className="w-full px-10 py-2 rounded-md bg-[#F8EFE2] border-[#004B2A] border-2"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onFocus={() =>
                    searchInput.length >= 2 && setIsSearchDropdownOpen(true)
                  }
                  ref={searchInputRef}
                />
                <svg
                  className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {isSearchDropdownOpen && (
                  <div
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    ref={searchDropdownRef}
                  >
                    {isLoadingSearchSuggestions ? (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Loading suggestions...
                      </div>
                    ) : searchSuggestions.length > 0 ? (
                      searchSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => selectSearchSuggestion(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))
                    ) : searchInput.length >= 2 ? (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No suggestions found
                      </div>
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Type at least 2 characters
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <div
                  className="w-full px-10 py-2 rounded-md flex justify-between items-center cursor-pointer bg-[#f2eade] border-[#004B2A] border-2"
                  onClick={toggleDropdown}
                  ref={categoryButtonRef}
                >
                  <span>{getSelectedCategoriesText()}</span>
                  <ChevronDown className="h-4 w-4 text-[gray-400] text-[#000000]" />
                </div>

                {isDropdownOpen && (
                  <div
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    ref={categoryDropdownRef}
                  >
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <span>{category.label}</span>
                        {selectedCategories.includes(category.id) && (
                          <Check className="h-4 w-4 text-livebetter-orange" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex bg-[ #F8EFE2] bg-[#F8EFE2] border-[#004B2A] border-2 rounded-lg text-right text-base font-normal text-black">
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full px-10 py-2 border border-gray-200 rounded-md bg-[#F8EFE2] text-[#000000] font-normal"
                  value={locationInput}
                  onChange={handleLocationInputChange}
                  onFocus={() =>
                    locationInput.length > 0 && setIsLocationDropdownOpen(true)
                  }
                  ref={locationInputRef}
                />
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                {isLocationDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {isLoadingSuggestions ? (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Loading suggestions...
                      </div>
                    ) : locationSuggestions.length > 0 ? (
                      locationSuggestions.map((suggestion) => (
                        <div
                          key={suggestion.place_id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => selectLocation(suggestion)}
                        >
                          {suggestion.display_name}
                        </div>
                      ))
                    ) : locationInput.length > 2 ? (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No locations found
                      </div>
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Type at least 3 characters
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <div
                  className="w-full px-10 py-2 rounded-md flex justify-between items-center cursor-pointer bg-[#F8EFE2] border-[#004B2A] border-2"
                  onClick={toggleServiceTypeDropdown}
                  ref={serviceTypeButtonRef}
                >
                  <span>{getSelectedServiceTypesText()}</span>
                  <ChevronDown className="h-4 w-4 text-[#000000]" />
                </div>

                {isServiceTypeDropdownOpen && (
                  <div
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    ref={serviceTypeDropdownRef}
                  >
                    {serviceTypes.map((serviceType) => (
                      <div
                        key={serviceType.id}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                        onClick={() => toggleServiceType(serviceType.id)}
                      >
                        <span>{serviceType.name}</span>
                        {selectedServiceTypes.includes(serviceType.id) && (
                          <Check className="h-4 w-4 text-livebetter-orange" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#F7EFE2] rounded-lg p-6 flex flex-col items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div
                  className={`flex items-center justify-start ${checkboxStates.online ? "bg-blue-200" : "bg-blue-100 hover:bg-blue-200"} px-3 py-2 cursor-pointer transition-colors rounded-2xl`}
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
                  className={`flex items-center justify-start ${checkboxStates.free ? "bg-green-200" : "bg-green-100 hover:bg-green-200"} px-3 py-2 cursor-pointer transition-colors rounded-2xl`}
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
                  className={`flex items-center justify-start ${checkboxStates.referral ? "bg-purple-200" : "bg-purple-100 hover:bg-purple-200"} px-3 py-2 cursor-pointer transition-colors rounded-2xl`}
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
                  className={`flex items-center justify-start ${checkboxStates.open ? "bg-yellow-200" : "bg-yellow-100 hover:bg-yellow-200"} px-3 py-2 cursor-pointer transition-colors rounded-2xl`}
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
                <button className="px-8 py-3 bg-[#FF5000] text-white font-medium rounded-md hover:bg-[#cc4001] hover:text-white transform hover:scale-105 transition-all duration-200">
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
