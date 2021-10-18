import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Model from "../components/Model";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>InstaClone By SXVD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* header */}
      <Header />
      {/* feed */}
      <Feed />
      <Model />
      {/* model */}
    </div>
  );
}
