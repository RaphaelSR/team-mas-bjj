import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactMessages } from "@db/schema";

export const contactRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().optional(),
        gymInterest: z.string().optional(),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contactMessages).values({
        userId: input.userId ?? null,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone ?? null,
        message: input.message ?? null,
        gymInterest: input.gymInterest ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),
});
