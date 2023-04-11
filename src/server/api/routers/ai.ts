import { protectedProcedure } from "./../trpc";
import { z } from "zod";
import { createTRPCRouter } from "@/server/api/trpc";
import { ai } from "@/lib/openai";
import type { CreateChatCompletionRequest } from "openai";
import { getSubtopicsPrompt, getTopicDetailPrompt } from "@/lib/prompts";
import { TRPCError } from "@trpc/server";
import supabase from "@/lib/supabase";

const getOpenAIPayload = (input: string) => {
  const payload: CreateChatCompletionRequest = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  };

  return payload;
};

export const aiRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = getOpenAIPayload(input.prompt);

      const completion = await ai.createChatCompletion(payload);
      const generatedText = completion.data.choices[0]?.message?.content;

      return generatedText;
    }),
  models: protectedProcedure.query(async () => {
    const res = await ai.listModels();

    return res.data;
  }),
  getSubtopics: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        const prompt = getSubtopicsPrompt(input);
        const payload = getOpenAIPayload(prompt);
        const completion = await ai.createChatCompletion(payload);
        const generatedText = completion.data.choices[0]?.message?.content;
        const userId = ctx.auth.userId;

        if (!generatedText) {
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "Could not generate subtopics",
          });
        }

        const subtopics = JSON.parse(generatedText) as Record<string, string>[];
        const subtopicSchema = z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            difficulty: z.enum(["beginner", "intermediate", "advanced"]),
          })
        );
        const parsedSubtopics = subtopicSchema.parse(subtopics);

        const supaRes = await supabase
          .from("topics")
          .insert([
            {
              title: input,
              user_id: userId,
            },
          ])
          .select();
        if (!supaRes.data || !supaRes.data[0]) {
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "Could not insert topic",
          });
        }
        const topicId = supaRes.data[0].public_id;

        await supabase.from("subtopics").insert([
          ...parsedSubtopics.map((subtopic) => ({
            ...subtopic,
            topic_id: topicId,
            user_id: userId,
            main_topic_title: input,
          })),
        ]);

        return parsedSubtopics;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Unhandled error in getSubtopics",
        });
      }
    }),
  getTopicDetail: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const prompt = getTopicDetailPrompt(input);

      const payload = getOpenAIPayload(prompt);

      const completion = await ai.createChatCompletion(payload);
      const generatedText = completion.data.choices[0]?.message?.content;

      return generatedText;
    }),
});
