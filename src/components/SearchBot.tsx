import { api } from "@/utils/api";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

type Difficulty = "beginner" | "intermediate" | "advanced";
type Subtopic = { title: string; description: string; difficulty: Difficulty };

export default function SearchBot() {
  const [topic, setTopic] = useState("");

  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const useSubtopics = api.ai.getSubtopics.useMutation();

  const [topicDetail, setTopicDetail] = useState<any>("");
  const useTopicDetail = api.ai.getTopicDetail.useMutation();
  const [showTopicDetail, setShowTopicDetail] = useState(false);

  const loading = useSubtopics.isLoading || useTopicDetail.isLoading;

  function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    if (!topic) {
      alert("Please enter a topic");
    }

    setTitle(`${topic}`);

    getSubtopics(topic);
  }

  const [title, setTitle] = useState(`Welcome to Deepdive`);
  const titleLetters = title.split("");

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

  const placeholders = [
    "History of Japan",
    "Mobile App Development",
    "History of Space Exploration",
    "History of the Internet",
    "Artificial Intelligence",
    "Web Development",
  ];

  const [placeholder, setPlaceholder] = useState(
    placeholders[Math.floor(Math.random() * placeholders.length)]
  );

  function getSubtopics(topic: string) {
    useSubtopics.mutate(topic, {
      onSuccess: (data) => {
        setSubtopics(data);
      },
    });
  }

  function getSubtopicDetail(title: string) {
    useTopicDetail.mutate(title, {
      onSuccess: (data) => {
        if (!data) {
          return;
        }
        setTopicDetail(data);
        setShowTopicDetail(true);
      },
    });
  }

  function onSubtopicClick(title: string) {
    getSubtopicDetail(title);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="my-24 text-center text-2xl font-semibold">
        {titleLetters.map((letter, index) => {
          return (
            <motion.span
              key={`titleLetters${index}`}
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
      {subtopics.length === 0 && (
        <motion.form
          className="mx-auto max-w-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: titleLetters.length * 0.01,
            type: "spring",
            stiffness: 100,
          }}
          onSubmit={onSubmit}
        >
          <label htmlFor="search text-xl">
            <span className=" text-slate-700">
              What do you want to learn today?
            </span>
            <input
              id="search"
              type="text"
              value={topic}
              placeholder={placeholder}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-xl text-gray-900 shadow-sm transition-all placeholder:text-slate-400 hover:border-blue-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </label>

          <button
            disabled={loading}
            type="submit"
            className="mt-6 block w-full rounded-md bg-gradient-to-b from-slate-700 to-slate-900 py-2 text-xl text-slate-100 transition-all hover:text-white disabled:opacity-80"
          >
            Start
          </button>
        </motion.form>
      )}

      {subtopics.length > 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: titleLetters.length * 0.01,
            type: "spring",
            stiffness: 100,
          }}
          className="mt-24 rounded-lg border bg-white p-3 shadow-sm "
        >
          <h2 className="px-2 text-sm font-semibold text-slate-500">
            Pick a topic to learn more
          </h2>
          <ul className="mt-3 space-y-4">
            {subtopics.map((subtopic, index) => {
              return (
                <li
                  key={`subtopic${index}`}
                  className="group cursor-pointer rounded-md px-2 py-1 text-slate-700 transition-all hover:bg-blue-50 hover:bg-opacity-40 hover:text-blue-600"
                  onClick={() => onSubtopicClick(subtopic.title)}
                >
                  <h3 className="flex items-center gap-4 text-lg font-semibold">
                    {subtopic.title}
                    <span className="rounded-full border px-2 py-1 text-xs font-normal">
                      {subtopic.difficulty}
                    </span>
                  </h3>
                  <p className="mt-1 text-slate-500">{subtopic.description}</p>
                  <div className="mt-2 flex gap-2 text-xs">
                    <button>Read more</button>
                    <button>Quiz</button>
                    <button>Fun fact</button>
                    <button>Related topics</button>
                    <button title="Explain like I'm 5">ELI5</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}

      {showTopicDetail && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          className="fixed inset-0 z-10 flex items-center justify-center bg-slate-800 bg-opacity-80 backdrop-blur-sm"
        >
          <motion.div
            className="max-w-md rounded-md bg-white p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              type: "spring",
              stiffness: 100,
            }}
          >
            {topicDetail && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="px-2 text-sm font-semibold text-slate-500">
                    Topic title
                  </h2>
                  <button onClick={() => setShowTopicDetail(false)}>
                    <X />
                  </button>
                </div>
                <p className="mt-1 text-slate-500">
                  {JSON.stringify(topicDetail)}
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
