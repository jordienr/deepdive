import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MentorAI</title>
        <meta name="description" content="Learn anything you want" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        {/* <h1 className="mx-auto max-w-sm py-24 text-3xl font-semibold">
          <br /> Taylored learning
        </h1>
        <div className="mx-auto max-w-sm">
          <HomepageCTA />
        </div> */}
      </main>
    </>
  );
};

export default Home;
