import { z } from "zod";

export const schema = z.object({
  firstName: z
    .string()
    /*   .min(2, "Nome deve ter, no mínimo 2 caracteres") */
    .nullable(),
  lastName: z
    .string()
    /*  .max(45) */
    .nullable(),

  phone: z
    .string()
    /*  .min(11, { message: "O formato deve ser (XX) XXXXX-XXXX" }) */
    .nullable(),

  email: z
    .string()
    /*  .max(45) */
    .optional(),
});

export type EditContactData = z.infer<typeof schema>;
