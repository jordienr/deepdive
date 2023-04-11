import type { Subtopic } from "@/types/Subtopic";
import { create } from "zustand";

interface Store {
  subtopic?: Subtopic;
}
export const useGlobalStore = create<Store>((set) => ({
  subtopic: undefined,
  setSubtopic: (subtopic: Subtopic) => set({ subtopic }),
}));
