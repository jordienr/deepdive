import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

export default function SearchBot() {
  const { user } = useUser();

  const [query, setQuery] = useState("");

  const generate = api.ai.generateText.useQuery(
    {
      prompt: query,
    },
    {
      enabled: false,
    }
  );

  async function onSubmit() {
    console.log(query);
    if (query) {
      const res = await generate.refetch();
      console.log("clientres", res);
    }
  }

  if (!user?.firstName) {
    return <></>;
  }

  const welcomeMessage = `Welcome, ${user.firstName}`;
  const welcomeMessageLetters = welcomeMessage.split("");

  const searchSuggestions = [
    "Frontend Development",
    "Backend Development",
    "Mobile App Development",
    "Data Science",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "Game Development",
    "Blockchain",
    "Artificial Intelligence",
  ];

  return (
    <div className="mx-auto max-w-sm">
      <div className="my-24 text-center text-2xl font-semibold">
        {welcomeMessageLetters.map((letter, index) => {
          return (
            <motion.span
              key={`welcomeMessageLetter${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.01,
                type: "spring",
                stiffness: 100,
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: welcomeMessageLetters.length * 0.025,
          type: "spring",
          stiffness: 100,
        }}
      >
        <label htmlFor="search text-xl">
          <span className=" text-slate-700">
            What do you want to learn today?
          </span>
          <input
            id="search"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-xl text-gray-900 placeholder-gray-500 shadow-sm transition-all hover:border-blue-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </label>

        <button
          onClick={() => onSubmit}
          className="mt-6 block w-full rounded-md bg-gradient-to-b from-slate-700 to-slate-900 py-2 text-xl text-slate-100 transition-all hover:text-white"
        >
          Start
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: welcomeMessageLetters.length * 0.05,
          type: "spring",
          stiffness: 100,
        }}
        className="mt-24 rounded-md border bg-white p-3 shadow-sm"
      >
        <h2 className="px-2 text-sm font-semibold text-slate-500">
          Suggestions
        </h2>
        <ul className="mt-3 space-y-2">
          {searchSuggestions.map((suggestion, index) => {
            return (
              <li
                className="group flex cursor-pointer items-center justify-between rounded-md px-2 py-1 font-mono text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                key={`${index}-suggestion`}
              >
                {suggestion}
                <span className="text-slate-500 group-hover:text-blue-600">
                  <ChevronRightIcon className="group-hover:hidden" size="16" />
                  <ArrowRightIcon
                    className="hidden group-hover:block"
                    size="16"
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
