import { z } from "zod";

export const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export type EditContactData = z.infer<typeof schema>;
