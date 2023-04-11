import Subtopic from "@/components/Subtopic";
import { useGlobalStore } from "@/stores";
import type { Subtopic as SubtopicT } from "@/types/Subtopic";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function TopicDetail() {
  const router = useRouter();
  const { id } = router.query;
  const globalStore = useGlobalStore();
  const { data, error, isLoading } = api.db.getSubtopicsById.useQuery({
    id: id as string,
  });

  const generateDetail = api.ai.getTopicDetail.useMutation({
    enabled: false
  });

  function onSubtopicClick(subtopic: SubtopicT) {
    globalStore.setSubtopic(subtopic);
    router.push(`/detail`);
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-3">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}

      {data && (
        <div className="mt-4 flex flex-col gap-4 rounded-md border p-3 shadow-sm">
          {data?.map((subtopic) => (
            <button
              onClick={() => onSubtopicClick(subtopic)}
              key={subtopic.public_id}
            >
              <Subtopic subtopic={subtopic} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
