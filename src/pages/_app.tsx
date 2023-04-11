import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <div className=" border-b bg-white bg-opacity-80 p-3 shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <Link className="text-lg font-medium" href="/">
              Deepdive
            </Link>
            <Navigation />
          </div>
        </div>
        <Component {...pageProps} />
        <footer className="mt-32 border-t bg-slate-50 bg-opacity-80 py-16 text-center text-slate-500 shadow-inner shadow-slate-200">
          <p>
            Made in 🏝️ Mallorca by{" "}
            <a
              className="text-blue-500 underline"
              href="https://twitter.com/jordienr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jordi
            </a>
          </p>
        </footer>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
