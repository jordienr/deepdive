import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MentorAI</title>
        <meta name="description" content="Learn anything you want" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="mx-auto max-w-sm py-24 text-center text-4xl font-semibold">
          Become an expert in anything you want
        </h1>
        <div className="mx-auto flex max-w-xs flex-col gap-2 text-center">
          <Link
            className="rounded-md bg-gradient-to-b from-slate-700 to-black p-3 font-semibold text-slate-50"
            href="/sign-up"
          >
            Create an account
          </Link>
          <Link className="p-3 text-blue-500 underline" href="/sign-up">
            Sign in
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
