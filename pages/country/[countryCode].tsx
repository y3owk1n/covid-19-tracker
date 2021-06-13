import CountryDetails from "@/components/country/CountryDetail";
import CountrySummary from "@/components/country/CountrySummary";
import ErrorPage from "@/components/ErrorPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import fetcher from "@/utils/fetcher";
import { getName } from "country-list";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";

export const apiUrl = "https://www.trackcorona.live/api";

export interface TravelData {
  code: number;
  data: TravelDataDetail[];
}

export interface CountryData {
  code: number;
  data: CountryDataDetail[];
}

export interface TravelDataDetail {
  location: string;
  data: string;
}

export enum Test {
  location,
  country_code,
  latitute,
  longitude,
  confirmed,
  dead,
  recovered,
  updated,
}

export type CountryDataDetail = {
  [key in Test as string]: string | number;
};

const CountryDetail = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const { data: travelData } = useSWR<TravelData>(`${apiUrl}/travel`);
  const { data: countryData } = useSWR<CountryData>(
    `${apiUrl}/countries/${countryCode}`,
    fetcher
  );
  if (!countryData || !travelData || !countryCode) {
    return <LoadingSpinner />;
  }

  if (!countryData.data.length || !travelData.data.length) {
    return <ErrorPage />;
  }

  const countryName = getName(countryCode as string);

  const currentTravelData = travelData.data.filter(
    (location) => location.location === countryName
  )[0];

  return (
    <div>
      <main>
        <div className="max-w-2xl mx-auto px-4 md:px-0">
          <div className="my-10 space-y-4">
            <button onClick={() => router.back()}>Back</button>

            <CountryDetails
              countryData={countryData}
              countryName={currentTravelData.location}
              countryCode={countryCode as string}
            />
            <hr />
            <CountrySummary currentTravelData={currentTravelData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryDetail;
