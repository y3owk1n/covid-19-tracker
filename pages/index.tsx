import SearchBar from "@/components/SearchBar";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home | Covid-19-Tracker</title>
      </Head>
      <main>
        <div className="max-w-2xl mx-auto px-4 md:px-0">
          <div className="space-y-4">
            <SearchBar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
