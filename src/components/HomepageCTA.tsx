import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function HomepageCTA() {
  const { isSignedIn } = useAuth();

  return (
    <>
      {isSignedIn ? (
        <Link
          href="/start"
          className="rounded-md  bg-gradient-to-b from-slate-700 to-slate-900 px-4 py-2 text-lg font-semibold text-slate-50"
        >
          Get started
        </Link>
      ) : (
        <div className="mx-auto flex max-w-xs flex-col gap-3">
          <Link
            href="/sign-up"
            className="rounded-md  bg-gradient-to-b from-slate-700 to-slate-900 px-4 py-2 text-lg font-semibold text-slate-50"
          >
            Create an account
          </Link>
          <Link
            href="/sign-in"
            className="rounded-md px-4 py-2 text-blue-500 hover:underline"
          >
            Sign in
          </Link>
        </div>
      )}
    </>
  );
}
