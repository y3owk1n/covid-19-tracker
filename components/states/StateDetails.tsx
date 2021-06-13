import moment from "moment";
import { FC } from "react";
import { StateData } from "../../pages/states/[states]";
import SearchCity from "./SearchCity";

interface Props {
  stateData: StateData;
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

const StateDetails: FC<Props> = ({ stateData }) => {
  const currStateData = stateData.data[0];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">
          Summary for {currStateData["location"]}
        </h2>
        <p className="text-xs text-gray-200">
          Last updated: {moment(currStateData["updated"] as string).fromNow()}
        </p>
      </div>
      <div>
        <SearchCity countryCode={currStateData["country_code"] as string} />
      </div>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {Object.keys(currStateData)
          .filter((x) => x !== "updated")
          .map((key) => (
            <div
              key={key}
              className="space-y-2 bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold capitalize">
                {formattedTitle(key)}
              </h3>
              <p>{formatData(currStateData[key], key)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StateDetails;
