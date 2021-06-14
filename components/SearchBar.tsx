import { getNameList, getNames } from "country-list";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useEffect, useState } from "react";

const countries = getNames();

const countryCodes = getNameList();

const SearchBar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSuggest = (country: string) => {
    setSearchValue(country);
    handleSubmit(country);
  };

  const handleSubmit = (country: string) => {
    const countryCode = countryCodes[country.toLowerCase()].toLowerCase();
    router.push(`/country/${countryCode}`);
  };

  useEffect(() => {
    if (searchValue !== "") {
      const suggestedCountries = countries.filter((country) => {
        if (searchValue.toLowerCase() === country.toLowerCase()) {
          return "";
        } else {
          return country.toLowerCase().includes(searchValue.toLowerCase());
        }
      });
      setSuggestions(suggestedCountries);
    }

    if (searchValue === "") {
      setSuggestions([]);
    }

    return () => setSuggestions([]);
  }, [searchValue]);

  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="w-full space-y-4">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Covid-19 Tracker</h1>
            <p className="text-gray-200">Start by searching country.</p>
          </div>
          <input
            className="w-full bg-gray-50 border-0 rounded-lg py-2 shadow-md text-center focus:outline-none"
            type="text"
            placeholder="Search country"
            id="search"
            onChange={(e) => handleSearch(e)}
            value={searchValue}
          />
        </div>
        {suggestions.length > 0 && (
          <div className="overflow-y-auto max-h-48 flex gap-2 flex-wrap border border-gray-200 p-2 rounded-lg">
            {suggestions.map((suggestion) => (
              <button
                onClick={() => handleSuggest(suggestion)}
                key={suggestion}
                className="bg-gray-50 border-0 rounded-lg p-2 text-center shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        {searchValue !== "" && suggestions.length <= 0 && (
          <div className="overflow-y-auto max-h-48 flex gap-2 flex-wrap border border-gray-200 p-2 rounded-lg">
            <p className="text-white">No result found...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
