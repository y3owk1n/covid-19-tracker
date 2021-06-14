import ErrorPage from "@/components/ErrorPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import useSWR from "swr";
import StateDetails from "../../components/states/StateDetails";

export const apiUrl = "https://www.trackcorona.live/api";

export interface StateData {
  code: number;
  data: StateDataDetail[];
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

export type StateDataDetail = {
  [key in Test as string]: string | number;
};

const StateDetail = () => {
  const router = useRouter();
  const { states } = router.query;
  const { data: stateData } = useSWR<StateData>(
    `${apiUrl}/provinces/${states}`,
    fetcher
  );
  if (!stateData) {
    return <LoadingSpinner />;
  }

  if (!stateData.data.length) {
    return <ErrorPage />;
  }

  return (
    <div>
      <Head>
        <title>{decodeURI(states as string)} | Covid-19-Tracker</title>
      </Head>
      <main>
        <div className="max-w-2xl mx-auto px-4 md:px-0">
          <div className="py-10 space-y-4">
            <button onClick={() => router.back()}>Back</button>
            <StateDetails stateData={stateData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StateDetail;
