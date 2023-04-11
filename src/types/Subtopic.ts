import type { Database } from "./supabase";

export type Subtopic = Database["public"]["Tables"]["subtopics"]["Row"];
