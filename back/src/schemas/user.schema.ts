import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  firstName: z.string().max(45),
  lastName: z.string().max(45),
  phone: z.string().refine((value) => /^\(\d{2}\) \d{5}-\d{4}$/.test(value), {
    message: "Invalid phone number. Use the format (XX) XXXXX-XXXX",
  }),
  email: z.string().email().max(45),
  password: z.string(),
  createdAt: z.string(),
});

const userSchemaRequest = userSchema.omit({ id: true, createdAt: true });

const userSchemaResponse = userSchema.omit({ password: true });

const userSchemaUpdateRequest = userSchemaRequest.partial();

export {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userSchemaUpdateRequest,
};
