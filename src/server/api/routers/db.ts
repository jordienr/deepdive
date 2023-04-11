import { protectedProcedure } from "./../trpc";
import { createTRPCRouter } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import supabase from "@/lib/supabase";
import { z } from "zod";

export const dbRouter = createTRPCRouter({
  /**
   * Returns stored topics for the current user.
   * @date 09/04/2023 - 19:01:33
   *
   * @type {*}
   */
  getTopics: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    const { data: topics, error } = await supabase
      .from("topics")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "Could not get topics",
      });
    }

    return topics;
  }),
  getSubtopicsById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const topicId = input.id;
      const userId = ctx.auth.userId;
      const { data: topics, error } = await supabase
        .from("subtopics")
        .select("*")
        .eq("user_id", userId)
        .eq("topic_id", topicId);

      if (error) {
        console.error(error);
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Could not get topic",
        });
      }

      return topics;
    }),
});
