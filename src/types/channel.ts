import { z } from "zod";

const requiredString = z.string().trim().min(1, { message: "Required" });

export const channelSchema = z.object({
  name: requiredString,
  url: requiredString,
  image: requiredString,
  ytId: requiredString,
  verified: z.boolean().default(false),
  description: z.string().default("No description"),
});

export type ChannelValues = z.infer<typeof channelSchema>;
