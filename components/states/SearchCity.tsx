import fetcher from "@/utils/fetcher";
import { useRouter } from "next/dist/client/router";
import {
  apiUrl,
  CountryData,
  CountryDataDetail,
} from "pages/country/[countryCode]";
import { ChangeEvent, FC, useEffect, useState } from "react";
import useSWR from "swr";

interface Props {
  countryCode: string;
}

const SearchCity: FC<Props> = ({ countryCode }) => {
  const router = useRouter();
  const { data: citiesData } = useSWR<CountryData>(`${apiUrl}/cities`, fetcher);

  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<CountryDataDetail[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSuggest = (city: string) => {
    setSearchValue(city);
    handleSubmit(city);
  };

  const handleSubmit = (city: string) => {
    const encodedCity = encodeURI(city);
    router.push(`/cities/${encodedCity}`);
  };

  useEffect(() => {
    if (searchValue !== "") {
      const suggestedCities = currCityDataDetail.filter((city) => {
        const currCity = city["location"] as string;
        if (searchValue.toLowerCase() === currCity) {
          return "";
        } else {
          return currCity.toLowerCase().includes(searchValue.toLowerCase());
        }
      });
      setSuggestions(suggestedCities);
    }

    if (searchValue === "") {
      setSuggestions([]);
    }

    return () => setSuggestions([]);
  }, [searchValue]);

  if (!citiesData) {
    return (
      <div>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const cityDataDetail = citiesData.data;
  const currCityDataDetail = cityDataDetail.filter(
    (d) => d["country_code"] === countryCode
  );

  return (
    <div className="space-y-4">
      <input
        className={`w-full flex-grow bg-gray-50 border-0 rounded-lg py-2 shadow-md text-center focus:outline-none ${
          currCityDataDetail.length <= 0 ? "opacity-50" : "opacity-100"
        }`}
        type="text"
        placeholder="Search cities"
        id="search-cities"
        onChange={(e) => handleSearch(e)}
        value={searchValue}
        disabled={currCityDataDetail.length <= 0}
      />
      {suggestions.length > 0 && (
        <div className="overflow-y-auto max-h-48 flex gap-2 flex-wrap border border-gray-200 p-2 rounded-lg">
          {suggestions.map((suggestion) => (
            <button
              onClick={() => handleSuggest(suggestion["location"] as string)}
              key={suggestion["location"]}
              className="bg-gray-50 border-0 rounded-lg p-2 text-center shadow-sm"
            >
              {suggestion["location"]}
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
  );
};

export default SearchCity;
