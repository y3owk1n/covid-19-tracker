import { TravelDataDetail } from "pages/country/[countryCode]";
import { FC, useState } from "react";

interface Props {
  currentTravelData: TravelDataDetail;
}

const CountrySummary: FC<Props> = ({ currentTravelData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2 bg-gray-50 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">
        What's now in {currentTravelData.location}.
      </h1>
      <p
        className={`text-gray-500  transition-all ease-in-out duration-200 ${
          isExpanded ? "line-clamp-none" : "line-clamp-5"
        }`}
      >
        {currentTravelData.data}
      </p>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show less" : "Read More"}
      </button>
    </div>
  );
};

export default CountrySummary;
