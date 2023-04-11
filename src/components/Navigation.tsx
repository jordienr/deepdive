import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navigation() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <></>;
  }

  return (
    <nav className="">
      {isSignedIn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 pr-4 font-medium text-slate-600 hover:text-slate-900"
        >
          <Link
            className="rounded-md px-3 py-1 hover:bg-slate-100"
            href="/start"
          >
            Start
          </Link>
          <Link
            className="rounded-md px-3 py-1 hover:bg-slate-100"
            href="/topics"
          >
            My topics
          </Link>

          <UserButton />
        </motion.div>
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
