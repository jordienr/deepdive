import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider>
        <div className="flex items-center justify-between border-b bg-white bg-opacity-80 p-3 shadow-sm">
          <Link className="text-lg font-medium" href="/">
            Mentor
          </Link>
          <Navigation />
        </div>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
