"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ServiceCard from "@/components/service-card";
import { Search, MapPin, Filter, Check } from "lucide-react";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { useSupabaseDropdowns } from "@/hooks/useSupabaseDropdowns";

interface Service {
  id: number;
  name: string;
  description: string;
  categories: string[];
  location: string;
  rating: number;
  distance?: number; // in kilometers
  image: string;
  is_online?: boolean;
  is_free?: boolean;
  requires_referral?: boolean;
  is_open_now?: boolean;
}

export default function DirectoryPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState({
    online: false,
    free: false,
    referral: false,
    open: false,
  });

  const supabase = createClient();
  const { supportNeeded, supportTypes, retryFetch } = useSupabaseDropdowns();

  const [selections, setSelections] = useState({
    supportNeeded: [] as string[],
    supportTypes: [] as string[],
  });

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase.from("providers").select("*");

        if (error) {
          console.error("Error fetching services:", error);
          return;
        }

        // Transform the data to match the expected format if needed
        const transformedData =
          data?.map((provider) => ({
            id: provider.id,
            name: provider.name,
            description: provider.description || "",
            categories: provider.categories || [],
            location: provider.location || "",
            rating: provider.rating || 0,
            image:
              provider.image ||
              "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
            is_online: provider.is_online || false,
            is_free: provider.is_free || false,
            requires_referral: provider.requires_referral || false,
            is_open_now: provider.is_open_now || false,
          })) || [];

        setServices(transformedData);
        setFilteredServices(transformedData);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchInput, locationInput, ratingValue, checkboxStates, selections]);

  const applyFilters = () => {
    let filtered = [...services];

    // Filter by search input
    if (searchInput) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          service.description.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    // Filter by location
    if (locationInput) {
      filtered = filtered.filter((service) =>
        service.location.toLowerCase().includes(locationInput.toLowerCase()),
      );
    }

    // Filter by rating
    if (ratingValue > 0) {
      filtered = filtered.filter((service) => service.rating >= ratingValue);
    }

    // Filter by checkboxes
    if (checkboxStates.online) {
      filtered = filtered.filter((service) => service.is_online);
    }
    if (checkboxStates.free) {
      filtered = filtered.filter((service) => service.is_free);
    }
    if (checkboxStates.referral) {
      filtered = filtered.filter((service) => service.requires_referral);
    }
    if (checkboxStates.open) {
      filtered = filtered.filter((service) => service.is_open_now);
    }

    // Filter by support needed
    if (selections.supportNeeded.length > 0) {
      filtered = filtered.filter((service) =>
        service.categories.some((category) =>
          selections.supportNeeded.includes(category),
        ),
      );
    }

    // Filter by support types
    if (selections.supportTypes.length > 0) {
      filtered = filtered.filter((service) =>
        service.categories.some((category) =>
          selections.supportTypes.includes(category),
        ),
      );
    }

    setFilteredServices(filtered);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatingValue(parseInt(e.target.value));
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#045741] py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-[#F6EDE1] tracking-tight drop-shadow-lg">
          Services Directory
        </h1>
        <p className="text-lg text-[#F6EDE1] max-w-2xl mx-auto font-medium">
          Find mental health & wellness services across the UK with our
          comprehensive directory.
        </p>
      </div>

      <div className="bg-[#F6EDE1] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div
              className={`md:w-1/4 bg-[#F6EDE1] p-6 rounded-lg shadow-md border-2 border-[#045842] ${isFilterOpen ? "block" : "hidden md:block"}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#0b6344]">
                  Filters
                </h2>
                <button
                  onClick={toggleFilter}
                  className="md:hidden p-2 bg-[#F6EDE1] rounded-md border border-[#045842]"
                >
                  <Filter size={18} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Search Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Search
                  </label>
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

                {/* Location Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full px-10 py-2 text-left bg-[#F8EFE2] border-2 border-[#004B2A] rounded-lg"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                    />
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Support Needed Dropdown */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What are you struggling with?
                  </label>
                  <MultiSelectDropdown
                    options={supportNeeded.options}
                    placeholder="What are you struggling with?"
                    loading={supportNeeded.loading}
                    error={supportNeeded.error}
                    selectedValues={selections.supportNeeded}
                    onSelectionChange={(values) => {
                      setSelections((prev) => ({
                        ...prev,
                        supportNeeded: values,
                      }));
                    }}
                    onRetry={retryFetch}
                  />
                </div>

                {/* Support Types Dropdown */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What type of support?
                  </label>
                  <MultiSelectDropdown
                    options={supportTypes.options}
                    placeholder="What type of support?"
                    loading={supportTypes.loading}
                    error={supportTypes.error}
                    selectedValues={selections.supportTypes}
                    onSelectionChange={(values) => {
                      setSelections((prev) => ({
                        ...prev,
                        supportTypes: values,
                      }));
                    }}
                    onRetry={retryFetch}
                  />
                </div>

                {/* Checkboxes */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Service Options
                  </label>
                  <div className="space-y-2">
                    <div
                      className={`flex items-center justify-start px-3 py-2 cursor-pointer transition-colors rounded-md ${checkboxStates.online ? "bg-blue-100" : "bg-gray-100"}`}
                      onClick={() => {
                        setCheckboxStates((prev) => ({
                          ...prev,
                          online: !prev.online,
                        }));
                      }}
                    >
                      <div
                        className={`w-5 h-5 border rounded flex items-center justify-center ${checkboxStates.online ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}
                      >
                        {checkboxStates.online && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="ml-2 text-sm">Online Services</span>
                    </div>

                    <div
                      className={`flex items-center justify-start px-3 py-2 cursor-pointer transition-colors rounded-md ${checkboxStates.free ? "bg-green-100" : "bg-gray-100"}`}
                      onClick={() => {
                        setCheckboxStates((prev) => ({
                          ...prev,
                          free: !prev.free,
                        }));
                      }}
                    >
                      <div
                        className={`w-5 h-5 border rounded flex items-center justify-center ${checkboxStates.free ? "bg-green-500 border-green-500" : "border-gray-400"}`}
                      >
                        {checkboxStates.free && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="ml-2 text-sm">Free Services</span>
                    </div>

                    <div
                      className={`flex items-center justify-start px-3 py-2 cursor-pointer transition-colors rounded-md ${checkboxStates.referral ? "bg-purple-100" : "bg-gray-100"}`}
                      onClick={() => {
                        setCheckboxStates((prev) => ({
                          ...prev,
                          referral: !prev.referral,
                        }));
                      }}
                    >
                      <div
                        className={`w-5 h-5 border rounded flex items-center justify-center ${checkboxStates.referral ? "bg-purple-500 border-purple-500" : "border-gray-400"}`}
                      >
                        {checkboxStates.referral && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="ml-2 text-sm">Requires Referral</span>
                    </div>

                    <div
                      className={`flex items-center justify-start px-3 py-2 cursor-pointer transition-colors rounded-md ${checkboxStates.open ? "bg-yellow-100" : "bg-gray-100"}`}
                      onClick={() => {
                        setCheckboxStates((prev) => ({
                          ...prev,
                          open: !prev.open,
                        }));
                      }}
                    >
                      <div
                        className={`w-5 h-5 border rounded flex items-center justify-center ${checkboxStates.open ? "bg-yellow-500 border-yellow-500" : "border-gray-400"}`}
                      >
                        {checkboxStates.open && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="ml-2 text-sm">Open Now</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={ratingValue}
                      onChange={handleRatingChange}
                      className="w-full"
                    />
                    <span className="ml-2 text-sm w-10">{ratingValue} / 5</span>
                  </div>
                </div>

                {/* Reset Filters Button */}
                <button
                  onClick={() => {
                    setSearchInput("");
                    setLocationInput("");
                    setRatingValue(0);
                    setCheckboxStates({
                      online: false,
                      free: false,
                      referral: false,
                      open: false,
                    });
                    setSelections({
                      supportNeeded: [],
                      supportTypes: [],
                    });
                  }}
                  className="w-full py-2 bg-[#3A3FC1] text-white rounded-md hover:bg-[#2e32a6] transition-colors transform hover:scale-105 transition-all duration-200"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Services Grid */}
            <div className="md:w-3/4">
              {/* Mobile Filter Toggle */}
              <div className="md:hidden mb-4">
                <button
                  onClick={toggleFilter}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F6EDE1] rounded-md shadow-sm border-2 border-[#045842]"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                </button>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredServices.length} of {services.length}{" "}
                  services
                </p>
              </div>

              {/* Services Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-4 h-80 animate-pulse"
                    >
                      <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#F6EDE1] rounded-lg shadow-md border-2 border-[#045842]">
                  <p className="text-xl text-[#0b6344]">
                    No services match your filters
                  </p>
                  <p className="text-gray-700 mt-2">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
