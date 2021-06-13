import moment from "moment";
import { CountryData } from "pages/country/[countryCode]";
import { FC } from "react";
import SearchState from "./SearchState";

interface Props {
  countryData: CountryData;
  countryName: string;
  countryCode: string;
}

const formattedTitle = (string: string) => {
  return string.replace(/_/g, " ");
};

const formatData = (data: string | number, key: string) => {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "number") {
    if (key === "latitude" || key === "longitude") {
      return data;
    }
    return data.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

const CountryDetails: FC<Props> = ({
  countryData,
  countryName,
  countryCode,
}) => {
  const currCountryData = countryData.data[0];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">
          Summary for {countryName}
        </h2>
        <p className="text-xs text-gray-200">
          Last updated: {moment(currCountryData["updated"] as string).fromNow()}
        </p>
      </div>
      <div>
        <SearchState countryCode={countryCode} />
      </div>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {Object.keys(currCountryData)
          .filter((x) => x !== "updated")
          .map((key) => (
            <div
              key={key}
              className="space-y-2 bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold capitalize">
                {formattedTitle(key)}
              </h3>
              <p>{formatData(currCountryData[key], key)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CountryDetails;
