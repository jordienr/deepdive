import { api } from "@/utils/api";

export default function Test() {
  const modelsFetch = api.ai.models.useQuery(undefined, {
    enabled: false,
  });

  async function fetchModels() {
    const res = await modelsFetch.refetch();
    console.log(res);
  }

  return (
    <div className="m-8">
      <button onClick={fetchModels}>Models</button>
    </div>
  );
}
