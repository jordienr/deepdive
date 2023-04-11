import { api } from "@/utils/api";
import Link from "next/link";

export default function Topics() {
  const { data, error, isLoading } = api.db.getTopics.useQuery();

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-3">
      <h2 className="mt-12 text-3xl font-semibold">Topics</h2>

      {isLoading && <div>Loading...</div>}

      {error && <div>{error.message}</div>}

      {data && data.length === 0 && (
        <div className="mt-4 flex flex-col gap-4 rounded-md border p-3 shadow-sm">
          <p className="text-xl font-medium">No topics yet</p>
          <Link className="text-blue-500 underline" href="/start">
            Create a new Topic
          </Link>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 rounded-md border p-3 shadow-sm">
          {data.map((topic) => (
            <Link
              className="text-xl font-medium"
              href={`/topics/${topic.public_id}`}
              key={topic.public_id}
            >
              {topic.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
