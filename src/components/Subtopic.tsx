import type { Database } from "@/types/supabase";

type Subtopic = Database["public"]["Tables"]["subtopics"]["Row"];

export default function Subtopic({ subtopic }: { subtopic: Subtopic }) {
  return (
    <>
      <div
        key={`subtopic${subtopic.public_id}`}
        className="group cursor-pointer rounded-md px-2 py-1 text-slate-700 transition-all hover:bg-blue-50 hover:bg-opacity-40 hover:text-blue-600"
        onClick={() => console.log("clicked")}
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
      </div>
    </>
  );
}
