import moment from "moment";
import { CityData } from "pages/cities/[cities]";
import { FC } from "react";

interface Props {
  cityData: CityData;
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

  if (data === null) {
    return "Not available";
  }
};

const CityDetails: FC<Props> = ({ cityData }) => {
  const currCityData = cityData.data[0];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">
          Summary for {currCityData["location"]}
        </h2>
        <p className="text-xs text-gray-200">
          Last updated: {moment(currCityData["updated"] as string).fromNow()}
        </p>
      </div>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {Object.keys(currCityData)
          .filter((x) => x !== "updated")
          .map((key) => (
            <div
              key={key}
              className="space-y-2 bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold capitalize">
                {formattedTitle(key)}
              </h3>
              <p>{formatData(currCityData[key], key)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CityDetails;
