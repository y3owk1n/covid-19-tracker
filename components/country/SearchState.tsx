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

const SearchState: FC<Props> = ({ countryCode }) => {
  const router = useRouter();
  const { data: stateData } = useSWR<CountryData>(
    `${apiUrl}/provinces`,
    fetcher
  );

  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<CountryDataDetail[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSuggest = (states: string) => {
    setSearchValue(states);
    handleSubmit(states);
  };

  const handleSubmit = (states: string) => {
    const encodedState = encodeURI(states);
    router.push(`/states/${encodedState}`);
  };

  useEffect(() => {
    if (searchValue !== "") {
      const suggestedStates = currStateDataDetail.filter((state) => {
        const currState = state["location"] as string;
        if (searchValue.toLowerCase() === currState) {
          return "";
        } else {
          return currState.toLowerCase().includes(searchValue.toLowerCase());
        }
      });
      setSuggestions(suggestedStates);
    }

    if (searchValue === "") {
      setSuggestions([]);
    }

    return () => setSuggestions([]);
  }, [searchValue]);

  if (!stateData) {
    return (
      <div>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const stateDataDetail = stateData.data;
  const currStateDataDetail = stateDataDetail.filter(
    (d) => d["country_code"] === countryCode
  );

  return (
    <div className="space-y-4">
      <input
        className={`w-full flex-grow bg-gray-50 border-0 rounded-lg py-2 shadow-md text-center focus:outline-none ${
          currStateDataDetail.length <= 0 ? "opacity-50" : "opacity-100"
        }`}
        type="text"
        placeholder={`${
          currStateDataDetail.length <= 0
            ? "Search Not available"
            : "Search states"
        }`}
        id="search-states"
        onChange={(e) => handleSearch(e)}
        value={searchValue}
        disabled={currStateDataDetail.length <= 0}
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

export default SearchState;
