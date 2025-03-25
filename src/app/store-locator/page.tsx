'use client';

import { useState, useEffect, useMemo } from 'react';
import { FaMapMarkerAlt, FaPhone, FaSearch, FaStore } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

interface Store {
  region: string;
  storeId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
}

export default function StoreLocator() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stores data
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/data/stores.json');
        if (!response.ok) {
          throw new Error('Failed to fetch store data');
        }
        const data = await response.json();
        setStores(data.stores);
        setFilteredStores(data.stores);
        setLoading(false);
      } catch {
        setError('Failed to load store data. Please try again later.');
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Get unique states from stores
  const states = useMemo(() => {
    if (!stores || stores.length === 0) return [];
    const uniqueStates = [...new Set(stores.map(store => store.state))].sort();
    return uniqueStates;
  }, [stores]);

  // Get cities based on selected state
  const cities = useMemo(() => {
    if (!stores || stores.length === 0 || !selectedState) return [];
    const stateStores = stores.filter(store => store.state === selectedState);
    const uniqueCities = [...new Set(stateStores.map(store => store.city))].sort();
    return uniqueCities;
  }, [stores, selectedState]);

  // Filter stores when state, city, or search changes
  useEffect(() => {
    if (!stores || stores.length === 0) return;

    let result = [...stores];

    if (selectedState) {
      result = result.filter(store => store.state === selectedState);
    }

    if (selectedCity) {
      result = result.filter(store => store.city === selectedCity);
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        store => 
          store.name.toLowerCase().includes(searchLower) ||
          store.address.toLowerCase().includes(searchLower) ||
          store.storeId.toLowerCase().includes(searchLower)
      );
    }

    setFilteredStores(result);
  }, [stores, selectedState, selectedCity, search]);

  // Reset city when state changes
  useEffect(() => {
    setSelectedCity('');
  }, [selectedState]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const resetFilters = () => {
    setSelectedState('');
    setSelectedCity('');
    setSearch('');
    setFilteredStores(stores);
  };

  // Create a Google Maps link for a store
  const getGoogleMapsLink = (store: Store) => {
    const query = encodeURIComponent(`${store.name}, ${store.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Format phone number for tel: links
  const formatPhoneForLink = (phone: string) => {
    return phone.replace(/\s+/g, '');
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Store Locator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find an EcoLink store near you. Filter by state and city to locate your nearest store.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* State Filter */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                State
              </label>
              <select
                id="state"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                City
              </label>
              <select
                id="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedState}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Search by name or address"
                  value={search}
                  onChange={handleSearchChange}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600 dark:text-gray-300">
          {loading ? (
            <p>Loading stores...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p>
              Showing {filteredStores.length} {filteredStores.length === 1 ? 'store' : 'stores'}
              {selectedState && ` in ${selectedState}`}
              {selectedCity && `, ${selectedCity}`}
            </p>
          )}
        </div>

        {/* Store List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#582C83]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <FaStore className="text-5xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No stores found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters or search criteria to find a store.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[#582C83] text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <div key={store.storeId} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100  p-2 rounded-md mr-4">
                      <MdLocationOn className="text-2xl text-[#582C83] dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{store.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Store ID: {store.storeId}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Region:</span> {store.region}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Address:</span> {store.address}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Contact:</span> {store.contact}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <a
                      href={getGoogleMapsLink(store)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#582C83] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <FaMapMarkerAlt className="mr-2" />
                      View on Map
                    </a>
                    <a
                      href={`tel:${formatPhoneForLink(store.contact)}`}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <FaPhone className="mr-2" />
                      Call Store
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 