import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Navigation() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <></>;
  }

  return (
    <nav className="">
      {isSignedIn && (
        <div className="flex items-center gap-6 pr-4 font-medium text-slate-600 hover:text-slate-900">
          <Link
            className="rounded-md bg-gradient-to-b from-slate-700 to-slate-900 px-3 py-2 text-slate-50 hover:text-white"
            href="/start"
          >
            Start
          </Link>

          <UserButton />
        </div>
      )}
      {!isSignedIn && (
        <div className="flex gap-4">
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
        </div>
      )}
    </nav>
  );
}
