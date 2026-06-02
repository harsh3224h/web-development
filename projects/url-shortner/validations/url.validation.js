import { z } from "zod";

export const shortenURLSchema = z.object({
  URL: z.string(),
});
