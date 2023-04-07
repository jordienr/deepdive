import { protectedProcedure } from "./../trpc";
import { z } from "zod";

import { createTRPCRouter } from "@/server/api/trpc";
import { ai } from "@/lib/openai";

export const aiRouter = createTRPCRouter({
  generateText: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log(ctx);
      const res = await ai.createCompletion({
        model: "text-davinci-003",
        prompt: input.prompt,
      });

      console.log("tRPC generateText: ", res.data.choices[0]?.text);

      return res.data.choices[0]?.text;
    }),
});
