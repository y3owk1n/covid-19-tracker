import CityDetails from "@/components/city/CityDetails";
import ErrorPage from "@/components/ErrorPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";

export const apiUrl = "https://www.trackcorona.live/api";

export interface CityData {
  code: number;
  data: CityDataDetail[];
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

export type CityDataDetail = {
  [key in Test as string]: string | number;
};

const CityDetail = () => {
  const router = useRouter();
  const { cities } = router.query;
  const { data: citiesData } = useSWR<CityData>(
    `${apiUrl}/cities/${cities}`,
    fetcher
  );
  if (!citiesData) {
    return <LoadingSpinner />;
  }

  if (!citiesData.data.length) {
    return <ErrorPage />;
  }

  return (
    <div>
      <main>
        <div className="max-w-2xl mx-auto px-4 md:px-0">
          <div className="my-10 space-y-4">
            <button onClick={() => router.back()}>Back</button>
            <CityDetails cityData={citiesData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CityDetail;
